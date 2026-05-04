"use client";

import { useActionState } from "react";

import { createProjectAction, type CreateProjectState } from "@/app/admin/projects/create/actions";
import { ProjectDetailFormSections } from "@/components/admin/ProjectDetailFormSections";
import { ProjectFormActions } from "@/components/admin/ProjectFormActions";
import { ProjectFormCopyFields } from "@/components/admin/ProjectFormCopyFields";
import { ProjectFormMediaSection } from "@/components/admin/ProjectFormMediaSection";
import { FormLevelError } from "@/components/ui/FormField";

export function CreateProjectForm() {
  const [state, formAction, pending] = useActionState(
    createProjectAction,
    undefined as CreateProjectState
  );
  const err = state?.fieldErrors;
  const formError = state?.ok === false ? state.formError : undefined;

  return (
    <form action={formAction} className="mx-auto max-w-4xl space-y-8">
      <FormLevelError message={formError} />

      <ProjectFormCopyFields mode="create" fieldErrors={err} />

      <ProjectDetailFormSections fieldErrors={err} />

      <ProjectFormMediaSection mode="create" fieldErrors={err} />

      <ProjectFormActions
        pending={pending}
        submitLabel="Skapa projekt"
        pendingLabel="Skapar…"
      />
    </form>
  );
}
