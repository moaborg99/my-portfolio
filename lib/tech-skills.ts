import { prisma } from "@/lib/prisma";
import { TECH_STACK_GROUP_ORDER } from "@/lib/tech-stack-groups";
import type { TechnicalSkillListItem } from "@/types/technical-skill";
import type { TechStackGroup } from "@/types/tech-stack";

export async function getGroupedTechStack(): Promise<TechStackGroup[]> {
  const rows = await prisma.technicalSkill.findMany();

  const byGroup = new Map<string, { name: string; slug: string }[]>();

  for (const row of rows) {
    const bucket = byGroup.get(row.group) ?? [];
    bucket.push({ name: row.name, slug: row.slug });
    byGroup.set(row.group, bucket);
  }

  for (const bucket of byGroup.values()) {
    bucket.sort((a, b) => a.name.localeCompare(b.name, "sv"));
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
    if ((TECH_STACK_GROUP_ORDER as readonly string[]).includes(title)) continue;
    const bucket = byGroup.get(title)!;
    result.push({
      title,
      skills: bucket.map((s) => ({ name: s.name, slug: s.slug })),
    });
  }

  return result;
}

export async function getAllTechnicalSkills(): Promise<TechnicalSkillListItem[]> {
  const rows = await prisma.technicalSkill.findMany();

  const byGroup = new Map<string, typeof rows>();

  for (const row of rows) {
    const bucket = byGroup.get(row.group) ?? [];
    bucket.push(row);
    byGroup.set(row.group, bucket);
  }

  for (const bucket of byGroup.values()) {
    bucket.sort((a, b) => a.name.localeCompare(b.name, "sv"));
  }

  const ordered: typeof rows = [];

  for (const title of TECH_STACK_GROUP_ORDER) {
    const bucket = byGroup.get(title);
    if (bucket) ordered.push(...bucket);
  }

  for (const title of [...byGroup.keys()].sort()) {
    if ((TECH_STACK_GROUP_ORDER as readonly string[]).includes(title)) continue;
    ordered.push(...byGroup.get(title)!);
  }

  return ordered.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    group: r.group,
  }));
}

export async function getTechnicalSkillBySlug(
  slug: string
): Promise<TechnicalSkillListItem | undefined> {
  const clean = typeof slug === "string" ? slug.trim() : "";
  if (clean === "") return undefined;

  const row = await prisma.technicalSkill.findUnique({ where: { slug: clean } });

  if (!row) return undefined;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    group: row.group,
  };
}
