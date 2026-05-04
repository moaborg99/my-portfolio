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

const groupSchema = z.enum(TECH_STACK_GROUP_ORDER);

const schema = z.object({
  name: z.string().trim().min(1, "Required"),
  group: groupSchema,
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

  const slugToUse = await allocateUniqueTechnicalSkillSlug(parsed.data.name);

  try {
    await prisma.technicalSkill.create({
      data: {
        name: parsed.data.name,
        slug: slugToUse,
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

  redirect("/admin");
}
