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
import { TECH_STACK_GROUP_ORDER } from "@/lib/tech-stack-groups";
import type { TechnicalSkillListItem } from "@/types/technical-skill";

type EditTechnicalSkillFormProps = {
  skill: TechnicalSkillListItem;
};

export function EditTechnicalSkillForm({ skill }: EditTechnicalSkillFormProps) {
  const [state, formAction, pending] = useActionState(
    updateTechnicalSkillAction,
    undefined as UpdateTechnicalSkillState
  );

  const err = state?.fieldErrors;
  const formError = state?.ok === false ? state.formError : undefined;

  const canonical = TECH_STACK_GROUP_ORDER as readonly string[];
  const legacyGroupActive = !canonical.includes(skill.group);

  const groupOptions = [
    ...canonical.map((g) => ({ value: g, label: g })),
    ...(legacyGroupActive ? [{ value: skill.group, label: `${skill.group} (lagrad grupp)` }] : []),
  ];

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
            name="group"
            label="Grupp"
            options={groupOptions}
            defaultValue={skill.group}
            error={err?.group?.[0]}
          />
        </div>
      </div>

      <ProjectFormActions pending={pending} submitLabel="Spara" pendingLabel="Sparar…" />
    </form>
  );
}
