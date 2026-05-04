"use client";

import { Trash2 } from "lucide-react";

import { deleteTechnicalSkill } from "@/app/admin/actions";

type DeleteTechnicalSkillFormProps = {
  slug: string;
  name: string;
};

export function DeleteTechnicalSkillForm({ slug, name }: DeleteTechnicalSkillFormProps) {
  const label = `Ta bort “${name}” (${slug})`;

  return (
    <form action={deleteTechnicalSkill.bind(null, slug)}>
      <button
        type="submit"
        aria-label={label}
        className="inline-flex -m-2 items-center justify-center p-2 text-red-400/90 transition-colors hover:text-red-300"
      >
        <Trash2 className="size-6 shrink-0" aria-hidden />
      </button>
    </form>
  );
}
