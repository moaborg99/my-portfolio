import { notFound } from "next/navigation";

import { EditTechnicalSkillForm } from "@/components/admin/EditTechnicalSkillForm";
import { NavLink } from "@/components/ui/NavLink";
import { getAllTechStackGroups, getTechnicalSkillBySlug } from "@/lib/tech-skills";

type PageProps = { params: Promise<{ slug: string }> };

export default async function AdminEditTechnicalSkillPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const [skill, groups] = await Promise.all([
    getTechnicalSkillBySlug(slug),
    getAllTechStackGroups(),
  ]);

  if (!skill) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <NavLink href="/admin" leadingArrow className="text-sm">
          Alla tekniker
        </NavLink>
      </div>
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Redigera teknik</h1>
        <p className="mt-1 text-sm text-fg-muted">{skill.name}</p>
      </header>
      <EditTechnicalSkillForm skill={skill} groups={groups} />
    </section>
  );
}
