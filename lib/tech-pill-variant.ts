import type { TechPillVariant } from "@/components/tech/TechPill";

const GROUP_TO_VARIANT: Record<string, TechPillVariant> = {
  Frontend: "frontend",
  Backend: "backend",
  Databaser: "database",
  "UX/UI & design": "design",
  CMS: "cms",
  "Verktyg & metoder": "tools",
};

export function getTechPillVariantByGroup(group: string): TechPillVariant {
  return GROUP_TO_VARIANT[group] ?? "default";
}
