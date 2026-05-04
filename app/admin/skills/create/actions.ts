"use server";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

import { revalidateTechnicalSkillDependentPaths } from "@/lib/revalidate-skills";
import { prisma } from "@/lib/prisma";
import { allocateUniqueTechnicalSkillSlug } from "@/lib/technical-skill-slug";

function getText(formData: FormData, key: string): string {
  const v = formData.get(key);
  if (v === null) return "";
  return typeof v === "string" ? v : "";
}

const schema = z.object({
  name: z.string().trim().min(1, "Obligatoriskt"),
  groupId: z.coerce.number().int().positive("Välj en teknikgrupp."),
});

export type CreateTechnicalSkillState =
  | undefined
  | { ok?: false; formError?: string; fieldErrors?: Record<string, string[] | undefined> };

export async function createTechnicalSkillAction(
  _prev: CreateTechnicalSkillState,
  formData: FormData
): Promise<CreateTechnicalSkillState> {
  const parsed = schema.safeParse({
    name: getText(formData, "name"),
    groupId: getText(formData, "groupId"),
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      ok: false,
      fieldErrors: flat.fieldErrors,
      formError:
        flat.formErrors.length > 0
          ? flat.formErrors.join(" ")
          : "Åtgärda markerade fält och försök igen.",
    };
  }

  const groupExists = await prisma.techStackGroup.findUnique({
    where: { id: parsed.data.groupId },
    select: { id: true },
  });

  if (!groupExists) {
    return {
      ok: false,
      fieldErrors: { groupId: ["Teknikgruppen finns inte längre."] },
      formError: "Åtgärda markerade fält och försök igen.",
    };
  }

  const slugToUse = await allocateUniqueTechnicalSkillSlug(parsed.data.name);

  try {
    await prisma.technicalSkill.create({
      data: {
        name: parsed.data.name,
        slug: slugToUse,
        groupId: parsed.data.groupId,
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

  redirect("/admin/skills");
}
