"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export async function logout() {
  const jar = await cookies();
  jar.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

/** DELETE via form POST: fields `slug` (required). */
export async function deleteProject(formData: FormData) {
  const raw = formData.get("slug");
  if (typeof raw !== "string" || raw.trim() === "") {
    redirect("/admin");
  }

  const slug = raw.trim();

  try {
    await prisma.project.deleteMany({ where: { slug } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      redirect("/admin");
    }
    throw e;
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin");

  redirect("/admin");
}
