import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

import { buttonClassName } from "@/components/ui/Button";
import type { FeaturedProjectPreview } from "@/types/projects";
import { sitePath } from "@/lib/site-paths";

export function FeaturedCarouselSkeleton() {
  return (
    <div className="mt-8 mx-auto w-full max-w-6xl" aria-hidden="true">
      <div className="h-[min(420px,70vw)] animate-pulse rounded-xl border border-white/10 bg-navy-light/40" />
    </div>
  );
}

/** Fallback while server loads project summaries; link is real so navigation stays instant. */
export function FeaturedProjectsSkeleton() {
  return (
    <>
      <FeaturedCarouselSkeleton />
      <div className="mt-8 flex justify-center">
        <Link
          href={sitePath.projects}
          prefetch
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

const FeaturedProjectsCarouselLazy = dynamic(
  () =>
    import("@/components/featured/FeaturedProjectsCarousel").then((m) => ({
      default: m.FeaturedProjectsCarousel,
    })),
  { loading: () => <FeaturedCarouselSkeleton /> }
);

type FeaturedProjectsProps = {
  projects: FeaturedProjectPreview[];
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <>
      {projects.length > 0 ? (
        <FeaturedProjectsCarouselLazy projects={projects} />
      ) : (
        <p className="mt-8 text-fg-muted">Inga projekt tillgängliga ännu.</p>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          href={sitePath.projects}
          prefetch
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
