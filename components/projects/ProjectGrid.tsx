import ProjectCard from "@/components/ProjectCard";
import { getProjectSummaries } from "@/lib/projects";

export async function ProjectGrid() {
  const projects = await getProjectSummaries();
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3 xl:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
