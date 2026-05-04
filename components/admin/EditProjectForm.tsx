"use client";

import { useActionState } from "react";

import {
  updateProjectAction,
  type UpdateProjectState,
} from "@/app/admin/projects/[slug]/edit/actions";
import { ProjectDetailFormSections } from "@/components/admin/ProjectDetailFormSections";
import { ProjectFormActions } from "@/components/admin/ProjectFormActions";
import { ProjectFormCopyFields } from "@/components/admin/ProjectFormCopyFields";
import { ProjectFormMediaSection } from "@/components/admin/ProjectFormMediaSection";
import { FormLevelError } from "@/components/ui/FormField";
import type { Project } from "@/types/projects";

type EditProjectFormProps = {
  project: Project;
};

export function EditProjectForm({ project }: EditProjectFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProjectAction,
    undefined as UpdateProjectState
  );
  const err = state?.fieldErrors;
  const formError = state?.ok === false ? state.formError : undefined;

  return (
    <form action={formAction} className="mx-auto max-w-4xl space-y-8">
      <input type="hidden" name="slug" value={project.slug} />

      <FormLevelError message={formError} />

      <ProjectFormCopyFields mode="edit" fieldErrors={err} project={project} />

      <ProjectDetailFormSections
        key={project.slug}
        fieldErrors={err}
        techDetails={project.techDetails}
        learnings={project.learnings}
      />

      <ProjectFormMediaSection
        mode="edit"
        fieldErrors={err}
        urls={{
          githubUrl: project.githubUrl,
          deployUrl: project.deployUrl,
          videoUrl: project.videoUrl,
        }}
      />

      <ProjectFormActions pending={pending} submitLabel="Spara" pendingLabel="Sparar…" />
    </form>
  );
}
