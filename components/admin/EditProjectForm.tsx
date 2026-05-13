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
import { ProjectFormSkillsSection } from "@/components/admin/ProjectFormSkillsSection";
import { FormLevelError } from "@/components/ui/FormField";
import type { Project } from "@/types/projects";
import type { TechnicalSkillListItem } from "@/types/technical-skill";

type EditProjectFormProps = {
  project: Project;
  skills: TechnicalSkillListItem[];
};

export function EditProjectForm({ project, skills }: EditProjectFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProjectAction,
    undefined as UpdateProjectState
  );
  const err = state?.fieldErrors;
  const formError = state?.ok === false ? state.formError : undefined;

  return (
    <form action={formAction} className="w-full space-y-8">
      <input type="hidden" name="slug" value={project.slug} />

      <FormLevelError message={formError} />

      <ProjectFormCopyFields mode="edit" fieldErrors={err} project={project} />

      <ProjectFormSkillsSection
        key={`${project.slug}-skills`}
        fieldErrors={err}
        skills={skills}
        defaultValues={project.skills.map((s) => String(s.id))}
      />

      <ProjectDetailFormSections
        key={project.slug}
        fieldErrors={err}
        techDetails={project.techDetails}
        learnings={project.learnings}
      />

      <ProjectFormMediaSection
        key={`${project.slug}-media`}
        mode="edit"
        fieldErrors={err}
        urls={{
          githubUrl: project.githubUrl,
          deployUrl: project.deployUrl,
          videoUrl: project.videoUrl,
        }}
        galleryImages={project.images}
      />

      <ProjectFormActions pending={pending} submitLabel="Spara" pendingLabel="Sparar…" />
    </form>
  );
}
