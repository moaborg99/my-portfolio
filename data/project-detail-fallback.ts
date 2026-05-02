/**
 * Placeholder rich sections for `/projects/[slug]` until CMS/DB exposes tech deep-dives
 * and learnings. Disabled via `<ProjectDetail usePlaceholderCaseStudy={false} />` when real data is wired.
 */

import type { DetailItem } from "@/types/project-detail";

export type ProjectDetailFallbackLearning = {
  title: string;
  description: string;
};

export const PROJECT_TECH_DETAILS_FALLBACK: DetailItem[] = [
  {
    name: "React",
    usage:
      "Built the UI with functional components and hooks. Applied patterns for reusable layout pieces, predictable state flows, and clear separation between presentation and data access.",
  },
  {
    name: "Tailwind CSS",
    usage:
      "Mobile-first layouts and consistent spacing scales. Tokens map to design decisions so breakpoints and typography stay aligned with the broader portfolio system.",
  },
  {
    name: "SQLite / Prisma",
    usage:
      "Structured schema and pragmatic indexing for filtering and lookups. Keeps deployments simple while still modeling relations the app depends on.",
  },
];

export const PROJECT_LEARNINGS_FALLBACK: ProjectDetailFallbackLearning[] = [
  {
    title: "Database optimization",
    description:
      "Balanced readability of queries against index coverage. Learned to measure hotspots before layering complexity.",
  },
  {
    title: "State management",
    description:
      "Chose the smallest abstraction that survived real flows—lifting state only where multiple surfaces depended on it.",
  },
  {
    title: "Responsive design",
    description:
      "Designed from narrow viewports outward; progressive enhancement avoided one-off breakpoints.",
  },
];
