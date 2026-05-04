const PLACEHOLDER_COUNT = 6;

export function ProjectGridSkeleton() {
  return (
    <div
      className="mt-8 grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3 xl:gap-8"
      aria-busy="true"
      aria-label="Läser in projekt"
    >
      {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-white/10 bg-navy-light/30 shadow-lg shadow-black/20"
        >
          <div className="relative aspect-[16/10] animate-pulse bg-navy-light/50" />
          <div className="space-y-3 p-6">
            <div className="h-6 w-3/5 animate-pulse rounded bg-white/10" />
            <div className="h-3 w-full animate-pulse rounded bg-white/10" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
