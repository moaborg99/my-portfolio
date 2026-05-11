"use client";

import { useRef, useState } from "react";

import { ProjectFormGallerySection } from "@/components/admin/ProjectFormGallerySection";
import type { ProjectFormFieldErrors } from "@/components/admin/ProjectFormTypes";
import { buttonClassName } from "@/components/ui/Button";
import {
  FormFieldError,
  formFieldErrorMessage,
  formFieldStackClassName,
  formHintClassName,
  formLabelClassName,
  formSectionCardClassName,
  UrlField,
} from "@/components/ui/FormField";
import type { Project } from "@/types/projects";

const FEATURED_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

const filePickStatusClassName = "min-w-0 max-w-full truncate text-sm text-fg-muted sm:max-w-md";

function FeaturedImageField({
  fieldErrors,
  hint,
  buttonLabel,
  emptyFileLabel,
  ariaLabel,
  required,
}: {
  fieldErrors?: ProjectFormFieldErrors;
  hint: string;
  buttonLabel: string;
  emptyFileLabel: string;
  ariaLabel: string;
  required?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div>
      <div className={formLabelClassName}>
        Utvald bild
        <span className={formHintClassName}>{hint}</span>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={buttonClassName("secondary")}
          onClick={() => ref.current?.click()}
        >
          {buttonLabel}
        </button>
        <span className={filePickStatusClassName} title={fileName ?? undefined}>
          {fileName ?? emptyFileLabel}
        </span>
      </div>
      <input
        ref={ref}
        id="featuredImageFile"
        name="featuredImageFile"
        type="file"
        accept={FEATURED_IMAGE_ACCEPT}
        className="sr-only"
        tabIndex={-1}
        aria-label={ariaLabel}
        required={required}
        onChange={(e) => {
          const f = e.target.files?.[0];
          setFileName(f?.name ?? null);
        }}
      />
      <FormFieldError message={formFieldErrorMessage(fieldErrors, "featuredImageFile")} />
    </div>
  );
}

type UrlSlice = Pick<Project, "githubUrl" | "deployUrl" | "videoUrl">;

type ProjectFormMediaSectionProps = {
  fieldErrors?: ProjectFormFieldErrors;
} & (
  | { mode: "create" }
  | { mode: "edit"; urls: UrlSlice; galleryImages: Pick<Project, "images">["images"] }
);

export function ProjectFormMediaSection(props: ProjectFormMediaSectionProps) {
  const err = props.fieldErrors;
  const urls = props.mode === "edit" ? props.urls : null;

  return (
    <>
      <div className={formSectionCardClassName}>
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-fg sm:mb-4">
          Media &amp; länkar
        </h2>

        <div className={formFieldStackClassName}>
          {props.mode === "create" ? (
            <FeaturedImageField
              fieldErrors={err}
              hint="(JPEG, PNG, WebP eller GIF, max 5 MB)"
              buttonLabel="Välj bild…"
              emptyFileLabel="Ingen fil vald"
              ariaLabel="Välj utvald bild"
              required
            />
          ) : (
            <FeaturedImageField
              fieldErrors={err}
              hint="(lämna tom för att behålla nuvarande)"
              buttonLabel="Välj ny bild…"
              emptyFileLabel="Ingen ny fil vald — nuvarande bild behålls"
              ariaLabel="Välj ny utvald bild"
            />
          )}

          <UrlField
            label="GitHub"
            hint="(valfritt)"
            name="githubUrl"
            placeholder="https://github.com/…"
            {...(urls ? { defaultValue: urls.githubUrl ?? "" } : {})}
            error={formFieldErrorMessage(err, "githubUrl")}
          />

          <UrlField
            label="Live / demo"
            hint="(valfritt)"
            name="deployUrl"
            placeholder="https://…"
            {...(urls ? { defaultValue: urls.deployUrl ?? "" } : {})}
            error={formFieldErrorMessage(err, "deployUrl")}
          />

          <UrlField
            label="Video"
            hint="(valfritt)"
            name="videoUrl"
            placeholder="https://…"
            {...(urls ? { defaultValue: urls.videoUrl ?? "" } : {})}
            error={formFieldErrorMessage(err, "videoUrl")}
          />
        </div>
      </div>

      {props.mode === "create" ? (
        <ProjectFormGallerySection mode="create" fieldErrors={err} />
      ) : (
        <ProjectFormGallerySection
          mode="edit"
          fieldErrors={err}
          existingImages={props.galleryImages}
        />
      )}
    </>
  );
}
