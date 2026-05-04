/**
 * Placeholder rich sections for project detail pages (`app/projects/[slug]`, public URL `/projekt/...`).
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
      "Jag byggde gränssnittet med funktionella komponenter och hooks, med tydlig återanvändning av layout, förutsägbart state och separation mellan presentation och data.",
  },
  {
    name: "Tailwind CSS",
    usage:
      "Mobile-first-layout med konsekvent spacing. Tokens kopplar designbeslut så att brytpunkter och typografi hänger ihop med resten av portfolion.",
  },
  {
    name: "SQLite / Prisma",
    usage:
      "Strukturerat schema och pragmatiska index för filtrering och uppslag. Enkla driftsättningar samtidigt som relationer i datamodellen behålls.",
  },
];

export const PROJECT_LEARNINGS_FALLBACK: ProjectDetailFallbackLearning[] = [
  {
    title: "Databasoptimering",
    description:
      "Balanserade läsbarhet i frågor mot indexering. Lärde mig mäta flaskhalsar innan jag lade på mer komplexitet.",
  },
  {
    title: "State-hantering",
    description:
      "Valde minsta abstraktion som höll i verkliga flöden — lyfte state bara där flera ytor behövde samma data.",
  },
  {
    title: "Responsiv design",
    description:
      "Utgick från smala vykortsstorlekar och byggde utåt; progressiv förbättring gav färre specialfall för brytpunkter.",
  },
];
