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
  originalSlug: z.string().trim().min(1, "Missing group."),
  name: z.string().trim().min(1, "Required"),
});

export type UpdateTechStackGroupState =
  | undefined
  | { ok?: false; formError?: string; fieldErrors?: Record<string, string[] | undefined> };

export async function updateTechStackGroupAction(
  _prev: UpdateTechStackGroupState,
  formData: FormData
): Promise<UpdateTechStackGroupState> {
  const parsed = schema.safeParse({
    originalSlug: getText(formData, "originalSlug"),
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

  const existing = await prisma.techStackGroup.findUnique({
    where: { slug: parsed.data.originalSlug },
  });

  if (!existing) {
    return { ok: false, formError: "Teknikgruppen hittades inte." };
  }

  const newSlug = await allocateUniqueTechStackGroupSlug(parsed.data.name, existing.id);

  try {
    await prisma.techStackGroup.update({
      where: { id: existing.id },
      data: { name: parsed.data.name, slug: newSlug },
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

  if (newSlug !== parsed.data.originalSlug) {
    redirect(`/admin/groups/${encodeURIComponent(newSlug)}/edit`);
  }

  redirect("/admin/groups");
}
