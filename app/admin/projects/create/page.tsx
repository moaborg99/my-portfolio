import { CreateProjectForm } from "@/components/admin/CreateProjectForm";
import { NavLink } from "@/components/ui/NavLink";
import { getAllTechnicalSkills } from "@/lib/tech-skills";

export default async function AdminCreateProjectPage() {
  const skills = await getAllTechnicalSkills();

  return (
    <section className="space-y-6">
      <div>
        <NavLink href="/admin" leadingArrow className="text-sm">
          Alla projekt
        </NavLink>
      </div>
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Skapa nytt projekt
        </h1>
      </header>
      <CreateProjectForm skills={skills} />
    </section>
  );
}
