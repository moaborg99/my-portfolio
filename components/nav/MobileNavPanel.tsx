"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SocialLinks } from "@/components/social/SocialLinks";
import { sitePath } from "@/lib/site-paths";

type MobileNavPanelProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

const LINKS = [
  { href: sitePath.about, label: "Om mig" },
  { href: sitePath.projects, label: "Projekt" },
  { href: sitePath.contact, label: "Kontakt" },
] as const;

const sectionLabelClass = "text-xs font-semibold uppercase tracking-[0.22em] text-turquoise";

export function MobileNavPanel({ id, open, onClose }: MobileNavPanelProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Mobilmeny"
      hidden={!open}
      className="fixed inset-0 z-40 bg-gradient-to-b from-navy-dark to-navy-light md:hidden"
    >
      <div className="container flex h-full flex-col px-4 pb-10 pt-24 text-left">
        <div className="border-l-2 border-turquoise pl-6">
          <p className={sectionLabelClass}>Navigera</p>

          <ul className="mt-6 divide-y divide-white/15 border-y border-white/15">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  prefetch
                  className="block py-7 text-3xl font-semibold leading-none tracking-tight text-fg transition-colors hover:text-turquoise sm:py-8 sm:text-4xl"
                  onClick={onClose}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <p className={`mt-14 ${sectionLabelClass}`}>Hör av dig</p>
          <SocialLinks
            className="mt-5 flex flex-row flex-wrap items-center gap-8 border-b border-white/15 pb-8"
            iconClassName="h-9 w-9"
            onNavigate={onClose}
          />
        </div>
      </div>
    </div>
  );
}
