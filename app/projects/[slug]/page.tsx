import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}
export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <section>
      <h1>{project.title}</h1>
      <p className="mb-4 text-fg-muted">{project.description}</p>

      <h2>Technologies</h2>
      <ul className="mb-4 list-inside list-disc">
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <Link href="/projects" className="mt-4 block text-turquoise transition-colors hover:text-fg">
        Back to Projects
      </Link>
    </section>
  );
}
