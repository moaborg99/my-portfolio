"use server";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

import { revalidateTechnicalSkillDependentPaths } from "@/lib/revalidate-skills";
import { prisma } from "@/lib/prisma";
import { allocateUniqueTechStackGroupSlug } from "@/lib/tech-stack-group-slug";

function getText(formData: FormData, key: string): string {
  const v = formData.get(key);
  if (v === null) return "";
  return typeof v === "string" ? v : "";
}

const schema = z.object({
  name: z.string().trim().min(1, "Required"),
});

export type CreateTechStackGroupState =
  | undefined
  | { ok?: false; formError?: string; fieldErrors?: Record<string, string[] | undefined> };

export async function createTechStackGroupAction(
  _prev: CreateTechStackGroupState,
  formData: FormData
): Promise<CreateTechStackGroupState> {
  const parsed = schema.safeParse({
    name: getText(formData, "name"),
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      ok: false,
      fieldErrors: flat.fieldErrors,
      formError:
        flat.formErrors.length > 0
          ? flat.formErrors.join(" ")
          : "Fix the highlighted fields and try again.",
    };
  }

  const slugToUse = await allocateUniqueTechStackGroupSlug(parsed.data.name);

  try {
    await prisma.techStackGroup.create({
      data: { name: parsed.data.name, slug: slugToUse },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return {
        ok: false,
        fieldErrors: { name: ["Namnet används redan."] },
        formError: "Namnet måste vara unikt.",
      };
    }
    throw e;
  }

  await revalidateTechnicalSkillDependentPaths();

  redirect("/admin/groups");
}
