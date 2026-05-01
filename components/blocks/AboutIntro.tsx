import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, MapPin } from "lucide-react";
import type { TechStackSkill } from "@/types/tech-stack";

import { TechPill } from "@/components/tech/TechPill";
import { buttonClassName } from "@/components/ui/Button";
import { NavLink } from "@/components/ui/NavLink";
import { BulletList } from "@/components/ui/BulletList";
import { DetailList } from "@/components/ui/DetailList";

const FUN_FACTS = [
  "Studerat till webbutvecklare för att kombinera kreativitet, nyfikenhet och logik",
  "Tror på starka, prestigelösa team som lyfter och utvecklas tillsammans",
  "Flyttat från Göteborg till landet – renoverar hus själv med min sambo genom learning-by-doing",
  "Jag älskar djur och har en hund på fem år",
] as const;
const EDUCATIONS = [
  { programme: "Frontendutvecklare (Fullstack)", school: "EC-utbildning, Väsjö (Distans)" },
  {
    programme: "Inredare, Inredningsstylis & Homestagingkonsult",
    school: "Inredningskurser, distans",
  },
] as const;

const ABOUT_LABEL_RULE = "type-overline text-turquoise type-section-label-bar";

type AboutIntroProps = {
  techSkills: TechStackSkill[];
  techSkillsTotal: number;
};

export function AboutIntro({ techSkills, techSkillsTotal }: AboutIntroProps) {
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
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent" />
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-navy-light/25 px-8 py-10 transition-colors duration-300 md:px-9 hover:border-white/18">
              <p className={ABOUT_LABEL_RULE}>Fun facts</p>
              <BulletList items={FUN_FACTS} />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-navy-light/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-turquoise/25 md:p-8 lg:col-span-3 lg:h-full lg:min-h-0 lg:p-10">
            <div>
              <p className={ABOUT_LABEL_RULE}>Om mig</p>

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
                Mitt namn är Moa och jag är en kreativ fullstack-utvecklare som ser värdet i god
                design och solid kod. Har en bakgrund som utbildad inredare och ser stort värde i
                god design och användarvänliga applikationer. Jag tar examen som till sommaren och
                nu är jag redo för min första roll som utvecklare, med fina referenser från sex
                månaders LIA i ryggen.
              </p>

              <div className="mb-10 space-y-6 pb-2">
                {techSkillsTotal > 0 && (
                  <div>
                    <p className={ABOUT_LABEL_RULE}>Tekniker</p>
                    <div className="flex flex-wrap gap-2">
                      {techSkills.map((skill) => (
                        <TechPill key={skill.slug}>{skill.name}</TechPill>
                      ))}
                    </div>
                    {techSkillsTotal > techSkills.length && (
                      <p className="mt-4 mb-0 text-sm text-fg-muted">
                        <NavLink href="/about#about-lia-heading" withArrow>
                          Alla tekniker
                        </NavLink>
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <p className={ABOUT_LABEL_RULE}>Utbildningar</p>
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
              href="/about"
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
