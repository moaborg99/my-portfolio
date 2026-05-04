"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/admin", label: "Översikt" },
  { href: "/admin/projects", label: "Projekt" },
  { href: "/admin/skills", label: "Tekniker" },
  { href: "/admin/groups", label: "Teknikgrupper" },
];

const linkClassName =
  "rounded-md px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-white/5 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/30";

const linkActiveClassName = "bg-white/10 text-fg";

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type AdminNavProps = {
  /** Trailing slot, typically the logout form. */
  trailing?: ReactNode;
};

export function AdminNav({ trailing }: AdminNavProps) {
  const pathname = usePathname() ?? "";

  return (
    <nav
      aria-label="Administration"
      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-navy-light/30 px-3 py-2"
    >
      <ul className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[linkClassName, active ? linkActiveClassName : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </nav>
  );
}
