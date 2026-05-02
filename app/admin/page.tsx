import Link from "next/link";

import { logout } from "@/app/admin/actions";
import { getProjects } from "@/lib/projects";

export default async function AdminHomePage() {
  const projects = await getProjects();

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Admin</h1>
        <p className="mt-2 text-fg-muted">Projects synced from the database.</p>
        <form action={logout} className="mt-4">
          <button type="submit" className="rounded bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
            Log out
          </button>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-fg">All projects</h2>
          <Link
            href="/admin/projects/create"
            className="rounded bg-turquoise px-3 py-1.5 text-sm font-medium text-navy-dark hover:opacity-90"
          >
            Create project
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="mt-2 text-sm text-fg-muted">No projects yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-white/10 rounded-lg border border-white/10 bg-navy-light/30">
            {projects.map((project) => (
              <li
                key={project.slug}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-fg">{project.title}</p>
                  <p className="text-fg-muted">
                    /<span className="font-mono text-fg-muted-50">{project.slug}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-turquoise hover:underline"
                  >
                    View site
                  </Link>
                  <Link
                    href={`/admin/projects/${project.slug}/edit`}
                    className="text-turquoise hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
