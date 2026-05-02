import { CreateProjectForm } from "@/components/admin/CreateProjectForm";
import { NavLink } from "@/components/ui/NavLink";

export default function AdminCreateProjectPage() {
  return (
    <section className="space-y-6">
      <div>
        <NavLink href="/admin" leadingArrow className="text-sm">
          Alla projekt
        </NavLink>
        <h1 className="mt-4 h2">Skapa projekt</h1>
        <p className="mt-1 text-sm text-fg-muted">
          Lägger till ett nytt projekt i databasen. Galleri och tekniker läggs till senare.
        </p>
      </div>
      <CreateProjectForm />
    </section>
  );
}
