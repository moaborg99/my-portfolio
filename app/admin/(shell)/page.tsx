import Link from "next/link";

import { buttonClassName } from "@/components/ui/Button";

const cardClassName =
  "flex h-full flex-col justify-between gap-4 rounded-lg border border-white/10 bg-navy-light/30 p-5 transition-colors hover:border-turquoise/40";

const CARDS: { href: string; createHref: string; title: string; description: string; createLabel: string }[] = [
  {
    href: "/admin/projects",
    createHref: "/admin/projects/create",
    title: "Projekt",
    description: "Lägg till, redigera och ta bort projekt i portfolion.",
    createLabel: "Skapa projekt",
  },
  {
    href: "/admin/skills",
    createHref: "/admin/skills/create",
    title: "Tekniker",
    description: "Hantera tekniska färdigheter och deras grupptillhörighet.",
    createLabel: "Skapa teknik",
  },
  {
    href: "/admin/groups",
    createHref: "/admin/groups/create",
    title: "Teknikgrupper",
    description: "Kategorier som dina tekniker sorteras under (t.ex. språk, ramverk).",
    createLabel: "Skapa teknikgrupp",
  },
];

export default function AdminDashboardPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1>Administration</h1>
        <p className="mt-2 text-fg-muted">
          Välj ett område nedan för att hantera innehållet i portfolion.
        </p>
      </div>

      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <li key={card.href} className={cardClassName}>
            <div>
              <Link
                href={card.href}
                className="text-lg font-semibold text-fg transition-colors hover:text-turquoise"
              >
                {card.title}
              </Link>
              <p className="mt-1 text-sm text-fg-muted">{card.description}</p>
            </div>
            <Link
              href={card.createHref}
              className={[buttonClassName("primary"), "self-start text-sm"].join(" ")}
            >
              {card.createLabel}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
