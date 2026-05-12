import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, MapPin } from "lucide-react";
import type { TechStackSkill } from "@/types/tech-stack";

import { TechPill } from "@/components/tech/TechPill";
import { buttonClassName } from "@/components/ui/Button";
import { NavLink } from "@/components/ui/NavLink";
import { BulletList } from "@/components/ui/BulletList";
import { DetailList } from "@/components/ui/DetailList";
import { SECTION_OVERLINE_LABEL } from "@/lib/section-label";
import { sitePath } from "@/lib/site-paths";

const FUN_FACTS = [
  "Renoverar hus på landet genom learning-by-doing",
  "Drivs av nyfikenhet, kreativitet och viljan att fortsätta utvecklas",
  "Trivs bäst i prestigelösa team där man lär sig och utvecklas tillsammans",
  "Djurmänniska med en glad hund på fem år",
] as const;
const EDUCATIONS = [
  { programme: "Frontendutvecklare (Fullstack)", school: "EC-utbildning, Väsjö (Distans)" },
  {
    programme: "Inredare, Inredningsstylis & Homestagingkonsult",
    school: "Inredningskurser, distans",
  },
] as const;

type AboutIntroProps = {
  techSkills: TechStackSkill[];
  techSkillsTotal: number;
  /** When true, eagerly loads the portrait image (e.g. home LCP). */
  portraitImagePriority?: boolean;
};

export function AboutIntro({
  techSkills,
  techSkillsTotal,
  portraitImagePriority = false,
}: AboutIntroProps) {
  return (
    <section className="border-b border-white/10 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-stretch">
          <div className="flex flex-col gap-6 lg:col-span-2 lg:min-h-0 lg:h-full">
            <div className="group relative min-h-[248px] flex-1 overflow-hidden rounded-3xl border border-white/10 bg-navy-light/30 transition-all duration-500 hover:border-turquoise/30">
              <Image
                src="/about-cta.jpg"
                alt="Porträtt av Moa Borg"
                fill
                priority={portraitImagePriority}
                fetchPriority={portraitImagePriority ? "high" : "auto"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent" />
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-navy-light/25 px-8 py-10 transition-colors duration-300 md:px-9 hover:border-white/18">
              <p className={SECTION_OVERLINE_LABEL}>Kul fakta</p>
              <BulletList items={FUN_FACTS} />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-navy-light/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-turquoise/25 md:p-8 lg:col-span-3 lg:h-full lg:min-h-0 lg:p-10">
            <div>
              <p className={SECTION_OVERLINE_LABEL}>Om mig</p>

              <h2 className="mb-3 mt-10 text-balance text-4xl font-bold leading-tight text-fg lg:text-5xl">
                Vem är jag?
              </h2>

              <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-muted">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                  <span>Sätila, Sverige</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Code className="h-4 w-4 shrink-0" aria-hidden />
                  <span>Kreativ fullstack-utvecklare</span>
                </div>
              </div>

              <p className="mb-10 max-w-none text-xl leading-relaxed text-fg-muted">
                Mitt namn är Moa och jag är en fullstackutvecklare med intresse för design,
                användarupplevelse och moderna webbapplikationer. Med bakgrund inom inredning har
                jag med mig ett starkt öga för detaljer och uppskattar lösningar där design och
                välstrukturerad kod arbetar tillsammans. Till sommaren tar jag examen och söker nu
                min första roll som utvecklare, efter sex månaders LIA med fina referenser.
              </p>

              <div className="mb-10 space-y-6 pb-2">
                {techSkillsTotal > 0 && (
                  <div>
                    <p className={SECTION_OVERLINE_LABEL}>Tekniker</p>
                    <div className="flex flex-wrap gap-2">
                      {techSkills.map((skill) => (
                        <TechPill key={skill.slug}>{skill.name}</TechPill>
                      ))}
                    </div>
                    {techSkillsTotal > techSkills.length && (
                      <p className="mt-4 mb-0 text-sm text-fg-muted">
                        <NavLink href={sitePath.aboutTechSection} withArrow>
                          Alla tekniker
                        </NavLink>
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <p className={SECTION_OVERLINE_LABEL}>Utbildningar</p>
                  <DetailList
                    items={EDUCATIONS.map(({ programme, school }) => ({
                      primary: programme,
                      secondary: school,
                    }))}
                  />
                </div>
              </div>
            </div>

            <Link
              href={sitePath.about}
              aria-label="Läs mer om mig"
              className={`${buttonClassName("secondary")} group inline-flex w-fit items-center gap-2`}
            >
              Läs mer om mig
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Layout-safe placeholder while tech stack loads for the home AboutIntro block. */
export function AboutIntroSkeleton() {
  return (
    <section
      className="border-b border-white/10 py-12 md:py-16 lg:py-20"
      aria-busy="true"
      aria-label="Läser in innehåll"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-stretch">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="min-h-[248px] flex-1 animate-pulse rounded-3xl border border-white/10 bg-navy-light/30" />
            <div className="h-48 shrink-0 animate-pulse rounded-2xl border border-white/10 bg-navy-light/25 md:h-52" />
          </div>
          <div className="lg:col-span-3">
            <div className="min-h-[28rem] animate-pulse rounded-3xl border border-white/10 bg-navy-light/20 p-8 md:p-10">
              <div className="h-4 w-24 rounded bg-white/10" />
              <div className="mt-10 h-10 w-2/3 max-w-sm rounded bg-white/10" />
              <div className="mt-8 space-y-3">
                <div className="h-4 w-full rounded bg-white/10" />
                <div className="h-4 w-full rounded bg-white/10" />
                <div className="h-4 w-4/5 rounded bg-white/10" />
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <div className="h-8 w-16 rounded-full bg-white/10" />
                <div className="h-8 w-24 rounded-full bg-white/10" />
                <div className="h-8 w-20 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
