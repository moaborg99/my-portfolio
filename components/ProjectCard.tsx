import Link from "next/link";

import type { Project } from "@/types/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h2>
      <p className="mt-2 text-zinc-700 dark:text-zinc-300">{project.description}</p>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
        <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
      </p>
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">{project.details}</p>
    </Link>
  );
}
