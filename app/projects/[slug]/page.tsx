import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/projects/ProjectDetail";
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

  // Set false when seeds/DB populate deploy, GitHub and video URLs.
  const previewStubHeroLinks = true;

  return (
    <ProjectDetail
      title={project.title}
      summary={project.summary}
      intro={project.intro}
      description={project.description}
      featuredImage={project.featuredImage}
      githubUrl={project.githubUrl}
      deployUrl={project.deployUrl}
      videoUrl={project.videoUrl}
      images={project.images}
      skills={project.skills.map((s) => s.name)}
      backLabel="Tillbaka till projekt"
      showStubActionLinks={previewStubHeroLinks}
    />
  );
}
