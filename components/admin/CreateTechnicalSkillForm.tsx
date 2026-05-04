"use client";

import { useActionState } from "react";

import {
  createTechnicalSkillAction,
  type CreateTechnicalSkillState,
} from "@/app/admin/skills/create/actions";
import { ProjectFormActions } from "@/components/admin/ProjectFormActions";
import { DarkFormPicklist } from "@/components/ui/DarkFormPicklist";
import {
  FormLevelError,
  TextField,
  formFieldStackClassName,
  formSectionCardClassName,
} from "@/components/ui/FormField";
import type { TechStackGroupListItem } from "@/types/tech-stack-group";

type CreateTechnicalSkillFormProps = {
  groups: TechStackGroupListItem[];
};

export function CreateTechnicalSkillForm({ groups }: CreateTechnicalSkillFormProps) {
  const [state, formAction, pending] = useActionState(
    createTechnicalSkillAction,
    undefined as CreateTechnicalSkillState
  );

  const err = state?.fieldErrors;
  const formError = state?.ok === false ? state.formError : undefined;

  return (
    <form action={formAction} className="w-full space-y-8">
      <FormLevelError message={formError} />

      <div className={formSectionCardClassName}>
        <div className={formFieldStackClassName}>
          <TextField
            name="name"
            label="Namn"
            required
            error={err?.name?.[0]}
            autoComplete="off"
          />

          <DarkFormPicklist
            name="groupId"
            label="Grupp"
            options={groups.map((g) => ({ value: String(g.id), label: g.name }))}
            defaultValue=""
            placeholder={groups.length > 0 ? "Välj grupp…" : "Inga grupper finns — skapa en först"}
            error={err?.groupId?.[0]}
          />
        </div>
      </div>

      <ProjectFormActions pending={pending} submitLabel="Skapa teknik" pendingLabel="Skapar…" />
    </form>
  );
}
