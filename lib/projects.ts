import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Project } from "@/types/projects";

const projectInclude = {
  projectTechnicalSkills: {
    orderBy: { id: "asc" },
    include: { technicalSkill: true },
  },
  images: {
    orderBy: { sortOrder: "asc" },
  },
} satisfies Prisma.ProjectInclude;

type ProjectRow = Prisma.ProjectGetPayload<{ include: typeof projectInclude }>;

function mapProjectRow(row: ProjectRow): Project {
  const images = row.images.map((img) => ({
    src: img.src,
    alt: img.alt,
    sortOrder: img.sortOrder,
  }));

  const techSkills = row.projectTechnicalSkills.map((pts) => ({
    name: pts.technicalSkill.name,
    group: pts.technicalSkill.group,
  }));

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    intro: row.intro,
    description: row.description,
    featuredImage: row.featuredImage,
    githubUrl: row.githubUrl,
    deployUrl: row.deployUrl,
    videoUrl: row.videoUrl,
    images,
    skills: techSkills,
  };
}

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    orderBy: { id: "asc" },
    include: projectInclude,
  });

  return rows.map((row) => mapProjectRow(row));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const row = await prisma.project.findUnique({
    where: { slug },
    include: projectInclude,
  });

  if (!row) return undefined;
  return mapProjectRow(row);
}
