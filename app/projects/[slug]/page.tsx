import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TechPill } from "@/components/tech/TechPill";
import { getProjectBySlug } from "@/lib/projects";

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
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <section>
      <h1 className="text-fg">{project.title}</h1>
      <p className="mt-3 max-w-prose text-fg-muted">{project.intro}</p>

      {project.images.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {project.images.map((img) => (
            <div
              key={`${img.src}-${img.sortOrder}`}
              className="relative aspect-video overflow-hidden rounded-lg bg-navy-dark/40"
            >
              <Image
                src={img.src}
                alt={img.alt || project.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-8 max-w-prose">
        <h2 className="text-fg">About</h2>
        <p className="mt-3 whitespace-pre-line text-pretty leading-relaxed text-fg-muted">
          {project.description}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-fg">Technologies</h2>
        <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
          {project.skills.map((skill) => (
            <li key={skill.name}>
              <TechPill>{skill.name}</TechPill>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-turquoise underline decoration-turquoise/40 underline-offset-2 transition-colors hover:text-fg"
          >
            GitHub
          </a>
        ) : null}
        {project.deployUrl ? (
          <a
            href={project.deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-turquoise underline decoration-turquoise/40 underline-offset-2 transition-colors hover:text-fg"
          >
            Live site
          </a>
        ) : null}
        {project.videoUrl ? (
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-turquoise underline decoration-turquoise/40 underline-offset-2 transition-colors hover:text-fg"
          >
            Video
          </a>
        ) : null}
      </div>

      <Link
        href="/projects"
        className="mt-10 inline-block text-turquoise transition-colors hover:text-fg"
      >
        Back to projects
      </Link>
    </section>
  );
}
