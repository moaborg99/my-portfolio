import { PrismaClient } from "@prisma/client";
import { projects } from "../data/projects";
import { techStackGroups } from "../data/tech-stack";
import { slugify } from "../lib/slugify";

const prisma = new PrismaClient();

function allocateSlugFromTitle(title: string, usedSlugs: Set<string>): string {
  const base = slugify(title);
  let candidate = base;
  let suffix = 2;
  while (usedSlugs.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  usedSlugs.add(candidate);
  return candidate;
}

function resolveProjectSlug(
  project: { slug?: string; title: string },
  usedSlugs: Set<string>
): string {
  if (project.slug !== undefined && project.slug !== "") {
    if (usedSlugs.has(project.slug)) {
      throw new Error(`Seed: duplicate explicit slug "${project.slug}"`);
    }
    usedSlugs.add(project.slug);
    return project.slug;
  }
  return allocateSlugFromTitle(project.title, usedSlugs);
}

async function main() {
  for (const group of techStackGroups) {
    for (const skill of group.skills) {
      await prisma.technicalSkill.upsert({
        where: { slug: skill.slug },
        create: {
          name: skill.name,
          slug: skill.slug,
          group: group.title,
        },
        update: {
          name: skill.name,
          group: group.title,
        },
      });
    }
  }

  const usedProjectSlugs = new Set<string>();

  for (const project of projects) {
    const projectSlug = resolveProjectSlug(project, usedProjectSlugs);

    const savedProject = await prisma.project.upsert({
      where: { slug: projectSlug },
      update: {
        title: project.title,
        summary: project.summary,
        intro: project.intro,
        description: project.description,
        featuredImage: project.featuredImage,
        githubUrl: project.githubUrl,
        deployUrl: project.deployUrl,
        videoUrl: project.videoUrl,
      },
      create: {
        slug: projectSlug,
        title: project.title,
        summary: project.summary,
        intro: project.intro,
        description: project.description,
        featuredImage: project.featuredImage,
        githubUrl: project.githubUrl,
        deployUrl: project.deployUrl,
        videoUrl: project.videoUrl,
      },
    });

    await prisma.projectImage.deleteMany({ where: { projectId: savedProject.id } });
    for (let i = 0; i < project.images.length; i++) {
      const img = project.images[i];
      await prisma.projectImage.create({
        data: {
          projectId: savedProject.id,
          src: img.src,
          alt: img.alt,
          sortOrder: img.sortOrder ?? i,
        },
      });
    }

    await prisma.projectTechnicalSkill.deleteMany({ where: { projectId: savedProject.id } });
    for (let i = 0; i < project.skillSlugs.length; i++) {
      const skillSlug = project.skillSlugs[i];
      const technicalSkill = await prisma.technicalSkill.findUnique({ where: { slug: skillSlug } });
      if (!technicalSkill) {
        console.warn(
          `Seed: no TechnicalSkill for slug "${skillSlug}" (project slug "${projectSlug}")`
        );
        continue;
      }
      await prisma.projectTechnicalSkill.create({
        data: {
          projectId: savedProject.id,
          technicalSkillId: technicalSkill.id,
          displayOrder: i,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
