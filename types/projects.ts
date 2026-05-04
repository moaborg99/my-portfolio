import type { DetailItem } from "@/types/project-detail";

export type ProjectSeedImage = {
  src: string;
  alt: string;
  sortOrder?: number;
};

export type ProjectSeed = {
  slug?: string;
  title: string;
  summary: string;
  intro: string;
  description: string;
  featuredImage: string;
  githubUrl: string | null;
  deployUrl: string | null;
  videoUrl: string | null;
  images: ProjectSeedImage[];
  skillSlugs: string[];
};

export type ProjectSkill = {
  id: number;
  name: string;
  group: string;
};

export type ProjectLearningBullet = {
  title: string;
  description: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  intro: string;
  description: string;
  featuredImage: string;
  githubUrl: string | null;
  deployUrl: string | null;
  videoUrl: string | null;
  images: { id: number; src: string; alt: string; sortOrder: number }[];
  skills: ProjectSkill[];
  techDetails: DetailItem[];
  learnings: ProjectLearningBullet[];
};

/** Listing cards — avoids loading gallery, case study blobs, etc. */
export type ProjectSummary = Pick<
  Project,
  "id" | "slug" | "title" | "summary" | "featuredImage" | "skills"
>;

/** Featured strip only — no skill join or id (carousel does not show pills). */
export type FeaturedProjectPreview = Pick<Project, "slug" | "title" | "summary" | "featuredImage">;

/** Admin projects table — identifiers and title only. */
export type AdminProjectListItem = Pick<Project, "id" | "slug" | "title">;
