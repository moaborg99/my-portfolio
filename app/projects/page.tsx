import { Suspense } from "react";
import type { Metadata } from "next";

import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectGridSkeleton } from "@/components/projects/ProjectGridSkeleton";

export const metadata: Metadata = { title: "Projekt" };

export const revalidate = 300;

export default function ProjectsPage() {
  return (
    <section>
      <div className="text-center">
        <h1>Projekt</h1>
        <p className="mx-auto mt-2 text-fg-muted">Innehåll kommer att läggas till här</p>
      </div>

      <Suspense fallback={<ProjectGridSkeleton />}>
        <ProjectGrid />
      </Suspense>
    </section>
  );
}
