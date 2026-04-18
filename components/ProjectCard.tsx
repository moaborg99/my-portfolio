import Link from "next/link";

import type { Project } from "@/types/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-xl border border-white/10 bg-navy-light/50 p-5 shadow-sm transition hover:border-turquoise/50 hover:bg-navy-light/80 hover:shadow-md hover:shadow-turquoise/10"
    >
      <h2 className="text-lg font-semibold text-fg">{project.title}</h2>
      <p className="mt-2 text-fg-muted">{project.description}</p>
      <p className="mt-3 text-sm text-fg-muted">
        <span className="font-medium text-fg">Technologies:</span> {project.technologies.join(", ")}
      </p>
      <p className="mt-4 text-sm text-fg-muted/90">{project.details}</p>
    </Link>
  );
}
