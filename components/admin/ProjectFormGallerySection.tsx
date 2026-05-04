"use client";

import { useCallback, useId, useRef, useState } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";

import type { ProjectFormFieldErrors } from "@/components/admin/ProjectFormTypes";
import { buttonClassName } from "@/components/ui/Button";
import {
  FormFieldError,
  formControlClassName,
  formFieldErrorMessage,
  formHintClassName,
  formLabelClassName,
  formSectionCardClassName,
} from "@/components/ui/FormField";
import { MAX_PROJECT_GALLERY_ROWS } from "@/lib/project-gallery-from-form";

/** Matches preview box `w-40` × `h-24` — avoids `fill` + zero-height parent warnings. */
const GALLERY_PREVIEW_WIDTH = 160;
const GALLERY_PREVIEW_HEIGHT = 96;

const GALLERY_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

const repeaterRow =
  "flex items-start gap-5 rounded-lg border border-white/10 bg-navy-dark/25 p-5 sm:gap-7 sm:p-6 md:gap-8";
const trashBtn =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-red-500/15 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/30";

const filePickStatusClassName = "min-w-0 max-w-full truncate text-sm text-fg-muted sm:max-w-md";

function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

type GalleryExisting = { id: number; src: string; alt: string };

type NewRowUi = { uiId: string; kind: "new" };
type ExistingRowUi = {
  uiId: string;
  kind: "existing";
  imageId: number;
  src: string;
  initialAlt: string;
};

type GalleryRowUi = NewRowUi | ExistingRowUi;

function rowsFromExisting(images: GalleryExisting[] | undefined): GalleryRowUi[] {
  return (images ?? []).map((img) => ({
    uiId: newId(),
    kind: "existing",
    imageId: img.id,
    src: img.src,
    initialAlt: img.alt,
  }));
}

function GalleryFilePick({
  name,
  fieldErrors,
  errorKey,
  label,
  hint,
}: {
  name: string;
  fieldErrors?: ProjectFormFieldErrors;
  errorKey: string;
  label: string;
  hint: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div>
      <div className={formLabelClassName}>
        {label}
        <span className={formHintClassName}>{hint}</span>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={buttonClassName("secondary")}
          onClick={() => ref.current?.click()}
        >
          Välj bild…
        </button>
        <span className={filePickStatusClassName} title={fileName ?? undefined}>
          {fileName ?? "Ingen fil vald"}
        </span>
      </div>
      <input
        ref={ref}
        name={name}
        type="file"
        accept={GALLERY_IMAGE_ACCEPT}
        className="sr-only"
        tabIndex={-1}
        aria-label={label}
        onChange={(e) => {
          const f = e.target.files?.[0];
          setFileName(f?.name ?? null);
        }}
      />
      <FormFieldError message={formFieldErrorMessage(fieldErrors, errorKey)} />
    </div>
  );
}

type ProjectFormGallerySectionProps = {
  fieldErrors?: ProjectFormFieldErrors;
} & ({ mode: "create" } | { mode: "edit"; existingImages: GalleryExisting[] });

export function ProjectFormGallerySection(props: ProjectFormGallerySectionProps) {
  const sectionId = useId();
  const titleId = `${sectionId}-gallery-title`;

  const [rows, setRows] = useState<GalleryRowUi[]>(() =>
    props.mode === "edit" ? rowsFromExisting(props.existingImages) : []
  );

  const addRow = useCallback(() => {
    setRows((p) =>
      p.length >= MAX_PROJECT_GALLERY_ROWS ? p : [...p, { uiId: newId(), kind: "new" }]
    );
  }, []);

  const removeRow = useCallback((i: number) => {
    setRows((p) => p.filter((_, j) => j !== i));
  }, []);

  const atCap = rows.length >= MAX_PROJECT_GALLERY_ROWS;
  const err = props.fieldErrors;

  return (
    <section className={formSectionCardClassName} aria-labelledby={titleId}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-4 pb-2">
        <h2 id={titleId} className="text-lg font-semibold tracking-tight text-fg">
          Galleri
        </h2>
        <button
          type="button"
          onClick={addRow}
          disabled={atCap}
          className={[buttonClassName("secondary"), "shrink-0 gap-2", atCap ? "opacity-45" : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <Plus className="size-4 shrink-0" aria-hidden />
          Lägg till bild
        </button>
      </div>
      <p className="text-xs leading-relaxed text-fg-muted">
        Valfritt — max {MAX_PROJECT_GALLERY_ROWS} bilder (JPEG, PNG, WebP eller GIF, max 2 MB per
        galleribild).
      </p>
      <FormFieldError message={formFieldErrorMessage(err, "_galleryRepeater")} />

      {rows.length > 0 ? (
        <div className="mt-4 space-y-4">
          {rows.map((row, idx) => {
            const presentName = `gi_${idx}_present`;
            const fileName = `gi_${idx}_file`;
            const altName = `gi_${idx}_alt`;
            const fileErrKey = fileName;

            return (
              <div key={row.uiId} className={repeaterRow}>
                <div className="min-w-0 flex-1 space-y-4">
                  <input type="hidden" name={presentName} value="1" />

                  {row.kind === "existing" ? (
                    <>
                      <input type="hidden" name={`gi_${idx}_imageId`} value={String(row.imageId)} />
                      <input type="hidden" name={`gi_${idx}_existingSrc`} value={row.src} />
                      <Image
                        src={row.src}
                        alt=""
                        width={GALLERY_PREVIEW_WIDTH}
                        height={GALLERY_PREVIEW_HEIGHT}
                        sizes="160px"
                        className="h-24 w-40 shrink-0 rounded-md border border-white/10 bg-navy-dark/40 object-cover"
                      />
                      <div>
                        <label className={formLabelClassName} htmlFor={altName}>
                          Alt-text
                          <span className={formHintClassName}>(valfritt)</span>
                        </label>
                        <input
                          id={altName}
                          name={altName}
                          key={`${row.uiId}-alt`}
                          defaultValue={row.initialAlt}
                          autoComplete="off"
                          placeholder="Beskriv bilden kort"
                          className={formControlClassName}
                        />
                        <FormFieldError message={formFieldErrorMessage(err, altName)} />
                      </div>
                      <GalleryFilePick
                        name={fileName}
                        fieldErrors={err}
                        errorKey={fileErrKey}
                        label="Byt bild"
                        hint="(lämna tom för att behålla nuvarande)"
                      />
                    </>
                  ) : (
                    <>
                      <GalleryFilePick
                        name={fileName}
                        fieldErrors={err}
                        errorKey={fileErrKey}
                        label="Bildfil"
                        hint="(obligatorisk för denna rad)"
                      />
                      <div>
                        <label className={formLabelClassName} htmlFor={altName}>
                          Alt-text
                          <span className={formHintClassName}>(valfritt)</span>
                        </label>
                        <input
                          id={altName}
                          name={altName}
                          autoComplete="off"
                          placeholder="Beskriv bilden kort"
                          className={formControlClassName}
                        />
                        <FormFieldError message={formFieldErrorMessage(err, altName)} />
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeRow(idx)}
                  className={trashBtn}
                  aria-label={
                    row.kind === "existing"
                      ? `Ta bort galleribild ${idx + 1}`
                      : `Ta bort gallerirad ${idx + 1}`
                  }
                >
                  <Trash2 className="size-6 shrink-0" aria-hidden />
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
