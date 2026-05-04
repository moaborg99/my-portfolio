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
