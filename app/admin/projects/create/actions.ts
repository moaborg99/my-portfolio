"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

function getText(formData: FormData, key: string): string {
  const v = formData.get(key);
  if (v === null) return "";
  return typeof v === "string" ? v : "";
}

function isValidFeaturedImageRef(s: string): boolean {
  const t = s.trim();

  if (t.startsWith("http://") || t.startsWith("https://")) {
    try {
      new URL(t);
      return true;
    } catch {
      return false;
    }
  }

  if (t.startsWith("/") && t.length > 1 && !t.includes("..") && !/\s/.test(t)) {
    return true;
  }

  return false;
}

const optionalHttpUrl = z
  .union([z.literal(""), z.string().url()])
  .transform((v) => (v === "" ? null : v));

const schema = z.object({
  title: z.string().trim().min(1, "Required"),
  summary: z.string().trim().min(1, "Required"),
  intro: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
  featuredImage: z.string().trim().min(1, "Required").refine(isValidFeaturedImageRef, {
    message: 'Use a full https URL or a root path starting with "/", e.g. /about-cta.jpg.',
  }),
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
    featuredImage: getText(formData, "featuredImage"),
    githubUrl: getText(formData, "githubUrl"),
    deployUrl: getText(formData, "deployUrl"),
    videoUrl: getText(formData, "videoUrl"),
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten();

    return {
      ok: false,
      fieldErrors: flat.fieldErrors,
      formError:
        flat.formErrors.length > 0
          ? flat.formErrors.join(" ")
          : "Fix the highlighted fields and try again.",
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
        ...parsed.data,
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
