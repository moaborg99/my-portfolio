import { notFound } from "next/navigation";

import { EditProjectForm } from "@/components/admin/EditProjectForm";
import { NavLink } from "@/components/ui/NavLink";
import { getProjectBySlug } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminEditProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <section className="space-y-6">
      <div>
        <NavLink href="/admin" leadingArrow className="text-sm">
          Alla projekt
        </NavLink>
      </div>
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Redigera projekt</h1>
        <p className="mt-1 text-sm text-fg-muted">{project.title}</p>
      </header>
      <EditProjectForm project={project} />
    </section>
  );
}
