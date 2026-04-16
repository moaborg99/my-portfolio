import { projects } from "@/data/projects";

export const getProjects = async () => {
  return projects;
};

export const getProjectBySlug = async (slug: string) => {
  return projects.find((project) => project.slug === slug);
};
