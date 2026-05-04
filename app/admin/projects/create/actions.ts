"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { uploadFeaturedImageToBlob, uploadGalleryImageToBlob } from "@/lib/featured-image";
import { parseProjectGalleryFromForm } from "@/lib/project-gallery-from-form";
import { parseProjectDetailRepeaterFields } from "@/lib/project-detail-from-form";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

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
  .union([z.literal(""), z.string().url({ message: "Ange en giltig http- eller https-adress." })])
  .transform((v) => (v === "" ? null : v));

const schema = z.object({
  title: z.string().trim().min(1, "Obligatoriskt"),
  summary: z.string().trim().min(1, "Obligatoriskt"),
  intro: z.string().trim().min(1, "Obligatoriskt"),
  description: z.string().trim().min(1, "Obligatoriskt"),
  githubUrl: optionalHttpUrl,
  deployUrl: optionalHttpUrl,
  videoUrl: optionalHttpUrl,
});

async function allocateUniqueSlugForTitle(title: string): Promise<string> {
  let base = slugify(title);
  if (base === "") base = "project";

  let candidate = base;
  let suffix = 2;

  for (;;) {
    const clash = await prisma.project.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!clash) return candidate;

    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

export type CreateProjectState =
  | undefined
  | { ok?: false; formError?: string; fieldErrors?: Record<string, string[] | undefined> };

export async function createProjectAction(
  _prev: CreateProjectState,
  formData: FormData
): Promise<CreateProjectState> {
  const parsed = schema.safeParse({
    title: getText(formData, "title"),
    summary: getText(formData, "summary"),
    intro: getText(formData, "intro"),
    description: getText(formData, "description"),
    githubUrl: getText(formData, "githubUrl"),
    deployUrl: getText(formData, "deployUrl"),
    videoUrl: getText(formData, "videoUrl"),
  });

  const detail = parseProjectDetailRepeaterFields(formData);
  const gallery = parseProjectGalleryFromForm(formData, "create");
  const skillIds = parseSkillIdsFromFormData(formData);

  const fileField = formData.get("featuredImageFile");
  const fileOk = fileField instanceof File && fileField.size > 0;

  if (!parsed.success || !detail.ok || !gallery.ok || !fileOk) {
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
    if (!fileOk) {
      fieldErrors.featuredImageFile = ["Välj en bildfil (JPEG, PNG, WebP eller GIF)."];
    }

    let formError = "Åtgärda markerade fält och försök igen.";
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      if (flat.formErrors.length > 0) {
        formError = flat.formErrors.join(" ");
      }
    }

    return { ok: false, fieldErrors, formError };
  }

  if (skillIds.length > 0) {
    const found = await prisma.technicalSkill.findMany({
      where: { id: { in: skillIds } },
      select: { id: true },
    });
    if (found.length !== skillIds.length) {
      return {
        ok: false,
        fieldErrors: { skillIds: ["En eller fler valda tekniker finns inte längre."] },
        formError: "Åtgärda markerade fält och försök igen.",
      };
    }
  }

  const blob = await uploadFeaturedImageToBlob(fileField);
  if (!blob.ok) {
    return {
      ok: false,
      fieldErrors: { featuredImageFile: [blob.message] },
      formError: "Åtgärda markerade fält och försök igen.",
    };
  }

  const galleryCreates: { src: string; alt: string; sortOrder: number }[] = [];
  for (const row of gallery.rows) {
    if (row.kind !== "new") continue;
    const g = await uploadGalleryImageToBlob(row.file);
    if (!g.ok) {
      return {
        ok: false,
        fieldErrors: { [`gi_${row.index}_file`]: [g.message] },
        formError: "Åtgärda markerade fält och försök igen.",
      };
    }
    galleryCreates.push({
      src: g.url,
      alt: row.alt,
      sortOrder: galleryCreates.length,
    });
  }

  let slug: string;
  try {
    slug = await allocateUniqueSlugForTitle(parsed.data.title);
  } catch {
    return { ok: false, formError: "Kunde inte skapa slug. Prova en tydligare titel." };
  }

  try {
    await prisma.project.create({
      data: {
        slug,
        featuredImage: blob.url,
        ...parsed.data,
        techUsageItems: {
          create: detail.techUsageItems.map((item, sortOrder) => ({
            techName: item.techName,
            usage: item.usage,
            sortOrder,
          })),
        },
        learningItems: {
          create: detail.learningItems.map((item, sortOrder) => ({
            title: item.title,
            description: item.description,
            sortOrder,
          })),
        },
        ...(skillIds.length > 0
          ? {
              projectTechnicalSkills: {
                create: skillIds.map((technicalSkillId, displayOrder) => ({
                  technicalSkillId,
                  displayOrder,
                })),
              },
            }
          : {}),
        ...(galleryCreates.length > 0 ? { images: { create: galleryCreates } } : {}),
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return {
        ok: false,
        formError: "Slug-krock — försök igen eller ändra titeln något.",
      };
    }
    throw e;
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/projects");

  redirect("/admin/projects");
}
