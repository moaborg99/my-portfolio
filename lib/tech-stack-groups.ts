export const TECH_STACK_GROUP_ORDER = [
  "Frontend",
  "Backend",
  "Databaser",
  "UX/UI & design",
  "CMS",
  "Verktyg & metoder",
] as const;

export type CanonicalTechStackGroup = (typeof TECH_STACK_GROUP_ORDER)[number];
