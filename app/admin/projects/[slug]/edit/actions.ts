"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { uploadFeaturedImageToBlob } from "@/lib/featured-image";
import { parseProjectDetailRepeaterFields } from "@/lib/project-detail-from-form";
import { prisma } from "@/lib/prisma";

function getText(formData: FormData, key: string): string {
  const v = formData.get(key);
  if (v === null) return "";
  return typeof v === "string" ? v : "";
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

  if (!parsed.success || !detail.ok) {
    const fieldErrors: Record<string, string[] | undefined> = {};
    if (!parsed.success) {
      Object.assign(fieldErrors, parsed.error.flatten().fieldErrors);
    }
    if (!detail.ok) {
      Object.assign(fieldErrors, detail.fieldErrors);
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
