import type { Metadata } from "next";

import { FeaturedProjects } from "@/components/blocks/FeaturedProjects";
import { Hero } from "@/components/blocks/Hero";
import { AboutIntro } from "@/components/blocks/AboutIntro";
import { getGroupedTechStack } from "@/lib/tech-skills";

export const metadata: Metadata = {
  title: "Home",
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
          <h2 className="text-fg">Featured Projects</h2>
          <p className="mx-auto mt-3 max-w-2xl text-fg-muted">Explore our latest creative work</p>
        </div>

        <FeaturedProjects />
      </section>
    </div>
  );
}
