import { Suspense } from "react";
import type { Metadata } from "next";

import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectGridSkeleton } from "@/components/projects/ProjectGridSkeleton";

export const metadata: Metadata = { title: "Projekt" };

export const revalidate = 300;

export default function ProjectsPage() {
  return (
    <section className="container">
      <div className="text-center">
        <h1>Projekt</h1>
        <p className="mx-auto mt-2 text-fg-muted">
          Här delar jag några av mina projekt från studier, LIA och egna initiativ — från
          kundprojekt till moderna webbapplikationer.
        </p>
      </div>

      <Suspense fallback={<ProjectGridSkeleton />}>
        <ProjectGrid />
      </Suspense>
    </section>
  );
}
