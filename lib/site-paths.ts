/**
 * Visitor-facing URL segments (Swedish). Route files stay under `app/about`, `app/projects`,
 * `app/contact` — mapped via `next.config.ts` rewrites.
 */
export const sitePath = {
  home: "/",
  about: "/om-mig",
  projects: "/projekt",
  contact: "/kontakt",
  project: (slug: string) => `/projekt/${encodeURIComponent(slug)}`,
  /** Anchor on the about page (still under English route file `app/about/page.tsx`). */
  aboutTechSection: "/om-mig#about-lia-heading",
} as const;
