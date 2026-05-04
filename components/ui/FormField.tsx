import type { ComponentProps, ReactNode } from "react";

export const formSectionCardClassName =
  "rounded-lg border border-white/10 bg-navy-light/20 p-6 sm:p-8";

export const formFieldStackClassName = "space-y-6";

export const formLabelClassName = "block text-sm text-fg-muted mb-2";

export const formHintClassName = "ml-2 text-xs font-normal text-fg-muted/70";

export const formControlClassName =
  "mt-1 w-full rounded-lg border border-white/15 bg-navy-dark/40 px-3 py-2 text-sm text-fg placeholder:text-fg-muted/45 outline-none focus-visible:ring-2 focus-visible:ring-turquoise/30";

export const formTextareaClassName = `${formControlClassName} resize-y`;

export function formFieldErrorMessage(
  errors: Record<string, string[] | undefined> | undefined,
  key: string
): string | undefined {
  return errors?.[key]?.[0];
}

export function FormFieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs text-red-400" role="alert">
      {message}
    </p>
  );
}

export function FormLevelError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-sm text-red-400" role="alert">
      {message}
    </p>
  );
}

type TextFieldProps = Omit<ComponentProps<"input">, "className"> & {
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  className?: string;
};

export function TextField({ label, hint, error, id, className, ...props }: TextFieldProps) {
  const inputId = id ?? props.name;
  return (
    <div>
      <label className={formLabelClassName} htmlFor={inputId}>
        {label}
        {hint != null ? <span className={formHintClassName}>{hint}</span> : null}
      </label>
      <input
        id={inputId}
        className={[formControlClassName, className].filter(Boolean).join(" ")}
        {...props}
      />
      <FormFieldError message={error} />
    </div>
  );
}

type TextAreaFieldProps = Omit<ComponentProps<"textarea">, "className"> & {
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  className?: string;
};

export function TextAreaField({ label, hint, error, id, className, ...props }: TextAreaFieldProps) {
  const areaId = id ?? props.name;
  return (
    <div>
      <label className={formLabelClassName} htmlFor={areaId}>
        {label}
        {hint != null ? <span className={formHintClassName}>{hint}</span> : null}
      </label>
      <textarea
        id={areaId}
        className={[formTextareaClassName, className].filter(Boolean).join(" ")}
        {...props}
      />
      <FormFieldError message={error} />
    </div>
  );
}

type UrlFieldProps = Omit<TextFieldProps, "type">;

export function UrlField(props: UrlFieldProps) {
  return <TextField type="url" {...props} />;
}
