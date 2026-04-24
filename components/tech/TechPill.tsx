import type { ReactNode } from "react";

export type TechPillVariant =
  | "default"
  | "frontend"
  | "backend"
  | "database"
  | "design"
  | "cms"
  | "tools";

const baseClassName = "rounded-full border px-4 py-2 text-sm font-medium transition-colors";

const variantClassName: Record<TechPillVariant, string> = {
  default:
    "border-white/15 bg-navy-light/80 text-fg hover:border-turquoise/40 hover:bg-navy-light/50",
  frontend:
    "border-blue-300/40 bg-blue-500/80 text-blue-100 hover:border-blue-200/70 hover:bg-blue-500/40",
  backend:
    "border-emerald-300/40 bg-emerald-500/80 text-emerald-100 hover:border-emerald-200/70 hover:bg-emerald-500/40",
  database:
    "border-cyan-300/40 bg-cyan-500/80 text-cyan-100 hover:border-cyan-200/70 hover:bg-cyan-500/40",
  design:
    "border-fuchsia-300/40 bg-fuchsia-500/80 text-fuchsia-100 hover:border-fuchsia-200/70 hover:bg-fuchsia-500/40",
  cms: "border-amber-300/40 bg-amber-500/80 text-amber-100 hover:border-amber-200/70 hover:bg-amber-500/40",
  tools:
    "border-violet-300/40 bg-violet-500/80 text-violet-100 hover:border-violet-200/70 hover:bg-violet-500/40",
};

type TechPillProps = {
  children: ReactNode;
  variant?: TechPillVariant;
};

export function TechPill({ children, variant = "default" }: TechPillProps) {
  return <span className={`${baseClassName} ${variantClassName[variant]}`}>{children}</span>;
}
