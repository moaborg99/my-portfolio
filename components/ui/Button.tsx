import type { ComponentProps } from "react";

/** Global class names — styles live in `app/theme.css` (`@layer components`). */
const variantClassName = {
  primary: "btn-primary",
  secondary: "btn-secondary",
} as const;

export type ButtonVariant = keyof typeof variantClassName;

/** Use on `<Link>` or `<a>` so they match button styling. */
export function buttonClassName(variant: ButtonVariant = "primary") {
  return variantClassName[variant];
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={[variantClassName[variant], className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
