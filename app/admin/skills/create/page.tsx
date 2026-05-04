import { CreateTechnicalSkillForm } from "@/components/admin/CreateTechnicalSkillForm";
import { NavLink } from "@/components/ui/NavLink";
import { getAllTechStackGroups } from "@/lib/tech-skills";

export default async function AdminCreateTechnicalSkillPage() {
  const groups = await getAllTechStackGroups();

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <NavLink href="/admin" leadingArrow className="text-sm">
          Alla tekniker
        </NavLink>
      </div>
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Skapa teknik</h1>
      </header>
      <CreateTechnicalSkillForm groups={groups} />
    </section>
  );
}
