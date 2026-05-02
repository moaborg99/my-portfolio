import Link from "next/link";

import { logout } from "@/app/admin/actions";
import { DeleteProjectForm } from "@/components/admin/DeleteProjectForm";
import { buttonClassName } from "@/components/ui/Button";
import { NavLink } from "@/components/ui/NavLink";
import { getProjects } from "@/lib/projects";

export default async function AdminHomePage() {
  const projects = await getProjects();

  return (
    <section className="space-y-8">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="...optional m-0 if you tame default h1 margins">Admin</h1>
          <form action={logout} className="shrink-0">
            <button type="submit" className={buttonClassName("secondary")}>
              Log out
            </button>
          </form>
        </div>
        <p className="mt-2 text-fg-muted">Hantera alla projekt för portfolion.</p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2>Alla projekt</h2>
          <Link
            href="/admin/projects/create"
            className={[buttonClassName("primary"), "inline-block text-sm"]
              .filter(Boolean)
              .join(" ")}
          >
            Skapa projekt
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="mt-2 text-sm text-fg-muted">Inga projekt ännu.</p>
        ) : (
          <ul className="mt-3 divide-y divide-white/10 rounded-lg border border-white/10 bg-navy-light/30">
            {projects.map((project) => (
              <li
                key={project.slug}
                className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 text-sm"
              >
                <div className="min-w-0">
                  <Link
                    href={`/projects/${project.slug}`}
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
      </div>
    </section>
  );
}
