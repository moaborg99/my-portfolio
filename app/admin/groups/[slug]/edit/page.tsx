import { notFound } from "next/navigation";

import { EditTechStackGroupForm } from "@/components/admin/EditTechStackGroupForm";
import { NavLink } from "@/components/ui/NavLink";
import { getTechStackGroupBySlug } from "@/lib/tech-skills";

type PageProps = { params: Promise<{ slug: string }> };

export default async function AdminEditTechStackGroupPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const group = await getTechStackGroupBySlug(slug);

  if (!group) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <NavLink href="/admin/groups" leadingArrow className="text-sm">
          Alla teknikgrupper
        </NavLink>
      </div>
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Redigera teknikgrupp
        </h1>
        <p className="mt-1 text-sm text-fg-muted">{group.name}</p>
      </header>
      <EditTechStackGroupForm group={group} />
    </section>
  );
}
