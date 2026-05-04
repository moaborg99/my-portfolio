import Image from "next/image";
import Link from "next/link";

import { TechPill } from "@/components/tech/TechPill";
import type { ProjectSummary } from "@/types/projects";
import { sitePath } from "@/lib/site-paths";

const MAX_SKILLS_ON_CARD = 3;

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  const skills = project.skills;
  const visible = skills.slice(0, MAX_SKILLS_ON_CARD);
  const extraCount = skills.length > MAX_SKILLS_ON_CARD ? skills.length - MAX_SKILLS_ON_CARD : 0;

  return (
    <Link
      href={sitePath.project(project.slug)}
      className="group relative block overflow-hidden rounded-xl border border-white/15 bg-navy-light/50 shadow-lg shadow-black/25 backdrop-blur-sm transition-all duration-300 hover:border-white/28"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/25 to-transparent"
          aria-hidden
        />

        <div className="absolute right-4 top-4 z-10 flex max-w-[60%] flex-wrap justify-end gap-2">
          {visible.map((skill) => (
            <TechPill key={skill.id} onMedia compact>
              {skill.name}
            </TechPill>
          ))}
          {extraCount > 0 ? (
            <span
              className="inline-flex"
              aria-label={`${extraCount} ytterligare ${extraCount === 1 ? "teknik" : "tekniker"}`}
            >
              <TechPill onMedia compact>+{extraCount}</TechPill>
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-2 p-6">
        <h2 className="text-xl font-semibold leading-snug text-fg transition-colors group-hover:text-turquoise">
          {project.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-fg-muted">{project.summary}</p>
      </div>

      <span
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5"
        aria-hidden
      />
    </Link>
  );
}
