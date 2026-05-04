"use server";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

import { revalidateTechnicalSkillDependentPaths } from "@/lib/revalidate-skills";
import { prisma } from "@/lib/prisma";
import { allocateUniqueTechnicalSkillSlug } from "@/lib/technical-skill-slug";
import { TECH_STACK_GROUP_ORDER } from "@/lib/tech-stack-groups";

function getText(formData: FormData, key: string): string {
  const v = formData.get(key);
  if (v === null) return "";
  return typeof v === "string" ? v : "";
}

const baseSchema = z.object({
  originalSlug: z.string().trim().min(1, "Missing skill."),
  name: z.string().trim().min(1, "Required"),
  group: z.string().trim().min(1, "Required"),
});

export type UpdateTechnicalSkillState =
  | undefined
  | { ok?: false; formError?: string; fieldErrors?: Record<string, string[] | undefined> };

export async function updateTechnicalSkillAction(
  _prev: UpdateTechnicalSkillState,
  formData: FormData
): Promise<UpdateTechnicalSkillState> {
  const parsed = baseSchema.safeParse({
    originalSlug: getText(formData, "originalSlug"),
    name: getText(formData, "name"),
    group: getText(formData, "group"),
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      ok: false,
      fieldErrors: flat.fieldErrors,
      formError:
        flat.formErrors.length > 0 ? flat.formErrors.join(" ") : "Fix the highlighted fields and try again.",
    };
  }

  const existing = await prisma.technicalSkill.findUnique({
    where: { slug: parsed.data.originalSlug },
  });

  if (!existing) {
    return { ok: false, formError: "Tekniken hittades inte." };
  }

  const canonical = TECH_STACK_GROUP_ORDER as readonly string[];
  const allowedGroup =
    canonical.includes(parsed.data.group) || parsed.data.group === existing.group;

  if (!allowedGroup) {
    return {
      ok: false,
      fieldErrors: { group: ["Ogiltig grupp."] },
      formError: "Fix the highlighted fields and try again.",
    };
  }

  const newSlug = await allocateUniqueTechnicalSkillSlug(parsed.data.name, existing.id);

  try {
    await prisma.technicalSkill.update({
      where: { id: existing.id },
      data: {
        name: parsed.data.name,
        slug: newSlug,
        group: parsed.data.group,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return {
        ok: false,
        formError: "Slug-kollision — försök med ett tydligare namn.",
      };
    }
    throw e;
  }

  await revalidateTechnicalSkillDependentPaths();

  if (newSlug !== parsed.data.originalSlug) {
    redirect(`/admin/skills/${encodeURIComponent(newSlug)}/edit`);
  }

  redirect("/admin");
}
