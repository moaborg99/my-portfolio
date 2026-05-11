import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getProjectBySlug } from "@/lib/projects";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Projektet hittades inte" };
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

  const usePlaceholderCaseStudy =
    project.techDetails.length === 0 && project.learnings.length === 0;

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
      techDetails={project.techDetails}
      learnings={project.learnings}
      usePlaceholderCaseStudy={usePlaceholderCaseStudy}
      backLabel="Alla projekt"
    />
  );
}
