import Link from "next/link";
import type { Metadata } from "next";
import { buttonClassName } from "@/components/ui/Button";
import { TextColumnGrid } from "@/components/blocks/TextColumnGrid";
import { getGroupedTechStack } from "@/lib/tech-skills";
import { TechStack } from "@/components/tech/TechStack";
import { FeaturedProjects } from "@/components/blocks/FeaturedProjects";

export const metadata: Metadata = { title: "Om mig" };

/** Vertikal etikett mellan text och bild — ändra strängen om du vill. */
const HERO_SIDE_LABEL = "Kreativ · Utvecklare · Fullstack";

const ABOUT_INTRO_COLUMNS = [
  {
    title: "Bakgrund",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — tempus cursus eget sapien non. Vestibulum vitae lorem ut arcu varius tincidunt. Integer posuere, neque id facilisis aliquet, metus purus fermentum nibh, ut gravida nisl nunc vel risus. Donec pulvinar velit sed orci efficitur, in interdum nulla facilisis. Curabitur at sapien sit amet erat malesuada tincidunt eget quis justo, non gravida justo.",
  },
  {
    title: "Utbildning",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — tempus cursus eget sapien non. Vestibulum vitae lorem ut arcu varius tincidunt. Integer posuere, neque id facilisis aliquet, metus purus fermentum nibh, ut gravida nisl nunc vel risus. Donec pulvinar velit sed orci efficitur, in interdum nulla facilisis. Curabitur at sapien sit amet erat malesuada tincidunt eget quis justo, non gravida justo.",
  },
  {
    title: "Vem är jag",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — tempus cursus eget sapien non. Vestibulum vitae lorem ut arcu varius tincidunt. Integer posuere, neque id facilisis aliquet, metus purus fermentum nibh, ut gravida nisl nunc vel risus. Donec pulvinar velit sed orci efficitur, in interdum nulla facilisis. Curabitur at sapien sit amet erat malesuada tincidunt eget quis justo, non gravida justo.",
  },
] as const;

