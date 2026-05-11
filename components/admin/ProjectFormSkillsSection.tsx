"use client";

import type { ProjectFormFieldErrors } from "@/components/admin/ProjectFormTypes";
import { DarkFormMultiPicklist } from "@/components/ui/DarkFormMultiPicklist";
import { formFieldErrorMessage, formSectionCardClassName } from "@/components/ui/FormField";
import type { TechnicalSkillListItem } from "@/types/technical-skill";

type ProjectFormSkillsSectionProps = {
  fieldErrors?: ProjectFormFieldErrors;
  skills: TechnicalSkillListItem[];
  defaultValues: string[];
};

export function ProjectFormSkillsSection({
  fieldErrors,
  skills,
  defaultValues,
}: ProjectFormSkillsSectionProps) {
  const options = skills.map((s) => ({
    value: String(s.id),
    label: s.name,
    group: s.group,
  }));

  return (
    <section className={formSectionCardClassName} aria-labelledby="project-skills-heading">
      <h2 id="project-skills-heading" className="mb-2 text-lg font-semibold tracking-tight text-fg">
        Tekniska färdigheter
      </h2>
      <p className="mb-4 text-xs leading-relaxed text-fg-muted">
        Välj färdigheter att koppla till projektet. Ordningen avgör visningsordningen publikt.
      </p>
      <DarkFormMultiPicklist
        name="skillIds"
        label="Färdigheter"
        options={options}
        defaultValues={defaultValues}
        placeholder="Välj färdigheter…"
        error={formFieldErrorMessage(fieldErrors, "skillIds")}
      />
    </section>
  );
}
