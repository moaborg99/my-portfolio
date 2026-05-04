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
import { TECH_STACK_GROUP_ORDER } from "@/lib/tech-stack-groups";

export function CreateTechnicalSkillForm() {
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
            name="group"
            label="Grupp"
            options={TECH_STACK_GROUP_ORDER.map((g) => ({ value: g, label: g }))}
            defaultValue=""
            placeholder="Välj grupp…"
            error={err?.group?.[0]}
          />
        </div>
      </div>

      <ProjectFormActions pending={pending} submitLabel="Skapa teknik" pendingLabel="Skapar…" />
    </form>
  );
}
