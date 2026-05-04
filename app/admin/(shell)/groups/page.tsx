import Link from "next/link";

import { DeleteTechStackGroupForm } from "@/components/admin/DeleteTechStackGroupForm";
import { buttonClassName } from "@/components/ui/Button";
import { NavLink } from "@/components/ui/NavLink";
import { getAllTechStackGroups } from "@/lib/tech-skills";

export default async function AdminGroupsListPage() {
  const groups = await getAllTechStackGroups();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Alla teknikgrupper</h1>
        <Link
          href="/admin/groups/create"
          className={[buttonClassName("primary"), "inline-block text-sm"].join(" ")}
        >
          Skapa teknikgrupp
        </Link>
      </div>
      {groups.length === 0 ? (
        <p className="text-sm text-fg-muted">Inga teknikgrupper ännu.</p>
      ) : (
        <ul className="divide-y divide-white/10 rounded-lg border border-white/10 bg-navy-light/30">
          {groups.map((group) => (
            <li
              key={group.slug}
              className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 text-sm"
            >
              <div className="min-w-0">
                <p className="font-medium text-fg">{group.name}</p>
                <p className="text-fg-muted">
                  /<span className="font-mono text-fg-muted-50">{group.slug}</span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-6">
                <NavLink
                  href={`/admin/groups/${encodeURIComponent(group.slug)}/edit`}
                  leadingPencil
                  iconSizeClass="size-6"
                  aria-label={`Redigera ${group.name}`}
                />
                <DeleteTechStackGroupForm slug={group.slug} name={group.name} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
