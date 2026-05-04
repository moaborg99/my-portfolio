import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

/**
 * Stable unique slug from group name. When updating, pass `excludeId` so the current row
 * does not count as a collision.
 */
export async function allocateUniqueTechStackGroupSlug(
  name: string,
  excludeId?: number
): Promise<string> {
  let base = slugify(name.trim());
  if (base === "") base = "group";

  let candidate = base;
  let suffix = 2;

  for (;;) {
    const clash = await prisma.techStackGroup.findFirst({
      where: {
        slug: candidate,
        ...(excludeId !== undefined ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });
    if (!clash) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}
