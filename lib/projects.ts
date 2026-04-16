import { prisma } from "@/lib/prisma";
import type { Project } from "@/types/projects";

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({ orderBy: { id: "asc" } });

  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    description: row.description,
    technologies: row.technologies as string[],
    details: row.details,
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const row = await prisma.project.findUnique({ where: { slug } });
  if (!row) return undefined;

  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    technologies: row.technologies as string[],
    details: row.details,
  };
}
