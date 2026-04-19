import type { TechStackGroup } from "@/types/tech-stack";
import { slugify } from "@/lib/slugify";

function group(title: string, skillNames: string[]): TechStackGroup {
  return {
    title,
    skills: skillNames.map((name) => ({ name, slug: slugify(name) })),
  };
}

export const techStackGroups: TechStackGroup[] = [
  group("Frontend", [
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
  group("Backend", ["Node.js", "PHP", "Laravel", "Livewire", "ASP.NET Core"]),
  group("Databaser", ["MySQL", "SQLite", "Better SQLite"]),
  group("UX/UI & design", ["Figma", "Canva", "SketchUp"]),
  group("CMS", ["WordPress · eget tema"]),
  group("Verktyg & metoder", [
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
