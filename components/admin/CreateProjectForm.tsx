"use client";

import { useActionState } from "react";

import Link from "next/link";

import { createProjectAction, type CreateProjectState } from "@/app/admin/projects/create/actions";
import { buttonClassName } from "@/components/ui/Button";

function fieldHint(errors: Record<string, string[] | undefined> | undefined, key: string) {
  const msg = errors?.[key]?.[0];
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs text-red-400" role="alert">
      {msg}
    </p>
  );
}

export function CreateProjectForm() {
  const [state, formAction, pending] = useActionState(
    createProjectAction,
    undefined as CreateProjectState
  );

  return (
    <form action={formAction} className="space-y-4">
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
          placeholder="/about-cta.jpg"
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
          {pending ? "Creating…" : "Create project"}
        </button>
        <Link href="/admin" className={buttonClassName("secondary")}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
