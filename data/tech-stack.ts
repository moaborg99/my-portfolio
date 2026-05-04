import type { TechStackSkill } from "@/types/tech-stack";
import { slugify } from "@/lib/slugify";

/** Seed row: stable `slug` for Prisma upsert; `title` is Swedish UI copy. */
export type TechStackGroupSeed = {
  slug: string;
  title: string;
  skills: TechStackSkill[];
};

function group(slug: string, title: string, skillNames: string[]): TechStackGroupSeed {
  return {
    slug,
    title,
    skills: skillNames.map((name) => ({ name, slug: slugify(name) })),
  };
}

export const techStackGroups: TechStackGroupSeed[] = [
  group("frontend", "Klient och gränssnitt", [
    "HTML",
    "CSS",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Angular",
    "Alpine.js",
  ]),
  group("backend", "Server och backend", ["Node.js", "PHP", "Laravel", "Livewire", "ASP.NET Core"]),
  group("databaser", "Databaser", ["MySQL", "SQLite", "Better SQLite"]),
  group("ux-ui-design", "UX och design", ["Figma", "Canva", "SketchUp"]),
  group("cms", "Innehåll (CMS)", ["WordPress · eget tema"]),
  group("verktyg-metoder", "Verktyg och metoder", [
    "Git",
    "GitHub",
    "VS Code",
    "Cursor",
    "TablePlus",
    "Laravel Herd",
    "Scrum",
    "Domän & DNS-hantering",
  ]),
];
