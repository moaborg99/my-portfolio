"use client";

import { Trash2 } from "lucide-react";

import { deleteProject } from "@/app/admin/actions";

type DeleteProjectFormProps = {
  slug: string;
  title: string;
};

export function DeleteProjectForm({ slug, title }: DeleteProjectFormProps) {
  const label = `Delete “${title}” (${slug})`;

  return (
    <form
      action={deleteProject}
      onSubmit={(e) => {
        if (!window.confirm(`Delete “${title}” (${slug})? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="slug" value={slug} />
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
