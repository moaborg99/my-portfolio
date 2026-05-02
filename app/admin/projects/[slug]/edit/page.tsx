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
        <h1 className="mt-4 h2">Redigera projekt</h1>
        <p className="mt-1 text-fg-muted">Redigera projektet {project.title}.</p>
      </div>
      <EditProjectForm project={project} />
    </section>
  );
}
