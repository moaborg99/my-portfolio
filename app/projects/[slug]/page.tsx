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
      <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
      <p className="text-zinc-700 dark:text-zinc-300 mb-4">{project.description}</p>

      <h2 className="text-lg font-bold mb-2">Technologies</h2>
      <ul className="list-disc list-inside mb-4">
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <Link href="/projects" className="text-blue-600 dark:text-blue-400 mt-4 block">
        Back to Projects
      </Link>
    </section>
  );
}
