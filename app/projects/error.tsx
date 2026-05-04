"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-16">
      <h1>Något gick fel</h1>
      <p className="mt-2 text-fg-muted">{error.message}</p>
      <Button type="button" variant="secondary" className="mt-6" onClick={() => reset()}>
        Försök igen
      </Button>
    </section>
  );
}
