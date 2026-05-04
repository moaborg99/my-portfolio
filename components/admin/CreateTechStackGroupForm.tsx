"use client";

import { useActionState } from "react";

import {
  createTechStackGroupAction,
  type CreateTechStackGroupState,
} from "@/app/admin/groups/create/actions";
import { ProjectFormActions } from "@/components/admin/ProjectFormActions";
import {
  FormLevelError,
  TextField,
  formFieldStackClassName,
  formSectionCardClassName,
} from "@/components/ui/FormField";

export function CreateTechStackGroupForm() {
  const [state, formAction, pending] = useActionState(
    createTechStackGroupAction,
    undefined as CreateTechStackGroupState
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
        </div>
      </div>

      <ProjectFormActions pending={pending} submitLabel="Skapa grupp" pendingLabel="Skapar…" />
    </form>
  );
}
