import Link from "next/link";

import { DeleteTechnicalSkillForm } from "@/components/admin/DeleteTechnicalSkillForm";
import { buttonClassName } from "@/components/ui/Button";
import { NavLink } from "@/components/ui/NavLink";
import { getAllTechnicalSkills } from "@/lib/tech-skills";

export default async function AdminSkillsListPage() {
  const skills = await getAllTechnicalSkills();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Alla tekniker</h1>
        <Link
          href="/admin/skills/create"
          className={[buttonClassName("primary"), "inline-block text-sm"].join(" ")}
        >
          Skapa teknik
        </Link>
      </div>
      {skills.length === 0 ? (
        <p className="text-sm text-fg-muted">Inga tekniker ännu.</p>
      ) : (
        <ul className="divide-y divide-white/10 rounded-lg border border-white/10 bg-navy-light/30">
          {skills.map((skill) => (
            <li
              key={skill.slug}
              className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 text-sm"
            >
              <div className="min-w-0">
                <p className="font-medium text-fg">{skill.name}</p>
                <p className="text-fg-muted">
                  {skill.group} · /<span className="font-mono text-fg-muted-50">{skill.slug}</span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-6">
                <NavLink
                  href={`/admin/skills/${encodeURIComponent(skill.slug)}/edit`}
                  leadingPencil
                  iconSizeClass="size-6"
                  aria-label={`Redigera ${skill.name}`}
                />
                <DeleteTechnicalSkillForm slug={skill.slug} name={skill.name} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
