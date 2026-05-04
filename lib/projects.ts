import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Project } from "@/types/projects";

const projectInclude = {
  projectTechnicalSkills: {
    orderBy: { id: "asc" },
    include: { technicalSkill: true },
  },
  techUsageItems: { orderBy: { sortOrder: "asc" } },
  learningItems: { orderBy: { sortOrder: "asc" } },
  images: {
    orderBy: { sortOrder: "asc" },
  },
} satisfies Prisma.ProjectInclude;

type ProjectRow = Prisma.ProjectGetPayload<{ include: typeof projectInclude }>;

function mapProjectRow(row: ProjectRow): Project {
  const images = row.images.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    sortOrder: img.sortOrder,
  }));

  const techSkills = row.projectTechnicalSkills.map((pts) => ({
    name: pts.technicalSkill.name,
    group: pts.technicalSkill.group,
  }));

  const techDetails = row.techUsageItems.map((r) => ({
    name: r.techName,
    usage: r.usage,
  }));

  const learnings = row.learningItems.map((r) => ({
    title: r.title,
    description: r.description,
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
    techDetails,
    learnings,
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
