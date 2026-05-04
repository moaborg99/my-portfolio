import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Projekt" };

export default async function Projects() {
  const projects = await getProjects();
  return (
    <section>
      <div className="text-center">
        <h1>Projekt</h1>
        <p className="mt-2 mx-auto text-fg-muted">Innehåll kommer att läggas till här</p>
      </div>

      <div className="mt-8 grid gap-5 lg:gap-6 xl:gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
