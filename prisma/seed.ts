import { PrismaClient } from "@prisma/client";
import { projects } from "../data/projects";

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
