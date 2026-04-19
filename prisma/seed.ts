import { PrismaClient } from "@prisma/client";
import { projects } from "../data/projects";
import { techStackGroups } from "../data/tech-stack";

const prisma = new PrismaClient();

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        details: project.details,
      },
      create: {
        slug: project.slug,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        details: project.details,
      },
    });
  }

  for (const group of techStackGroups) {
    for (let i = 0; i < group.skills.length; i++) {
      const skill = group.skills[i];

      await prisma.technicalSkill.upsert({
        where: { slug: skill.slug },
        create: {
          name: skill.name,
          slug: skill.slug,
          group: group.title,
          sortOrder: i,
        },
        update: {
          name: skill.name,
          group: group.title,
          sortOrder: i,
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
