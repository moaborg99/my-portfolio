"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { uploadFeaturedImageToBlob, uploadGalleryImageToBlob } from "@/lib/featured-image";
import { parseProjectDetailRepeaterFields } from "@/lib/project-detail-from-form";
import { parseProjectGalleryFromForm } from "@/lib/project-gallery-from-form";
import { prisma } from "@/lib/prisma";

function getText(formData: FormData, key: string): string {
  const v = formData.get(key);
  if (v === null) return "";
  return typeof v === "string" ? v : "";
}

function parseSkillIdsFromFormData(formData: FormData): number[] {
  const seen = new Set<number>();
  const out: number[] = [];
  for (const v of formData.getAll("skillIds")) {
    if (typeof v !== "string") continue;
    const n = Number(v);
    if (!Number.isInteger(n) || n <= 0) continue;
    if (seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
}

const optionalHttpUrl = z
  .union([z.literal(""), z.string().url()])
  .transform((v) => (v === "" ? null : v));

const schema = z.object({
  slug: z.string().trim().min(1, "Missing project slug."),
  title: z.string().trim().min(1, "Required"),
  summary: z.string().trim().min(1, "Required"),
  intro: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
  githubUrl: optionalHttpUrl,
  deployUrl: optionalHttpUrl,
  videoUrl: optionalHttpUrl,
});

export type UpdateProjectState =
  | undefined
  | { ok?: false; formError?: string; fieldErrors?: Record<string, string[] | undefined> };

export async function updateProjectAction(
  _prev: UpdateProjectState,
  formData: FormData
): Promise<UpdateProjectState> {
  const parsed = schema.safeParse({
    slug: getText(formData, "slug"),
    title: getText(formData, "title"),
    summary: getText(formData, "summary"),
    intro: getText(formData, "intro"),
    description: getText(formData, "description"),
    githubUrl: getText(formData, "githubUrl"),
    deployUrl: getText(formData, "deployUrl"),
    videoUrl: getText(formData, "videoUrl"),
  });

  const detail = parseProjectDetailRepeaterFields(formData);
  const gallery = parseProjectGalleryFromForm(formData, "edit");
  const skillIds = parseSkillIdsFromFormData(formData);

  if (!parsed.success || !detail.ok || !gallery.ok) {
    const fieldErrors: Record<string, string[] | undefined> = {};
    if (!parsed.success) {
      Object.assign(fieldErrors, parsed.error.flatten().fieldErrors);
    }
    if (!detail.ok) {
      Object.assign(fieldErrors, detail.fieldErrors);
    }
    if (!gallery.ok) {
      Object.assign(fieldErrors, gallery.fieldErrors);
    }

    const flat = parsed.success ? null : parsed.error.flatten();

    return {
      ok: false,
      fieldErrors,
      formError:
        flat && flat.formErrors.length > 0
          ? flat.formErrors.join(" ")
          : "Fix the highlighted fields and try again.",
    };
  }

  const { slug, ...scalarData } = parsed.data;

  const existing = await prisma.project.findUnique({ where: { slug } });
  if (!existing) {
    return { ok: false, formError: "Project not found." };
  }

  if (skillIds.length > 0) {
    const found = await prisma.technicalSkill.findMany({
      where: { id: { in: skillIds } },
      select: { id: true },
    });
    if (found.length !== skillIds.length) {
      return {
        ok: false,
        fieldErrors: { skillIds: ["One or more selected skills no longer exist."] },
        formError: "Fix the highlighted fields and try again.",
      };
    }
  }

  let featuredImage = existing.featuredImage;
  const fileField = formData.get("featuredImageFile");
  if (fileField instanceof File && fileField.size > 0) {
    const blob = await uploadFeaturedImageToBlob(fileField);
    if (!blob.ok) {
      return {
        ok: false,
        fieldErrors: { featuredImageFile: [blob.message] },
        formError: "Fix the highlighted fields and try again.",
      };
    }
    featuredImage = blob.url;
  }

  const dbGallery = await prisma.projectImage.findMany({
    where: { projectId: existing.id },
    select: { id: true, src: true },
  });
  const galleryById = new Map(dbGallery.map((img) => [img.id, img]));

  const resolvedGallery: { src: string; alt: string; sortOrder: number }[] = [];
  for (const row of gallery.rows) {
    if (row.kind === "new") {
      const g = await uploadGalleryImageToBlob(row.file);
      if (!g.ok) {
        return {
          ok: false,
          fieldErrors: { [`gi_${row.index}_file`]: [g.message] },
          formError: "Fix the highlighted fields and try again.",
        };
      }
      resolvedGallery.push({
        src: g.url,
        alt: row.alt,
        sortOrder: resolvedGallery.length,
      });
      continue;
    }

    const db = galleryById.get(row.imageId);
    if (!db) {
      return {
        ok: false,
        fieldErrors: { [`gi_${row.index}_imageId`]: ["Unknown gallery image for this project."] },
        formError: "Fix the highlighted fields and try again.",
      };
    }

    if (row.kind === "keep") {
      resolvedGallery.push({
        src: db.src,
        alt: row.alt,
        sortOrder: resolvedGallery.length,
      });
      continue;
    }

    const g = await uploadGalleryImageToBlob(row.file);
    if (!g.ok) {
      return {
        ok: false,
        fieldErrors: { [`gi_${row.index}_file`]: [g.message] },
        formError: "Fix the highlighted fields and try again.",
      };
    }
    resolvedGallery.push({
      src: g.url,
      alt: row.alt,
      sortOrder: resolvedGallery.length,
    });
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.projectTechUsageItem.deleteMany({ where: { projectId: existing.id } });
      await tx.projectLearningItem.deleteMany({ where: { projectId: existing.id } });

      if (detail.techUsageItems.length > 0) {
        await tx.projectTechUsageItem.createMany({
          data: detail.techUsageItems.map((item, sortOrder) => ({
            projectId: existing.id,
            techName: item.techName,
            usage: item.usage,
            sortOrder,
          })),
        });
      }

      if (detail.learningItems.length > 0) {
        await tx.projectLearningItem.createMany({
          data: detail.learningItems.map((item, sortOrder) => ({
            projectId: existing.id,
            title: item.title,
            description: item.description,
            sortOrder,
          })),
        });
      }

      await tx.projectImage.deleteMany({ where: { projectId: existing.id } });
      if (resolvedGallery.length > 0) {
        await tx.projectImage.createMany({
          data: resolvedGallery.map((item) => ({
            projectId: existing.id,
            src: item.src,
            alt: item.alt,
            sortOrder: item.sortOrder,
          })),
        });
      }

      await tx.projectTechnicalSkill.deleteMany({ where: { projectId: existing.id } });
      if (skillIds.length > 0) {
        await tx.projectTechnicalSkill.createMany({
          data: skillIds.map((technicalSkillId, displayOrder) => ({
            projectId: existing.id,
            technicalSkillId,
            displayOrder,
          })),
        });
      }

      await tx.project.update({
        where: { slug },
        data: {
          ...scalarData,
          featuredImage,
        },
      });
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { ok: false, formError: "Could not save project. Try again." };
    }
    throw e;
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin");

  redirect("/admin");
}
