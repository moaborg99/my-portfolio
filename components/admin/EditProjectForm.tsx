"use client";

import { useActionState } from "react";

import Link from "next/link";

import {
  updateProjectAction,
  type UpdateProjectState,
} from "@/app/admin/projects/[slug]/edit/actions";
import { buttonClassName } from "@/components/ui/Button";
import type { Project } from "@/types/projects";

type EditProjectFormProps = {
  project: Project;
};

function fieldHint(errors: Record<string, string[] | undefined> | undefined, key: string) {
  const msg = errors?.[key]?.[0];
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs text-red-400" role="alert">
      {msg}
    </p>
  );
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProjectAction,
    undefined as UpdateProjectState
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="slug" value={project.slug} />

      {state?.ok === false && state.formError ? (
        <p className="text-sm text-red-400" role="alert">
          {state.formError}
        </p>
      ) : null}

      <div>
        <label className="mb-1 block text-sm text-fg-muted" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={project.title}
          className="w-full rounded border border-white/15 bg-navy-light px-3 py-2 text-fg"
        />
        {fieldHint(state?.fieldErrors, "title")}
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg-muted" htmlFor="summary">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={3}
          defaultValue={project.summary}
          className="w-full rounded border border-white/15 bg-navy-light px-3 py-2 text-fg"
        />
        {fieldHint(state?.fieldErrors, "summary")}
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg-muted" htmlFor="intro">
          Intro
        </label>
        <textarea
          id="intro"
          name="intro"
          required
          rows={4}
          defaultValue={project.intro}
          className="w-full rounded border border-white/15 bg-navy-light px-3 py-2 text-fg"
        />
        {fieldHint(state?.fieldErrors, "intro")}
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg-muted" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={6}
          defaultValue={project.description}
          className="w-full rounded border border-white/15 bg-navy-light px-3 py-2 text-fg"
        />
        {fieldHint(state?.fieldErrors, "description")}
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg-muted" htmlFor="featuredImage">
          Featured image (path or URL)
        </label>
        <input
          id="featuredImage"
          name="featuredImage"
          required
          defaultValue={project.featuredImage}
          className="w-full rounded border border-white/15 bg-navy-light px-3 py-2 font-mono text-sm text-fg"
        />
        {fieldHint(state?.fieldErrors, "featuredImage")}
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg-muted" htmlFor="githubUrl">
          GitHub URL (optional)
        </label>
        <input
          id="githubUrl"
          name="githubUrl"
          type="url"
          defaultValue={project.githubUrl ?? ""}
          className="w-full rounded border border-white/15 bg-navy-light px-3 py-2 text-fg"
        />
        {fieldHint(state?.fieldErrors, "githubUrl")}
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg-muted" htmlFor="deployUrl">
          Deploy URL (optional)
        </label>
        <input
          id="deployUrl"
          name="deployUrl"
          type="url"
          defaultValue={project.deployUrl ?? ""}
          className="w-full rounded border border-white/15 bg-navy-light px-3 py-2 text-fg"
        />
        {fieldHint(state?.fieldErrors, "deployUrl")}
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg-muted" htmlFor="videoUrl">
          Video URL (optional)
        </label>
        <input
          id="videoUrl"
          name="videoUrl"
          type="url"
          defaultValue={project.videoUrl ?? ""}
          className="w-full rounded border border-white/15 bg-navy-light px-3 py-2 text-fg"
        />
        {fieldHint(state?.fieldErrors, "videoUrl")}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className={[buttonClassName("primary"), "disabled:opacity-50"].filter(Boolean).join(" ")}
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        <Link href="/admin" className={buttonClassName("secondary")}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
