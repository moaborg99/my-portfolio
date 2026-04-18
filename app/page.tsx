import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <section>
      <h1 className="type-display">Hi, I am Moa Borg</h1>
      <p className="mt-2 max-w-prose text-fg-muted">I am a frontend developer student</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Link href="/about" className="text-turquoise transition-colors hover:text-fg">
          About
        </Link>
        <Link href="/projects" className="text-turquoise transition-colors hover:text-fg">
          Projects
        </Link>
        <Link href="/contact" className="text-turquoise transition-colors hover:text-fg">
          Contact
        </Link>
      </div>
    </section>
  );
}
