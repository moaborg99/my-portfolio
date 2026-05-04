import type { Metadata } from "next";

import { FeaturedProjects } from "@/components/blocks/FeaturedProjects";
import { Hero } from "@/components/blocks/Hero";
import { AboutIntro } from "@/components/blocks/AboutIntro";
import { getGroupedTechStack } from "@/lib/tech-skills";

export const metadata: Metadata = {
  title: "Start",
};

const HOME_TECH_SKILLS_PREVIEW = 6;

export default async function HomePage() {
  const techStackGroups = await getGroupedTechStack();
  const allTechSkills = techStackGroups.flatMap((group) => group.skills);
  const previewTechSkills = allTechSkills.slice(0, HOME_TECH_SKILLS_PREVIEW);

  return (
    <div className="bg-navy-dark">
      <Hero />

      <AboutIntro techSkills={previewTechSkills} techSkillsTotal={allTechSkills.length} />

      <section id="projects-section" className="container py-16">
        <div className="mb-10 text-center">
          <h2 className="text-fg">Utvalda projekt</h2>
          <p className="mx-auto mt-3 max-w-2xl text-fg-muted">
            Kika in i några av de senaste projekten
          </p>
        </div>

        <FeaturedProjects />
      </section>
    </div>
  );
}
