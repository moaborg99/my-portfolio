"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-16">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{error.message}</p>
      <button onClick={() => reset()} className="mt-6 rounded-md border px-4 py-2">
        Try again
      </button>
    </section>
  );
}
