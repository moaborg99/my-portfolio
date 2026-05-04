import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

/**
 * Stable unique slug from display name. When updating, pass `excludeSkillId` so the current row
 * does not count as a collision.
 */
export async function allocateUniqueTechnicalSkillSlug(
  name: string,
  excludeSkillId?: number
): Promise<string> {
  let base = slugify(name.trim());
  if (base === "") base = "skill";

  let candidate = base;
  let suffix = 2;

  for (;;) {
    const clash = await prisma.technicalSkill.findFirst({
      where: {
        slug: candidate,
        ...(excludeSkillId !== undefined ? { NOT: { id: excludeSkillId } } : {}),
      },
      select: { id: true },
    });
    if (!clash) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}
