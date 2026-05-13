import Image from "next/image";
import Link from "next/link";
import { MailIcon } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

import { buttonClassName } from "@/components/ui/Button";
import { TextColumnGrid } from "@/components/blocks/TextColumnGrid";
import { FeaturedProjects, FeaturedProjectsSkeleton } from "@/components/blocks/FeaturedProjects";
import { getGroupedTechStack } from "@/lib/tech-skills";
import { PUBLIC_FEATURED_PROJECT_LIMIT, getFeaturedProjectPreviews } from "@/lib/projects";
import { TechStack } from "@/components/tech/TechStack";
import { TechStackSkeleton } from "@/components/tech/TechStackSkeleton";
import { sitePath } from "@/lib/site-paths";

export const metadata: Metadata = { title: "Om mig" };

export const revalidate = 300;

const HERO_SIDE_LABEL = "Fullstack · Modern webbutveckling";

const ABOUT_INTRO_COLUMNS = [
  {
    title: "Bakgrund",
    body: "Innan jag började med webbutveckling utbildade jag mig inom inredning har arbetat flera år inom industri och service. Det har gett mig erfarenhet av teamwork, kundkontakt och att arbeta strukturerat även i högt tempo — något jag har stor nytta av idag som utvecklare.",
  },
  {
    title: "Utbildning",
    body: "Under min utbildning hos EC Utbildning har jag arbetat brett inom både frontend och backend genom projekt, LIA och egna initiativ. Jag tycker om att kombinera design och funktion och har fått erfarenhet av hela utvecklingsprocessen — från idé och mockups till implementation, support och vidareutveckling i befintliga kodbaser.",
  },
  {
    title: "Vem är jag",
    body: "Jag gillar att kombinera kreativitet med struktur och trivs bäst när jag får arbeta både praktiskt och problemlösande. Oavsett om det handlar om webbutveckling, renovering eller design drivs jag av nyfikenhet och viljan att hela tiden utvecklas. Jag tror också på prestigelösa team där man delar kunskap och utvecklas tillsammans.",
  },
] as const;

async function AboutFeaturedProjectsBlock() {
  const previews = await getFeaturedProjectPreviews(PUBLIC_FEATURED_PROJECT_LIMIT);
  return <FeaturedProjects projects={previews} />;
}

