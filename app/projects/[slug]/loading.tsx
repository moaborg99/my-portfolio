export default function ProjectDetailLoading() {
  return (
    <article className="container space-y-8 py-4 pb-20" aria-busy="true" aria-label="Läser in projekt">
      <div className="h-4 w-52 max-w-full animate-pulse rounded bg-white/10" />
      <div className="relative aspect-[21/10] w-full animate-pulse rounded-xl border border-white/10 bg-navy-light/40" />
      <div className="space-y-3">
        <div className="h-10 max-w-md animate-pulse rounded bg-white/10" />
        <div className="h-4 max-w-2xl animate-pulse rounded bg-white/10" />
        <div className="h-4 max-w-xl animate-pulse rounded bg-white/10" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-32 animate-pulse rounded-xl border border-white/10 bg-navy-light/30" />
        <div className="h-32 animate-pulse rounded-xl border border-white/10 bg-navy-light/30" />
      </div>
    </article>
  );
}
