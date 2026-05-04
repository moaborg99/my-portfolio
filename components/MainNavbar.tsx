"use client";

import Link from "next/link";
import { useState } from "react";
import { HamburgerButton } from "@/components/nav/HamburgerButton";
import { MobileNavPanel } from "@/components/nav/MobileNavPanel";
import { sitePath } from "@/lib/site-paths";

const MOBILE_NAV_MENU_ID = "mobile-nav-menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-[60]">
      <nav className="relative z-50 w-full border-b border-white/10 bg-dark backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4 px-6">
          <div className="flex items-center">
            <Link href={sitePath.home} className="text-lg font-semibold text-fg">
              Moa Borg
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-6 text-base font-medium text-fg-muted-50 md:flex">
              <li>
                <Link href={sitePath.about} className="transition-colors hover:text-turquoise">
                  Om mig
                </Link>
              </li>
              <li>
                <Link href={sitePath.projects} className="transition-colors hover:text-turquoise">
                  Projekt
                </Link>
              </li>
              <li>
                <Link href={sitePath.contact} className="transition-colors hover:text-turquoise">
                  Kontakt
                </Link>
              </li>
            </ul>

            <HamburgerButton
              open={menuOpen}
              onToggle={() => setMenuOpen((o) => !o)}
              menuId={MOBILE_NAV_MENU_ID}
            />
          </div>
        </div>
      </nav>

      <MobileNavPanel id={MOBILE_NAV_MENU_ID} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
