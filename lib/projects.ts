import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  AdminProjectListItem,
  FeaturedProjectPreview,
  Project,
  ProjectSummary,
} from "@/types/projects";

/** Max items in home/about featured carousel — keep in sync with `getFeaturedProjectPreviews` callers. */
export const PUBLIC_FEATURED_PROJECT_LIMIT = 5;

const projectInclude = {
  projectTechnicalSkills: {
    orderBy: [{ displayOrder: "asc" }, { technicalSkill: { name: "asc" } }],
    include: { technicalSkill: { include: { group: true } } },
  },
  techUsageItems: { orderBy: { sortOrder: "asc" } },
  learningItems: { orderBy: { sortOrder: "asc" } },
  images: {
    orderBy: { sortOrder: "asc" },
  },
} satisfies Prisma.ProjectInclude;

const projectSummarySelect = {
  id: true,
  slug: true,
  title: true,
  summary: true,
  featuredImage: true,
  projectTechnicalSkills: {
    orderBy: [{ displayOrder: "asc" }, { technicalSkill: { name: "asc" } }],
    select: {
      technicalSkill: {
        select: {
          id: true,
          name: true,
          group: { select: { name: true } },
        },
      },
    },
  },
} satisfies Prisma.ProjectSelect;

type ProjectRow = Prisma.ProjectGetPayload<{ include: typeof projectInclude }>;
type ProjectSummaryRow = Prisma.ProjectGetPayload<{ select: typeof projectSummarySelect }>;

function mapProjectRow(row: ProjectRow): Project {
  const images = row.images.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    sortOrder: img.sortOrder,
  }));

  const techSkills = row.projectTechnicalSkills.map((pts) => ({
    id: pts.technicalSkill.id,
    name: pts.technicalSkill.name,
    group: pts.technicalSkill.group.name,
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

function mapSummaryRow(row: ProjectSummaryRow): ProjectSummary {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    featuredImage: row.featuredImage,
    skills: row.projectTechnicalSkills.map((pts) => ({
      id: pts.technicalSkill.id,
      name: pts.technicalSkill.name,
      group: pts.technicalSkill.group.name,
    })),
  };
}

async function loadProjectSummaries(): Promise<ProjectSummary[]> {
  const rows = await prisma.project.findMany({
    orderBy: { id: "asc" },
    select: projectSummarySelect,
  });

  return rows.map((row) => mapSummaryRow(row));
}

async function loadFeaturedProjectPreviews(limit: number): Promise<FeaturedProjectPreview[]> {
  const safe = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 50) : PUBLIC_FEATURED_PROJECT_LIMIT;

  const rows = await prisma.project.findMany({
    orderBy: { id: "asc" },
    take: safe,
    select: {
      slug: true,
      title: true,
      summary: true,
      featuredImage: true,
    },
  });

  return rows;
}

async function loadAdminProjectList(): Promise<AdminProjectListItem[]> {
  return prisma.project.findMany({
    orderBy: { id: "asc" },
    select: { id: true, slug: true, title: true },
  });
}

async function loadProjectBySlug(slug: string): Promise<Project | undefined> {
  const row = await prisma.project.findUnique({
    where: { slug },
    include: projectInclude,
  });

  if (!row) return undefined;
  return mapProjectRow(row);
}

export const getProjectSummaries = cache(loadProjectSummaries);
export const getFeaturedProjectPreviews = cache(loadFeaturedProjectPreviews);
export const getAdminProjectList = cache(loadAdminProjectList);
export const getProjectBySlug = cache(loadProjectBySlug);
