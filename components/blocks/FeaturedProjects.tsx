import Link from "next/link";

import { buttonClassName } from "@/components/ui/Button";
import { FeaturedProjectsCarousel } from "@/components/featured/FeaturedProjectsCarousel";
import { getProjects } from "@/lib/projects";
import { sitePath } from "@/lib/site-paths";
import { ArrowRight } from "lucide-react";

export async function FeaturedProjects() {
  const projects = await getProjects();
  const featuredProjects = projects.slice(0, 5);

  return (
    <>
      {featuredProjects.length > 0 ? (
        <FeaturedProjectsCarousel projects={featuredProjects} />
      ) : (
        <p className="mt-8 text-fg-muted">Inga projekt tillgängliga ännu.</p>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          href={sitePath.projects}
          className={`${buttonClassName("secondary")} group inline-flex items-center gap-2`}
        >
          Alla projekt
          <ArrowRight
            size={18}
            aria-hidden="true"
            className="transition-transform duration-200 ease-out group-hover:translate-x-1.5"
          />
        </Link>
      </div>
    </>
  );
}
