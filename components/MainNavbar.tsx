import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-dark backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-4xl items-stretch justify-between gap-4 px-6">
        <div className="flex items-center">
          <Link href="/" className="text-lg font-semibold text-fg">
            Moa Borg
          </Link>
        </div>

        <div className="flex items-center">
          <ul className="flex items-center gap-6 text-base font-medium text-fg-muted-50">
            <li>
              <Link href="/about" className="transition-colors hover:text-turquoise">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="transition-colors hover:text-turquoise">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-turquoise">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
