"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

/** Empty string → null; otherwise must be http(s). */
const optionalHttpUrl = z
  .union([z.literal(""), z.string().url()])
  .transform((v) => (v === "" ? null : v));

const schema = z.object({
  slug: z.string().min(1),
  title: z.string().trim().min(1, "Required"),
  summary: z.string().trim().min(1, "Required"),
  intro: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
  featuredImage: z.string().trim().min(1, "Required"),
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
  const raw = Object.fromEntries(formData.entries());

  const parsed = schema.safeParse({
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary,
    intro: raw.intro,
    description: raw.description,
    featuredImage: raw.featuredImage,
    githubUrl: raw.githubUrl,
    deployUrl: raw.deployUrl,
    videoUrl: raw.videoUrl,
  });

  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { slug, ...data } = parsed.data;

  const existing = await prisma.project.findUnique({ where: { slug } });
  if (!existing) {
    return { ok: false, formError: "Project not found." };
  }

  await prisma.project.update({
    where: { slug },
    data,
  });

  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin");

  redirect("/admin");
}
