import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function revalidateTechnicalSkillDependentPaths(): Promise<void> {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/skills");
  revalidatePath("/admin/groups");
  revalidatePath("/projects");
  revalidatePath("/admin/projects/create");

  const projects = await prisma.project.findMany({ select: { slug: true } });
  for (const { slug } of projects) {
    revalidatePath(`/projects/${slug}`);
    revalidatePath(`/admin/projects/${slug}/edit`);
  }
}
