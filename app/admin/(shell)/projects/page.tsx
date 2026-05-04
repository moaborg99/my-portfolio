import Link from "next/link";

import { DeleteProjectForm } from "@/components/admin/DeleteProjectForm";
import { buttonClassName } from "@/components/ui/Button";
import { NavLink } from "@/components/ui/NavLink";
import { getProjects } from "@/lib/projects";
import { sitePath } from "@/lib/site-paths";

export default async function AdminProjectsListPage() {
  const projects = await getProjects();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Alla projekt</h1>
        <Link
          href="/admin/projects/create"
          className={[buttonClassName("primary"), "inline-block text-sm"].join(" ")}
        >
          Skapa projekt
        </Link>
      </div>
      {projects.length === 0 ? (
        <p className="text-sm text-fg-muted">Inga projekt ännu.</p>
      ) : (
        <ul className="divide-y divide-white/10 rounded-lg border border-white/10 bg-navy-light/30">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 text-sm"
            >
              <div className="min-w-0">
                <Link
                  href={sitePath.project(project.slug)}
                  className="font-medium text-fg transition-colors hover:text-turquoise"
                >
                  {project.title}
                </Link>
                <p className="text-fg-muted">
                  /<span className="font-mono text-fg-muted-50">{project.slug}</span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-6">
                <NavLink
                  href={`/admin/projects/${project.slug}/edit`}
                  leadingPencil
                  iconSizeClass="size-6"
                  aria-label={`Edit ${project.title}`}
                />
                <DeleteProjectForm slug={project.slug} title={project.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
