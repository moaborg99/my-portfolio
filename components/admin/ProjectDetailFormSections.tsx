"use client";

import { useCallback, useId, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { buttonClassName } from "@/components/ui/Button";
import {
  FormFieldError,
  formControlClassName,
  formFieldErrorMessage,
  formLabelClassName,
  formSectionCardClassName,
  formTextareaClassName,
} from "@/components/ui/FormField";
import type { ProjectFormFieldErrors } from "@/components/admin/ProjectFormTypes";
import { MAX_PROJECT_DETAIL_REPEATER_ROWS } from "@/lib/project-detail-from-form";
import type { DetailItem } from "@/types/project-detail";
import type { ProjectLearningBullet } from "@/types/projects";

/** Row card: bordered, delete vertically centered beside tall fields */
const repeaterRow =
  "flex items-start gap-5 rounded-lg border border-white/10 bg-navy-dark/25 p-5 sm:gap-7 sm:p-6 md:gap-8";
const trashBtn =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-red-500/15 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/30";

type ProjectDetailFormSectionsProps = {
  fieldErrors?: ProjectFormFieldErrors;
  techDetails?: DetailItem[];
  learnings?: ProjectLearningBullet[];
};

type TechUiRow = { id: string; techName: string; usage: string };
type LearningUiRow = { id: string; title: string; description: string };

function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

function rowsFromTech(d: DetailItem[] | undefined): TechUiRow[] {
  return (d ?? []).map((x) => ({ id: newId(), techName: x.name, usage: x.usage }));
}

function rowsFromLearnings(l: ProjectLearningBullet[] | undefined): LearningUiRow[] {
  return (l ?? []).map((x) => ({ id: newId(), title: x.title, description: x.description }));
}

function RepeaterPanel({
  titleId,
  title,
  errorKey,
  fieldErrors,
  count,
  addDisabled,
  onAdd,
  addLabel,
  children,
}: {
  titleId: string;
  title: string;
  errorKey: string;
  fieldErrors?: ProjectFormFieldErrors;
  count: number;
  addDisabled: boolean;
  onAdd: () => void;
  addLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section className={formSectionCardClassName} aria-labelledby={titleId}>
      <div className="mb-2 pb-2">
        <div className="flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold tracking-tight text-fg">
            {title}
          </h2>
          <button
            type="button"
            onClick={onAdd}
            disabled={addDisabled}
            className={[
              buttonClassName("secondary"),
              "shrink-0 gap-2",
              addDisabled ? "opacity-45" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Plus className="size-4 shrink-0" aria-hidden />
            {addLabel}
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-fg-muted">
          Valfritt — max {MAX_PROJECT_DETAIL_REPEATER_ROWS} rader.
        </p>
      </div>
      <FormFieldError message={formFieldErrorMessage(fieldErrors, errorKey)} />
      {count > 0 ? <div className="mt-4 space-y-4">{children}</div> : null}
    </section>
  );
}

export function ProjectDetailFormSections({
  fieldErrors,
  techDetails,
  learnings,
}: ProjectDetailFormSectionsProps) {
  const id = useId();
  const techTitleId = `${id}-tech`;
  const learnTitleId = `${id}-learn`;

  const [techRows, setTechRows] = useState<TechUiRow[]>(() => rowsFromTech(techDetails));
  const [learningRows, setLearningRows] = useState<LearningUiRow[]>(() =>
    rowsFromLearnings(learnings)
  );

  const addTech = useCallback(() => {
    setTechRows((p) =>
      p.length >= MAX_PROJECT_DETAIL_REPEATER_ROWS
        ? p
        : [...p, { id: newId(), techName: "", usage: "" }]
    );
  }, []);
  const rmTech = useCallback((i: number) => setTechRows((p) => p.filter((_, j) => j !== i)), []);
  const setTech = useCallback(
    (i: number, patch: Partial<Pick<TechUiRow, "techName" | "usage">>) => {
      setTechRows((p) => p.map((r, j) => (j === i ? { ...r, ...patch } : r)));
    },
    []
  );

  const addLearn = useCallback(() => {
    setLearningRows((p) =>
      p.length >= MAX_PROJECT_DETAIL_REPEATER_ROWS
        ? p
        : [...p, { id: newId(), title: "", description: "" }]
    );
  }, []);
  const rmLearn = useCallback(
    (i: number) => setLearningRows((p) => p.filter((_, j) => j !== i)),
    []
  );
  const setLearn = useCallback(
    (i: number, patch: Partial<Pick<LearningUiRow, "title" | "description">>) => {
      setLearningRows((p) => p.map((r, j) => (j === i ? { ...r, ...patch } : r)));
    },
    []
  );

  const techCap = techRows.length >= MAX_PROJECT_DETAIL_REPEATER_ROWS;
  const learnCap = learningRows.length >= MAX_PROJECT_DETAIL_REPEATER_ROWS;

  return (
    <div className="space-y-8">
      <RepeaterPanel
        titleId={techTitleId}
        title="Teknikstack och användning"
        errorKey="_techRepeater"
        fieldErrors={fieldErrors}
        count={techRows.length}
        addDisabled={techCap}
        onAdd={addTech}
        addLabel="Lägg till rad"
      >
        {techRows.map((row, idx) => {
          const tn = `tu_${idx}_techName`;
          const tu = `tu_${idx}_usage`;
          return (
            <div key={row.id} className={repeaterRow}>
              <div className="min-w-0 flex-1">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <div>
                    <label className={formLabelClassName} htmlFor={tn}>
                      Teknologi
                    </label>
                    <input
                      id={tn}
                      name={tn}
                      value={row.techName}
                      autoComplete="off"
                      placeholder="t.ex. Next.js"
                      onChange={(e) => setTech(idx, { techName: e.target.value })}
                      className={formControlClassName}
                    />
                    <FormFieldError message={formFieldErrorMessage(fieldErrors, tn)} />
                  </div>
                  <div>
                    <label className={formLabelClassName} htmlFor={tu}>
                      Hur du använde den
                    </label>
                    <textarea
                      id={tu}
                      name={tu}
                      rows={3}
                      value={row.usage}
                      placeholder="Kort vad du byggde eller konfigurerade."
                      onChange={(e) => setTech(idx, { usage: e.target.value })}
                      className={`${formTextareaClassName} min-h-[4.25rem]`}
                    />
                    <FormFieldError message={formFieldErrorMessage(fieldErrors, tu)} />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => rmTech(idx)}
                className={`${trashBtn} shrink-0`}
                aria-label={`Ta bort teknologirad ${idx + 1}`}
              >
                <Trash2 className="size-6 shrink-0" aria-hidden />
              </button>
            </div>
          );
        })}
      </RepeaterPanel>

      <RepeaterPanel
        titleId={learnTitleId}
        title="Lärdomar"
        errorKey="_learnRepeater"
        fieldErrors={fieldErrors}
        count={learningRows.length}
        addDisabled={learnCap}
        onAdd={addLearn}
        addLabel="Lägg till punkt"
      >
        {learningRows.map((row, idx) => {
          const ttl = `lr_${idx}_title`;
          const dsc = `lr_${idx}_description`;
          return (
            <div key={row.id} className={repeaterRow}>
              <div className="min-w-0 flex-1">
                <div className="space-y-6">
                  <div>
                    <label className={formLabelClassName} htmlFor={ttl}>
                      Rubrik
                    </label>
                    <input
                      id={ttl}
                      name={ttl}
                      value={row.title}
                      autoComplete="off"
                      placeholder="t.ex. Iteration slår perfektion"
                      onChange={(e) => setLearn(idx, { title: e.target.value })}
                      className={formControlClassName}
                    />
                    <FormFieldError message={formFieldErrorMessage(fieldErrors, ttl)} />
                  </div>
                  <div>
                    <label className={formLabelClassName} htmlFor={dsc}>
                      Beskrivning
                    </label>
                    <textarea
                      id={dsc}
                      name={dsc}
                      rows={2}
                      value={row.description}
                      placeholder="Utveckla i en–två meningar."
                      onChange={(e) => setLearn(idx, { description: e.target.value })}
                      className={`${formTextareaClassName} min-h-[3.5rem]`}
                    />
                    <FormFieldError message={formFieldErrorMessage(fieldErrors, dsc)} />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => rmLearn(idx)}
                className={`${trashBtn} shrink-0`}
                aria-label={`Ta bort lärdom ${idx + 1}`}
              >
                <Trash2 className="size-6 shrink-0" aria-hidden />
              </button>
            </div>
          );
        })}
      </RepeaterPanel>
    </div>
  );
}
