import type { ProjectSeed } from "@/types/projects";

/**
 * Seed source for projects. Omit `slug` on a row to auto-derive from `title`
 * in `prisma/seed.ts` (slugify + numeric suffix on duplicates).
 */
export const projects: ProjectSeed[] = [
  {
    slug: "freaky-fashion",
    title: "Freaky Fashion",
    summary: "En fiktiv e-handel för vintage-mode.",
    intro:
      "Ett studentprojekt med fokus på tydlig köpprocess, produktlistning och en sammanhållen visuell stil för ett påhittat varumärke.",
    description:
      "Projektet visar tydlig struktur, återanvändbara komponenter och responsiv layout. Jag itererade navigation, produktgridar och vyer nära checkout med läsbarhet och konsekvent UI över brytpunkter.",
    featuredImage: "/about-cta.jpg",
    githubUrl: null,
    deployUrl: null,
    videoUrl: null,
    images: [
      { src: "/about-cta.jpg", alt: "Förhandsvisning av Freaky Fashion", sortOrder: 0 },
      { src: "/file.svg", alt: "Platshållarbild", sortOrder: 1 },
    ],
    skillSlugs: ["tailwind-css", "react", "better-sqlite"],
  },
  {
    slug: "idea",
    title: "Idead-app",
    summary: "En liten app för att fånga och strukturera idéer.",
    intro:
      "Byggd medan jag lärde mig Laravel-grunder: routing, controllers, validering och persistens med SQLite.",
    description:
      "Appen låter dig skapa, lista och bearbeta idéer med enkla formulär och serverrenderade sidor. Målet var att träna Laravel-konventioner och Tailwind utan att skopa för stort.",
    featuredImage: "/about-cta.jpg",
    githubUrl: null,
    deployUrl: null,
    videoUrl: null,
    images: [{ src: "/about-cta.jpg", alt: "Förhandsvisning av Idead-app", sortOrder: 0 }],
    skillSlugs: ["laravel", "sqlite", "php", "tailwind-css"],
  },
  {
    slug: "releye",
    title: "Releye",
    summary: "Marknadssajt för ett strategi- och IT-konsultföretag.",
    intro:
      "Releye behövde en sajt som speglade expertis inom CRM, digitalisering och affärsstrategi. Jag levererade projektet självständigt från start till lansering under LIA.",
    description:
      "Bygget kombinerade ett skräddarsytt WordPress-tema med återanvändbara block, Tailwind-layout och lätt interaktivitet. Fokus på varumärkestypografi, case-sektioner och underhållsbara innehållsstrukturer för kundens team.",
    featuredImage: "/about-cta.jpg",
    githubUrl: null,
    deployUrl: null,
    videoUrl: null,
    images: [{ src: "/about-cta.jpg", alt: "Förhandsvisning av Releyes sajt", sortOrder: 0 }],
    skillSlugs: ["wordpress-eget-tema", "alpine-js", "tailwind-css"],
  },
  {
    slug: "sga-conveyor-system",
    title: "SGA Conveyor System",
    summary: "Förnyad webbplats för automation och materialhantering.",
    intro:
      "SGA ville ha en modern sajt med en tydlig röd tråd mellan sidor och i linje med deras industriella varumärke.",
    description:
      "Mer caseinnehåll kommer här: mål, process och resultat. Det tekniska upplägget liknar Releye — skräddarsytt WordPress-tema, återanvändbara block och Tailwind — anpassat till SGAs innehåll och bildspråk.",
    featuredImage: "/about-cta.jpg",
    githubUrl: null,
    deployUrl: null,
    videoUrl: null,
    images: [{ src: "/about-cta.jpg", alt: "Förhandsvisning av SGAs sajt", sortOrder: 0 }],
    skillSlugs: ["wordpress-eget-tema", "alpine-js", "tailwind-css"],
  },
];
