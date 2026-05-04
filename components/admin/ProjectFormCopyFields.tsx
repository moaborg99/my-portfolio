"use client";

import type { ProjectFormFieldErrors } from "@/components/admin/ProjectFormTypes";
import {
  formFieldErrorMessage,
  formFieldStackClassName,
  formSectionCardClassName,
  TextAreaField,
  TextField,
} from "@/components/ui/FormField";
import type { Project } from "@/types/projects";

type CreateProps = {
  mode: "create";
  fieldErrors: ProjectFormFieldErrors;
};

type EditProps = {
  mode: "edit";
  fieldErrors: ProjectFormFieldErrors;
  project: Pick<Project, "title" | "summary" | "intro" | "description">;
};

export function ProjectFormCopyFields(props: CreateProps | EditProps) {
  const err = props.fieldErrors;
  const edit = props.mode === "edit" ? props : null;

  return (
    <div className={formSectionCardClassName}>
      <div className={formFieldStackClassName}>
        <TextField
          label="Titel"
          name="title"
          required
          placeholder="Projektets namn"
          {...(edit ? { defaultValue: edit.project.title } : {})}
          error={formFieldErrorMessage(err, "title")}
        />

        <TextAreaField
          label="Sammanfattning"
          hint="(kort tagline)"
          name="summary"
          required
          rows={3}
          placeholder="Kort rad som beskriver projektet"
          {...(edit ? { defaultValue: edit.project.summary } : {})}
          error={formFieldErrorMessage(err, "summary")}
        />

        <TextAreaField
          label="Intro"
          name="intro"
          required
          rows={4}
          placeholder="Lockande ingress till case study"
          {...(edit ? { defaultValue: edit.project.intro } : {})}
          error={formFieldErrorMessage(err, "intro")}
        />

        <TextAreaField
          label="Beskrivning"
          name="description"
          required
          rows={8}
          placeholder="Detaljerad beskrivning"
          {...(edit ? { defaultValue: edit.project.description } : {})}
          error={formFieldErrorMessage(err, "description")}
        />
      </div>
    </div>
  );
}
