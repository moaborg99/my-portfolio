export function TechStackSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Läser in teknik">
      {[0, 1, 2].map((group) => (
        <div key={group}>
          <div className="mb-3 h-5 w-32 animate-pulse rounded bg-white/10" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((pill) => (
              <div
                key={`${group}-${pill}`}
                className="h-8 w-[4.5rem] animate-pulse rounded-full bg-white/10 md:w-24"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
