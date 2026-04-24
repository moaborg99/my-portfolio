/** One gallery row in seed data (sortOrder optional; seed can default by index). */
export type ProjectSeedImage = {
  src: string;
  alt: string;
  sortOrder?: number;
};

/** One row in data/projects.ts — matches Prisma create fields + extras for relations. */
export type ProjectSeed = {
  /**
   * URL segment for `/projects/[slug]`. Omit to derive from `title` in seed
   * via `slugify(title)` with `-2`, `-3`, … if the base slug is already used.
   */
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
  /** Must match `TechnicalSkill.slug` values seeded from tech-stack (unknown slugs are skipped). */
  skillSlugs: string[];
};

export type ProjectSkill = {
  name: string;
  group: string;
};

/** App-facing project (map from Prisma in `lib/projects.ts`). */
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
  images: { src: string; alt: string; sortOrder: number }[];
  /** Display names for tech pills, ordered by join `displayOrder`. */
  skills: ProjectSkill[];
};
