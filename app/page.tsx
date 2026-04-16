import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tigh">Hi, I am Moa Borg</h1>
      <p className="text-zinc-700 dark:text-zinc-300 mt-2">I am a frontend developer student</p>
      <Link href="/about" className="text-blue-600 dark:text-blue-400 mt-4 block">
        About
      </Link>
      <Link href="/projects" className="text-blue-600 dark:text-blue-400 mt-4 block">
        Projects
      </Link>
    </section>
  );
}