async function AboutTechStackColumn() {
  const techStackGroups = await getGroupedTechStack();
  return <TechStack groups={techStackGroups} />;
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16">
      <section
        aria-labelledby="about-hero-heading"
        className="border-b border-white/10 bg-navy-dark pb-12 text-fg md:pb-16"
      >
        <div className="container">
          <div className="grid min-h-[28rem] grid-cols-1 gap-8 md:min-h-[min(70vh,40rem)] md:grid-cols-2 md:items-stretch md:gap-10">
            <div className="flex flex-col items-start justify-center gap-6 pt-2 md:pt-0">
              <h1 id="about-hero-heading" className="type-display text-fg">
                Modern webbutveckling
              </h1>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg">
                Jag heter Moa och är en fullstackutvecklare med intresse för design,
                användarupplevelse och modern webbutveckling. Med bakgrund inom inredning drivs jag
                av att skapa genomtänkta lösningar för webben där teknik möter design.
              </p>
              <Link
                href={sitePath.contact}
                prefetch
                className={`${buttonClassName("secondary")} inline-flex w-full items-center justify-center gap-2 md:w-auto md:self-start`}
              >
                Kontakta mig
                <MailIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex min-h-[18rem] flex-row md:min-h-0">
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
              <div className="relative min-h-[18rem] min-w-0 flex-1 overflow-hidden rounded-3xl border border-white/10 bg-navy-light/30 md:min-h-0">
                <Image
                  src="/about-cta.jpg"
                  alt="Porträtt av Moa Borg"
                  fill
                  priority
                  fetchPriority="high"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-body-heading">
        <div className="container">
          <h2 id="about-body-heading" className="text-fg">
            Om mig
          </h2>
          <TextColumnGrid columns={[...ABOUT_INTRO_COLUMNS]} />
        </div>
      </section>

      <section
        aria-labelledby="about-featured-projects-heading"
        className="border-t border-white/10 pt-12"
      >
        <div className="container">
          <div className="mb-10 text-center">
            <h2 id="about-featured-projects-heading" className="text-fg">
              Utvalda projekt
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-fg-muted">
              Kika in några av projekten jag byggt inom frontend, fullstack och modern
              webbutveckling — inklusive kundprojekt jag drivit från mockup till lanserad site.
            </p>
          </div>
          <Suspense fallback={<FeaturedProjectsSkeleton />}>
            <AboutFeaturedProjectsBlock />
          </Suspense>
        </div>
      </section>

      <section aria-label="LIA och teknik" className="border-t border-white/10 pt-12">
        <div className="container">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
            <div className="min-w-0 lg:w-1/2">
              <h2 id="about-lia-heading" className="text-fg">
                LIA
              </h2>
              <p className="mt-3 max-w-prose text-fg-muted">
                Under min LIA på Adgrowth, en B2B-byrå inom digital marknadsföring där
                webbutveckling är en del av erbjudandet, arbetade jag brett med både support,
                vidareutveckling och egna kundprojekt. Företaget har traditionellt byggt
                WordPress-sidor med eget tema, men befinner sig samtidigt i en omställning mot
                modernare lösningar med fokus på deras egen försäljningsplattform i Laravel och
                Livewire.
                <br />
                <br /> I det mindre utvecklingsteamet fick jag snabbt ta stort eget ansvar och drev
                flera kundprojekt självständigt — från mockup och implementation till färdig
                lanserad webbplats. Utöver det arbetade jag löpande med felsökning, support, domän-
                och DNS-frågor samt vidareutveckling av befintliga webbplatser. Jag har även fått
                möjlighet att arbeta med egna projekt i Laravel, Livewire, Inertia, React och Vue
                som en del av företagets nya tekniska riktning.
              </p>

              <h2 id="about-tech-intro-heading" className="text-fg">
                Teknik och kunskaper
              </h2>
              <p className="mt-3 max-w-prose text-fg-muted">
                Genom utbildning, LIA och egna projekt har jag fått arbeta med många olika tekniker,
                ramverk och arbetssätt inom både frontend, backend och fullstackutveckling. Jag
                tycker om att utforska nya verktyg och ser det som en styrka att snabbt kunna sätta
                mig in i nya tekniker och förstå olika typer av kodbaser. <br /> <br /> I en bransch
                som förändras snabbt drivs jag av att fortsätta utvecklas och hitta smartare sätt
                att bygga moderna och användarvänliga lösningar. Jag är flexibel i hur jag vill
                fortsätta utvecklas framåt och öppen för att både fördjupa mig inom tekniker jag
                redan arbetat med eller ta mig an helt nya ramverk och arbetssätt.
              </p>
            </div>

            <div className="min-w-0 lg:w-1/2">
              <div className="lg:mt-4">
                <Suspense fallback={<TechStackSkeleton />}>
                  <AboutTechStackColumn />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-cta-heading"
        className="border-t border-white/10 bg-navy-dark py-12 text-fg md:py-16"
      >
        <div className="container">
          <div className="grid min-h-[28rem] grid-cols-1 gap-8 md:min-h-[min(70vh,40rem)] md:grid-cols-2 md:items-stretch md:gap-10">
            <div className="flex min-h-[18rem] flex-row md:min-h-0">
              <div className="relative min-h-[18rem] min-w-0 flex-1 overflow-hidden rounded-3xl border border-white/10 bg-navy-light/30 md:min-h-0">
                <Image
                  src="/social-portrait.jpg"
                  alt="Moa Borg vid en diskussion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div
                className="flex shrink-0 items-end justify-center border-r border-white/10 bg-navy-dark px-3 py-10 md:px-4"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 pb-2 md:pb-0">
              <h2 id="about-cta-heading" className="text-fg">
                Hör av dig
              </h2>
              <p className="max-w-xl text-pretty text-fg-muted">
                Jag söker nu min första roll som utvecklare efter examen och är öppen för
                möjligheter inom frontend, fullstack och UX/UI. Söker ert team en nyfiken och
                kreativ problemlösare? Jag ser fram emot att höra från er.
              </p>
              <Link
                href={sitePath.contact}
                prefetch
                className={`${buttonClassName("secondary")} inline-flex w-full items-center justify-center gap-2 md:w-auto md:self-start`}
              >
                Kontakta mig
                <MailIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
