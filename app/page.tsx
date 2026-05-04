import { Suspense } from "react";
import type { Metadata } from "next";

import {
  FeaturedProjects,
  FeaturedProjectsSkeleton,
} from "@/components/blocks/FeaturedProjects";
import { Hero } from "@/components/blocks/Hero";
import { AboutIntro, AboutIntroSkeleton } from "@/components/blocks/AboutIntro";
import { getGroupedTechStack } from "@/lib/tech-skills";
import {
  PUBLIC_FEATURED_PROJECT_LIMIT,
  getFeaturedProjectPreviews,
} from "@/lib/projects";

export const metadata: Metadata = {
  title: "Start",
};

/** Public marketing pages: balance freshness vs repeat-visit CDN cache (admin uses revalidatePath too). */
export const revalidate = 300;

const HOME_TECH_SKILLS_PREVIEW = 6;

async function HomeAboutIntroBlock() {
  const techStackGroups = await getGroupedTechStack();
  const allTechSkills = techStackGroups.flatMap((group) => group.skills);
  const previewTechSkills = allTechSkills.slice(0, HOME_TECH_SKILLS_PREVIEW);

  return (
    <AboutIntro
      portraitImagePriority
      techSkills={previewTechSkills}
      techSkillsTotal={allTechSkills.length}
    />
  );
}

async function HomeFeaturedBlock() {
  const previews = await getFeaturedProjectPreviews(PUBLIC_FEATURED_PROJECT_LIMIT);
  return <FeaturedProjects projects={previews} />;
}

export default function HomePage() {
  return (
    <div className="bg-navy-dark">
      <Hero />

      <Suspense fallback={<AboutIntroSkeleton />}>
        <HomeAboutIntroBlock />
      </Suspense>

      <section id="projects-section" className="container py-16">
        <div className="mb-10 text-center">
          <h2 className="text-fg">Utvalda projekt</h2>
          <p className="mx-auto mt-3 max-w-2xl text-fg-muted">
            Kika in i några av de senaste projekten
          </p>
        </div>

        <Suspense fallback={<FeaturedProjectsSkeleton />}>
          <HomeFeaturedBlock />
        </Suspense>
      </section>
    </div>
  );
}
