"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/Carousel";
import type { Project } from "@/types/projects";
import { sitePath } from "@/lib/site-paths";

type FeaturedProjectsCarouselProps = {
  projects: Project[];
};

export function FeaturedProjectsCarousel({ projects }: FeaturedProjectsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const sync = () => setCurrent(api.selectedScrollSnap());

    queueMicrotask(sync);

    api.on("select", sync);
    return () => {
      api.off("select", sync);
    };
  }, [api]);

  return (
    <div className="mt-8 mx-auto w-full max-w-6xl">
      <Carousel className="w-full" setApi={setApi} opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-6">
          {projects.map((project, index) => (
            <CarouselItem
              key={project.slug}
              className="pl-6 md:basis-1/2 lg:basis-1/3"
              id={`featured-carousel-item-${index}`}
            >
              <article className="overflow-hidden rounded-xl border border-white/10 bg-navy-light shadow-lg shadow-black/25">
                <Link href={sitePath.project(project.slug)} className="group block">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={project.featuredImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 md:group-hover:scale-105"
                      sizes="(max-width: 768px) 90vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/60 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex h-[120px] flex-col">
                        <h3 className="m-0 line-clamp-1 min-h-[28px] text-xl font-semibold tracking-tight text-fg">
                          {project.title}
                        </h3>

                        <p className="m-0 mt-2 line-clamp-2 min-h-[40px] text-sm text-fg-muted transition-all duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                          {project.summary}
                        </p>

                        <div className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-turquoise transition-all duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                          Visa case
                          <ArrowRight className="size-4 transition-transform md:group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div
        className="mt-5 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Navigering för utvalda projekt"
      >
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={[
              "h-2 rounded-full transition-all",
              current === index ? "w-8 bg-turquoise" : "w-2 bg-fg-muted/50 hover:bg-fg-muted",
            ].join(" ")}
            role="tab"
            aria-selected={current === index}
            aria-label={`Gå till ${project.title}`}
            aria-controls={`featured-carousel-item-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
