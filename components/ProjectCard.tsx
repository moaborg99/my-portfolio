import Image from "next/image";
import Link from "next/link";

import { TechPill } from "@/components/tech/TechPill";
import { getTechPillVariantByGroup } from "@/lib/tech-pill-variant";
import type { Project } from "@/types/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-navy-light shadow-lg shadow-black/25 transition hover:border-turquoise/50"
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.01]"
          sizes="(max-width: 640px) 100vw, 50vw"
        />

        <ul className="absolute right-3 top-3 flex list-none flex-col gap-4 p-0">
          {project.skills.slice(0, 3).map((skill) => (
            <li key={skill.name}>
              <TechPill variant={getTechPillVariantByGroup(skill.group)}>{skill.name}</TechPill>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2 p-4">
        <h2 className="text-2xl font-semibold leading-tight text-fg">{project.title}</h2>
        <p className="line-clamp-2 text-base leading-relaxed text-fg-muted">{project.summary}</p>
      </div>
    </Link>
  );
}
