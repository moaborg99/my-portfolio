"use client";

import { useActionState } from "react";

import {
  updateTechStackGroupAction,
  type UpdateTechStackGroupState,
} from "@/app/admin/groups/[slug]/edit/actions";
import { ProjectFormActions } from "@/components/admin/ProjectFormActions";
import {
  FormLevelError,
  TextField,
  formFieldStackClassName,
  formSectionCardClassName,
} from "@/components/ui/FormField";
import type { TechStackGroupListItem } from "@/types/tech-stack-group";

type EditTechStackGroupFormProps = {
  group: TechStackGroupListItem;
};

export function EditTechStackGroupForm({ group }: EditTechStackGroupFormProps) {
  const [state, formAction, pending] = useActionState(
    updateTechStackGroupAction,
    undefined as UpdateTechStackGroupState
  );

  const err = state?.fieldErrors;
  const formError = state?.ok === false ? state.formError : undefined;

  return (
    <form action={formAction} className="w-full space-y-8">
      <input type="hidden" name="originalSlug" value={group.slug} />

      <FormLevelError message={formError} />

      <div className={formSectionCardClassName}>
        <div className={formFieldStackClassName}>
          <TextField
            name="name"
            label="Namn"
            required
            defaultValue={group.name}
            error={err?.name?.[0]}
            autoComplete="off"
          />
        </div>
      </div>

      <ProjectFormActions pending={pending} submitLabel="Spara" pendingLabel="Sparar…" />
    </form>
  );
}
