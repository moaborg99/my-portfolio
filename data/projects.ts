import type { ProjectSeed } from "@/types/projects";

/**
 * Seed source for projects. Omit `slug` on a row to auto-derive from `title`
 * in `prisma/seed.ts` (slugify + numeric suffix on duplicates).
 */
export const projects: ProjectSeed[] = [
  {
    slug: "freaky-fashion",
    title: "Freaky Fashion",
    summary: "A fictional e-commerce site for vintage fashion.",
    intro:
      "A student project focused on a clear shopping flow, product listing, and a cohesive visual style for a fictional vintage brand.",
    description:
      "This project showcases structure, reusable components, and responsive layout. I iterated on navigation, product grids, and checkout-adjacent views while keeping the UI readable and consistent across breakpoints.",
    featuredImage: "/about-cta.jpg",
    githubUrl: null,
    deployUrl: null,
    videoUrl: null,
    images: [
      { src: "/about-cta.jpg", alt: "Freaky Fashion preview", sortOrder: 0 },
      { src: "/file.svg", alt: "Placeholder graphic", sortOrder: 1 },
    ],
    skillSlugs: ["tailwind-css", "react", "better-sqlite"],
  },
  {
    slug: "idea",
    title: "Idea application",
    summary: "A small app for capturing and organizing ideas.",
    intro:
      "Built while learning Laravel fundamentals: routing, controllers, validation, and persistence with SQLite.",
    description:
      "The app lets you create, list, and refine ideas with simple forms and server-rendered pages. The goal was to practice Laravel conventions and Tailwind-based styling without over-scoping features.",
    featuredImage: "/about-cta.jpg",
    githubUrl: null,
    deployUrl: null,
    videoUrl: null,
    images: [{ src: "/about-cta.jpg", alt: "Idea application preview", sortOrder: 0 }],
    skillSlugs: ["laravel", "sqlite", "php", "tailwind-css"],
  },
  {
    slug: "releye",
    title: "Releye",
    summary: "Marketing site for a strategy and IT consulting company.",
    intro:
      "Releye needed a site that reflected their expertise in CRM, digitalization, and business strategy. I shipped the project independently from start to launch during my LIA.",
    description:
      "The build combined a custom WordPress theme with reusable blocks, Tailwind-driven layout, and light interactivity. Emphasis on brand-aligned typography, case-oriented sections, and maintainable content structures for the client team.",
    featuredImage: "/about-cta.jpg",
    githubUrl: null,
    deployUrl: null,
    videoUrl: null,
    images: [{ src: "/about-cta.jpg", alt: "Releye site preview", sortOrder: 0 }],
    skillSlugs: ["wordpress-eget-tema", "alpine-js", "tailwind-css"],
  },
  {
    slug: "sga-conveyor-system",
    title: "SGA Conveyor System",
    summary: "Site refresh for automation and materials-handling solutions.",
    intro:
      "SGA wanted a modern site with a consistent visual thread across pages and alignment with their industrial branding.",
    description:
      "More case study content will go here: goals, process, and outcomes. The technical approach mirrors the Releye build—custom WordPress theme, reusable blocks, and Tailwind for layout—adapted to SGA’s content and imagery.",
    featuredImage: "/about-cta.jpg",
    githubUrl: null,
    deployUrl: null,
    videoUrl: null,
    images: [{ src: "/about-cta.jpg", alt: "SGA site preview", sortOrder: 0 }],
    skillSlugs: ["wordpress-eget-tema", "alpine-js", "tailwind-css"],
  },
];
