import type { ReactNode } from "react";

const pillClassName =
  "rounded-full border border-white/15 bg-navy-light/30 px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-turquoise/40 hover:bg-navy-light/50";

type TechPillProps = {
  children: ReactNode;
};

export function TechPill({ children }: TechPillProps) {
  return <span className={pillClassName}>{children}</span>;
}
