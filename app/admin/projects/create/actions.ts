"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { uploadFeaturedImageToBlob } from "@/lib/featured-image";
import { parseProjectDetailRepeaterFields } from "@/lib/project-detail-from-form";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

function getText(formData: FormData, key: string): string {
  const v = formData.get(key);
  if (v === null) return "";
  return typeof v === "string" ? v : "";
}

const optionalHttpUrl = z
  .union([z.literal(""), z.string().url()])
  .transform((v) => (v === "" ? null : v));

const schema = z.object({
  title: z.string().trim().min(1, "Required"),
  summary: z.string().trim().min(1, "Required"),
  intro: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
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

  const fileField = formData.get("featuredImageFile");
  const fileOk = fileField instanceof File && fileField.size > 0;

  if (!parsed.success || !detail.ok || !fileOk) {
    const fieldErrors: Record<string, string[] | undefined> = {};
    if (!parsed.success) {
      Object.assign(fieldErrors, parsed.error.flatten().fieldErrors);
    }
    if (!detail.ok) {
      Object.assign(fieldErrors, detail.fieldErrors);
    }
    if (!fileOk) {
      fieldErrors.featuredImageFile = ["Choose an image file (JPEG, PNG, WebP, or GIF)."];
    }

    let formError = "Fix the highlighted fields and try again.";
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      if (flat.formErrors.length > 0) {
        formError = flat.formErrors.join(" ");
      }
    }

    return { ok: false, fieldErrors, formError };
  }

  const blob = await uploadFeaturedImageToBlob(fileField);
  if (!blob.ok) {
    return {
      ok: false,
      fieldErrors: { featuredImageFile: [blob.message] },
      formError: "Fix the highlighted fields and try again.",
    };
  }

  let slug: string;
  try {
    slug = await allocateUniqueSlugForTitle(parsed.data.title);
  } catch {
    return { ok: false, formError: "Could not generate a slug. Try a clearer title." };
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
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return {
        ok: false,
        formError: "Slug collision — retry once (or change the title slightly).",
      };
    }
    throw e;
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin");

  redirect("/admin");
}
