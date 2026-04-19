import { prisma } from "@/lib/prisma";
import type { TechStackGroup } from "@/types/tech-stack";

/**
 * Order for section titles. Must match `TechnicalSkill.group` in the DB
 * (same strings as `techStackGroups[].title` in data/tech-stack.ts).
 */
const TECH_STACK_GROUP_ORDER: string[] = [
  "Frontend",
  "Backend",
  "Databaser",
  "UX/UI & design",
  "CMS",
  "Verktyg & metoder",
];

export async function getGroupedTechStack(): Promise<TechStackGroup[]> {
  const rows = await prisma.technicalSkill.findMany();

  const byGroup = new Map<string, { name: string; slug: string; sortOrder: number }[]>();

  for (const row of rows) {
    const bucket = byGroup.get(row.group) ?? [];
    bucket.push({ name: row.name, slug: row.slug, sortOrder: row.sortOrder });
    byGroup.set(row.group, bucket);
  }

  for (const bucket of byGroup.values()) {
    bucket.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  const result: TechStackGroup[] = [];

  for (const title of TECH_STACK_GROUP_ORDER) {
    const bucket = byGroup.get(title);
    if (bucket) {
      result.push({
        title,
        skills: bucket.map((s) => ({ name: s.name, slug: s.slug })),
      });
    }
  }

  for (const title of [...byGroup.keys()].sort()) {
    if (TECH_STACK_GROUP_ORDER.includes(title)) continue;
    const bucket = byGroup.get(title)!;
    result.push({
      title,
      skills: bucket.map((s) => ({ name: s.name, slug: s.slug })),
    });
  }

  return result;
}
