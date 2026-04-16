import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Moa Borg
        </Link>

        <ul className="flex items-center gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <li>
            <Link href="/" className="hover:text-zinc-950 dark:hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-zinc-950 dark:hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-zinc-950 dark:hover:text-white">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-zinc-950 dark:hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
