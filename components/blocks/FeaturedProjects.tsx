import Link from "next/link";

const cardClassName =
  "rounded-xl border border-dashed border-white/20 bg-navy-light/30 p-5 shadow-sm";
const thumbClassName =
  "aspect-video rounded-lg bg-gradient-to-br from-navy-light/80 to-navy-dark/80";

type FeaturedProjectCard = {
  id: string;
  ariaLabel: string;
  title: string;
  description: string;
};

const PLACEHOLDER_CARDS: FeaturedProjectCard[] = [
  {
    id: "1",
    ariaLabel: "Projektplatshållare 1",
    title: "Projektnamn",
    description: "Kort beskrivning och länk till caset läggs in när projektkortet är färdigt.",
  },
  {
    id: "2",
    ariaLabel: "Projektplatshållare 2",
    title: "Projektnamn",
    description: "Kort beskrivning och länk till caset läggs in när projektkortet är färdigt.",
  },
];

export function FeaturedProjects() {
  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PLACEHOLDER_CARDS.map((project) => (
          <article key={project.id} className={cardClassName} aria-label={project.ariaLabel}>
            <div className={thumbClassName} aria-hidden />
            <h3 className="mt-4 text-lg font-semibold text-fg/90">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.description}</p>
          </article>
        ))}
      </div>
      <Link
        href="/projects"
        className="mt-8 inline-flex text-turquoise underline decoration-turquoise/40 underline-offset-2 transition-colors hover:text-fg"
      >
        Alla projekt
      </Link>
    </>
  );
}
