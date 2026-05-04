import { prisma } from "@/lib/prisma";
import type { TechnicalSkillListItem } from "@/types/technical-skill";
import type { TechStackGroup } from "@/types/tech-stack";
import type { TechStackGroupListItem } from "@/types/tech-stack-group";

export async function getGroupedTechStack(): Promise<TechStackGroup[]> {
  const rows = await prisma.technicalSkill.findMany({ include: { group: true } });

  const byGroup = new Map<string, { name: string; slug: string }[]>();

  for (const row of rows) {
    const bucket = byGroup.get(row.group.name) ?? [];
    bucket.push({ name: row.name, slug: row.slug });
    byGroup.set(row.group.name, bucket);
  }

  for (const bucket of byGroup.values()) {
    bucket.sort((a, b) => a.name.localeCompare(b.name, "sv"));
  }

  const titles = [...byGroup.keys()].sort((a, b) => a.localeCompare(b, "sv"));

  return titles.map((title) => ({
    title,
    skills: byGroup.get(title)!.map((s) => ({ name: s.name, slug: s.slug })),
  }));
}

export async function getAllTechnicalSkills(): Promise<TechnicalSkillListItem[]> {
  const rows = await prisma.technicalSkill.findMany({ include: { group: true } });

  const compare = (a: { group: { name: string }; name: string }, b: typeof a) => {
    const g = a.group.name.localeCompare(b.group.name, "sv");
    if (g !== 0) return g;
    return a.name.localeCompare(b.name, "sv");
  };

  return [...rows].sort(compare).map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    group: r.group.name,
    groupId: r.groupId,
  }));
}

export async function getTechnicalSkillBySlug(
  slug: string
): Promise<TechnicalSkillListItem | undefined> {
  const clean = typeof slug === "string" ? slug.trim() : "";
  if (clean === "") return undefined;

  const row = await prisma.technicalSkill.findUnique({
    where: { slug: clean },
    include: { group: true },
  });

  if (!row) return undefined;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    group: row.group.name,
    groupId: row.groupId,
  };
}

export async function getAllTechStackGroups(): Promise<TechStackGroupListItem[]> {
  const rows = await prisma.techStackGroup.findMany();
  return [...rows]
    .sort((a, b) => a.name.localeCompare(b.name, "sv"))
    .map((r) => ({ id: r.id, name: r.name, slug: r.slug }));
}

export async function getTechStackGroupBySlug(
  slug: string
): Promise<TechStackGroupListItem | undefined> {
  const clean = typeof slug === "string" ? slug.trim() : "";
  if (clean === "") return undefined;

  const row = await prisma.techStackGroup.findUnique({ where: { slug: clean } });
  if (!row) return undefined;
  return { id: row.id, name: row.name, slug: row.slug };
}