export default async function AboutPage() {
  const techStackGroups = await getGroupedTechStack();
  return (
    <div className="flex flex-col gap-16">
      <section
        aria-labelledby="about-hero-heading"
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip bg-navy-dark text-fg"
      >
        <div className="grid min-h-[28rem] grid-cols-1 md:min-h-[min(70vh,40rem)] md:grid-cols-[minmax(0,1fr)_44vw]">
          <div className="flex flex-col justify-center gap-6 px-6 py-14 md:px-10 md:py-20 lg:pl-[max(1.5rem,calc((100vw-1320px)/2+1.5rem))]">
            <h1
              id="about-hero-heading"
              className="text-[clamp(2.75rem,6.5vw,4.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-fg"
            >
              Moa Borg
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg">
              Jag är student i frontend, närmar mig examen, och bygger broar mellan design och kod.
              Här berättar jag mer om mig själv, min utbildning och vad jag vill härnäst.
            </p>
            <Link
              href="/contact"
              className={`${buttonClassName("primary")} mt-2 inline-flex w-full justify-center sm:w-fit`}
            >
              Säg hej
            </Link>
          </div>
          <div className="flex min-h-[18rem] flex-row md:min-h-full">
            <div
              className="flex shrink-0 items-end justify-center border-l border-white/10 bg-navy-dark px-3 py-10 md:px-4"
              aria-hidden="true"
            >
              <span
                className="select-none text-[0.65rem] font-semibold uppercase leading-none tracking-[0.35em] text-turquoise md:text-xs"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {HERO_SIDE_LABEL}
              </span>
            </div>
            <div className="relative min-h-[18rem] flex-1 bg-gradient-to-br from-navy-light to-navy-dark md:min-h-0">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
                <span className="text-xs font-medium text-fg-muted/80">Bildyta</span>
                <span className="max-w-[10rem] text-[0.65rem] leading-snug text-fg-muted/60">
                  Lägg bilden här — fyll med next/image, fill, object-cover.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-body-heading" className="border-t border-white/10 pt-12">
        <h2 id="about-body-heading" className="text-fg">
          Om mig
        </h2>
        <TextColumnGrid columns={[...ABOUT_INTRO_COLUMNS]} />
      </section>

      <section
        aria-labelledby="about-featured-projects-heading"
        className="border-t border-white/10 pt-12"
      >
        <div className="mb-10 text-center">
          <h2
            id="about-featured-projects-heading"
            className="text-4xl font-bold tracking-tight text-fg md:text-5xl"
          >
            Utvalda projekt
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-fg-muted md:text-lg">
            Utforka några av projekten jag byggt. De skarpa kundprojekten är projekt jag drivit
            självständigt från mockup till lanserad site.
          </p>
        </div>
        <FeaturedProjects />
      </section>

      <section aria-label="LIA och teknik" className="border-t border-white/10 pt-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
          <div className="min-w-0 lg:w-1/2">
            <h2 id="about-lia-heading" className="text-fg">
              LIA
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-fg-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit — tempus cursus eget sapien
              non. Vestibulum vitae lorem ut arcu varius tincidunt. Integer posuere, neque id
              facilisis aliquet, metus purus fermentum nibh, ut gravida nisl nunc vel risus. Donec
              pulvinar velit sed orci efficitur, in interdum nulla facilisis. Curabitur at sapien
              sit amet erat malesuada tincidunt eget quis justo, non gravida justo. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit — tempus cursus eget sapien non.
              <br />
              <br /> Vestibulum vitae lorem ut arcu varius tincidunt. Integer posuere, neque id
              facilisis aliquet, metus purus fermentum nibh, ut gravida nisl nunc vel risus. Donec
              pulvinar velit sed orci efficitur, in interdum nulla facilisis. Curabitur at sapien
              sit amet erat malesuada tincidunt eget quis justo, non gravida justo.
            </p>

            <h2 id="about-tech-intro-heading" className="text-fg">
              Teknik och kunskaper
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-fg-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit — tempus cursus eget sapien
              non. Vestibulum vitae lorem ut arcu varius tincidunt. Integer posuere, neque id
              facilisis aliquet, metus purus fermentum nibh, ut gravida nisl nunc vel risus. Donec
              pulvinar velit sed orci efficitur, in interdum nulla facilisis. Curabitur at sapien
              sit amet erat malesuada tincidunt eget quis justo, non gravida justo. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit — tempus cursus eget sapien non.
            </p>
          </div>

          <div className="min-w-0 lg:w-1/2">
            <div className="lg:mt-4">
              <TechStack groups={techStackGroups} />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-cta"
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip bg-navy-dark text-fg border-t border-white/10 pt-12"
      >
        <div className="grid min-h-[28rem] grid-cols-1 md:min-h-[min(70vh,40rem)] md:grid-cols-[44vw_minmax(0,1fr)]">
          <div className="flex min-h-[18rem] flex-row md:min-h-full">
            <div className="relative min-h-[18rem] flex-1 bg-gradient-to-br from-navy-light to-navy-dark md:min-h-0">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
                <span className="text-xs font-medium text-fg-muted/80">Bildyta</span>
                <span className="max-w-[10rem] text-[0.65rem] leading-snug text-fg-muted/60">
                  Lägg bilden här — fyll med next/image, fill, object-cover.
                </span>
              </div>
            </div>
            <div
              className="flex shrink-0 items-end justify-center border-r border-white/10 bg-navy-dark px-3 py-10 md:px-4"
              aria-hidden="true"
            ></div>
          </div>
          <div className="flex flex-col justify-center gap-4 px-6 py-14 md:px-10 md:py-10 lg:pr-[max(1.5rem,calc((100vw-1320px)/2+1.5rem))]">
            <h2 id="about-cta-heading" className="text-fg">
              Hör av dig
            </h2>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg">
              Vill du prata om ett projekt, LIA eller bara utbyta idéer? Skicka ett meddelande — jag
              svarar så snart jag kan.
            </p>
            <Link
              href="/contact"
              className={`${buttonClassName("primary")} mt-2 inline-flex w-full justify-center sm:w-fit`}
            >
              Säg hej
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
