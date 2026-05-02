import Link from "next/link";
import { notFound } from "next/navigation";

import { EditProjectForm } from "@/components/admin/EditProjectForm";
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
        <Link href="/admin" className="text-sm text-turquoise hover:underline">
          ← Back to admin
        </Link>
        <h1 className="mt-4 text-xl font-semibold">Edit project</h1>
        <p className="mt-1 text-fg-muted">{project.title}</p>
      </div>
      <EditProjectForm project={project} />
    </section>
  );
}
