import type { ReactNode } from "react";

type TechPillProps = {
  children: ReactNode;
  onMedia?: boolean;
  compact?: boolean;
};

export function TechPill({ children, onMedia, compact }: TechPillProps) {
  const parts = ["tech-pill"];
  if (onMedia) parts.push("tech-pill-on-media");
  if (compact) parts.push("tech-pill-compact");
  return <span className={parts.join(" ")}>{children}</span>;
}
