"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";
import { revalidateTechnicalSkillDependentPaths } from "@/lib/revalidate-skills";

export async function logout() {
  const jar = await cookies();
  jar.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

/** DELETE via form POST: slug passed from `action={deleteProject.bind(null, slug)}`. */
export async function deleteProject(slug: string, formData: FormData) {
  void formData;

  const clean = typeof slug === "string" ? slug.trim() : "";
  if (clean === "") {
    redirect("/admin/projects");
  }

  try {
    await prisma.project.deleteMany({ where: { slug: clean } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      redirect("/admin/projects");
    }
    throw e;
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${clean}`);
  revalidatePath("/");
  revalidatePath("/admin/projects");

  redirect("/admin/projects");
}

/** DELETE via form POST: slug from `deleteTechnicalSkill.bind(null, slug)`. */
export async function deleteTechnicalSkill(skillSlug: string, formData: FormData) {
  void formData;

  const clean = typeof skillSlug === "string" ? skillSlug.trim() : "";
  if (clean === "") {
    redirect("/admin/skills");
  }

  try {
    await prisma.technicalSkill.deleteMany({ where: { slug: clean } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      redirect("/admin/skills");
    }
    throw e;
  }

  await revalidateTechnicalSkillDependentPaths();

  redirect("/admin/skills");
}

/** DELETE via form POST: slug from `deleteTechStackGroup.bind(null, slug)`. Cascades to skills. */
export async function deleteTechStackGroup(groupSlug: string, formData: FormData) {
  void formData;

  const clean = typeof groupSlug === "string" ? groupSlug.trim() : "";
  if (clean === "") {
    redirect("/admin/groups");
  }

  try {
    await prisma.techStackGroup.deleteMany({ where: { slug: clean } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      redirect("/admin/groups");
    }
    throw e;
  }

  await revalidateTechnicalSkillDependentPaths();

  redirect("/admin/groups");
}
