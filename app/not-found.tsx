import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-16">
      <h1 className="text-3xl font-bold">404 - Page not found</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        The page you’re looking for doesn’t exist.
      </p>

      <Link href="/" className="mt-6 inline-block underline">
        Back to homepage
      </Link>
    </section>
  );
}
