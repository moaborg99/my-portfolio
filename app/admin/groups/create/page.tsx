import { CreateTechStackGroupForm } from "@/components/admin/CreateTechStackGroupForm";
import { NavLink } from "@/components/ui/NavLink";

export default function AdminCreateTechStackGroupPage() {
  return (
    <section className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <NavLink href="/admin" leadingArrow className="text-sm">
          Alla grupper
        </NavLink>
      </div>
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Skapa grupp</h1>
      </header>
      <CreateTechStackGroupForm />
    </section>
  );
}
