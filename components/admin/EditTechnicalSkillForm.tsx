"use client";

import { useActionState } from "react";

import {
  updateTechnicalSkillAction,
  type UpdateTechnicalSkillState,
} from "@/app/admin/skills/[slug]/edit/actions";
import { ProjectFormActions } from "@/components/admin/ProjectFormActions";
import { DarkFormPicklist } from "@/components/ui/DarkFormPicklist";
import {
  FormLevelError,
  TextField,
  formFieldStackClassName,
  formSectionCardClassName,
} from "@/components/ui/FormField";
import type { TechnicalSkillListItem } from "@/types/technical-skill";
import type { TechStackGroupListItem } from "@/types/tech-stack-group";

type EditTechnicalSkillFormProps = {
  skill: TechnicalSkillListItem;
  groups: TechStackGroupListItem[];
};

export function EditTechnicalSkillForm({ skill, groups }: EditTechnicalSkillFormProps) {
  const [state, formAction, pending] = useActionState(
    updateTechnicalSkillAction,
    undefined as UpdateTechnicalSkillState
  );

  const err = state?.fieldErrors;
  const formError = state?.ok === false ? state.formError : undefined;

  return (
    <form action={formAction} className="w-full space-y-8">
      <input type="hidden" name="originalSlug" value={skill.slug} />

      <FormLevelError message={formError} />

      <div className={formSectionCardClassName}>
        <div className={formFieldStackClassName}>
          <TextField
            name="name"
            label="Namn"
            required
            defaultValue={skill.name}
            error={err?.name?.[0]}
            autoComplete="off"
          />

          <DarkFormPicklist
            key={skill.slug}
            name="groupId"
            label="Teknikgrupp"
            options={groups.map((g) => ({ value: String(g.id), label: g.name }))}
            defaultValue={String(skill.groupId)}
            error={err?.groupId?.[0]}
          />
        </div>
      </div>

      <ProjectFormActions pending={pending} submitLabel="Spara" pendingLabel="Sparar…" />
    </form>
  );
}
