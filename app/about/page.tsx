import Link from "next/link";
import type { Metadata } from "next";
import { buttonClassName } from "@/components/ui/Button";
import Image from "next/image";

export const metadata: Metadata = { title: "Om mig" };

/** Vertikal etikett mellan text och bild — ändra strängen om du vill. */
const HERO_SIDE_LABEL = "Design · Kod · Människa";

const TECH_PILL =
  "rounded-full border border-white/15 bg-navy-light/30 px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-turquoise/40 hover:bg-navy-light/50";

const TECH_GROUP_LABEL = "text-xs font-semibold uppercase tracking-[0.2em] text-turquoise";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16">
      <section
        aria-labelledby="about-hero-heading"
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip bg-navy-dark text-fg"
      >
        <div className="grid min-h-[28rem] grid-cols-1 md:min-h-[min(70vh,40rem)] md:grid-cols-[minmax(0,1fr)_44vw]">
          {" "}
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
              className={`${buttonClassName("primary")} mt-2 inline-flex w-fit`}
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
        <div className="">
          <h2 id="about-body-heading" className="text-fg">
            Om mig
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            <div className="min-w-0">
              <h3 className="text-fg">Bakgrund</h3>
              <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit — tempus cursus eget sapien
                non. Vestibulum vitae lorem ut arcu varius tincidunt. Integer posuere, neque id
                facilisis aliquet, metus purus fermentum nibh, ut gravida nisl nunc vel risus. Donec
                pulvinar velit sed orci efficitur, in interdum nulla facilisis. Curabitur at sapien
                sit amet erat malesuada tincidunt eget quis justo, non gravida justo.
              </p>
            </div>
            <div className="min-w-0 lg:border-l lg:border-turquoise/60 lg:pl-8">
              <h3 className="text-fg">Utbildning</h3>
              <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit — tempus cursus eget sapien
                non. Vestibulum vitae lorem ut arcu varius tincidunt. Integer posuere, neque id
                facilisis aliquet, metus purus fermentum nibh, ut gravida nisl nunc vel risus. Donec
                pulvinar velit sed orci efficitur, in interdum nulla facilisis. Curabitur at sapien
                sit amet erat malesuada tincidunt eget quis justo, non gravida justo.
              </p>
            </div>
            <div className="min-w-0 lg:border-l lg:border-turquoise/60 lg:pl-8">
              <h3 className="text-fg">Vem är jag</h3>
              <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit — tempus cursus eget sapien
                non. Vestibulum vitae lorem ut arcu varius tincidunt. Integer posuere, neque id
                facilisis aliquet, metus purus fermentum nibh, ut gravida nisl nunc vel risus. Donec
                pulvinar velit sed orci efficitur, in interdum nulla facilisis. Curabitur at sapien
                sit amet erat malesuada tincidunt eget quis justo, non gravida justo.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="about-featured-projects-heading"
        className="border-t border-white/10 pt-12"
      >
        <h2 id="about-featured-projects-heading" className="text-fg">
          Utvalda projekt
        </h2>
        <p className="mt-3 max-w-prose text-pretty leading-relaxed text-fg-muted">
          Här lyfter jag snart två case — tills dess är rutorna platshållare som följer samma yta
          som projektkorten.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article
            className="rounded-xl border border-dashed border-white/20 bg-navy-light/30 p-5 shadow-sm"
            aria-label="Projektplatshållare 1"
          >
            <div
              className="aspect-video rounded-lg bg-gradient-to-br from-navy-light/80 to-navy-dark/80"
              aria-hidden
            />
            <h3 className="mt-4 text-lg font-semibold text-fg/90">Projektnamn</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Kort beskrivning och länk till caset läggs in när projektkortet är färdigt.
            </p>
          </article>
          <article
            className="rounded-xl border border-dashed border-white/20 bg-navy-light/30 p-5 shadow-sm"
            aria-label="Projektplatshållare 2"
          >
            <div
              className="aspect-video rounded-lg bg-gradient-to-br from-navy-light/80 to-navy-dark/80"
              aria-hidden
            />
            <h3 className="mt-4 text-lg font-semibold text-fg/90">Projektnamn</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Kort beskrivning och länk till caset läggs in när projektkortet är färdigt.
            </p>
          </article>
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-flex text-turquoise underline decoration-turquoise/40 underline-offset-2 transition-colors hover:text-fg"
        >
          Alla projekt
        </Link>
      </section>
      {/*
        Teknik (Option A): grupper som på CV. WordPress finns under CMS — inte upprepad under backend.
      */}
      {/*
        LIA (vänster) + Teknik (höger), 50/50 från lg. WordPress under CMS — inte upprepad under backend.
      */}
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
            <div className="mt-8 space-y-8">
              <div>
                <h3 className={TECH_GROUP_LABEL}>Frontend</h3>
                <ul className="mt-4 flex list-none flex-wrap gap-4 space-y-2 p-0">
                  {[
                    "HTML",
                    "CSS",
                    "Tailwind CSS",
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Angular",
                    "Alpine.js",
                  ].map((name) => (
                    <li key={name}>
                      <span className={TECH_PILL}>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className={TECH_GROUP_LABEL}>Backend</h3>
                <ul className="mt-4 flex list-none flex-wrap gap-4 space-y-2 p-0">
                  {["Node.js", "PHP", "Laravel", "Livewire", "ASP.NET Core"].map((name) => (
                    <li key={name}>
                      <span className={TECH_PILL}>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className={TECH_GROUP_LABEL}>Databaser</h3>
                <ul className="mt-4 flex list-none flex-wrap gap-4 space-y-2 p-0">
                  {["MySQL", "SQLite", "Better SQLite"].map((name) => (
                    <li key={name}>
                      <span className={TECH_PILL}>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className={TECH_GROUP_LABEL}>UX/UI &amp; design</h3>
                <ul className="mt-4 flex list-none flex-wrap gap-4 space-y-2 p-0">
                  {["Figma", "Canva", "SketchUp"].map((name) => (
                    <li key={name}>
                      <span className={TECH_PILL}>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className={TECH_GROUP_LABEL}>CMS</h3>
                <ul className="mt-4 flex list-none flex-wrap gap-4 space-y-2 p-0">
                  <li>
                    <span className={TECH_PILL}>WordPress · eget tema</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={TECH_GROUP_LABEL}>Verktyg &amp; metoder</h3>
                <ul className="mt-4 flex list-none flex-wrap gap-4 space-y-2 p-0">
                  {[
                    "Git",
                    "GitHub",
                    "VS Code",
                    "Cursor",
                    "TablePlus",
                    "Laravel Herd",
                    "Scrum",
                    "Domän & DNS-hantering",
                  ].map((name) => (
                    <li key={name}>
                      <span className={TECH_PILL}>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="about-cta-heading"
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip border-t border-white/10"
      >
        <div className="grid min-h-[min(26rem,78vh)] grid-cols-1 lg:grid-cols-2 lg:min-h-[min(28rem,70vh)]">
          <div className="flex flex-col justify-center gap-6 bg-navy-light px-6 py-12 text-fg md:px-10 lg:px-12 lg:py-16">
            <div className="mx-auto w-full max-w-xl text-left">
              <h2 id="about-cta-heading" className="text-fg">
                Hör av dig
              </h2>
              <p className="mt-4 max-w-none text-pretty leading-relaxed text-fg-muted">
                Vill du prata om ett projekt, LIA eller bara utbyta idéer? Skicka ett meddelande —
                jag svarar så snart jag kan.
              </p>
              <div className="mt-8 flex justify-start">
                <Link href="/contact" className="btn btn-primary">
                  Kontaka mig!
                </Link>
              </div>
            </div>
          </div>
          <div className="relative min-h-[18rem] w-full lg:min-h-0">
            <Image
              src="/about-cta.jpg"
              alt="Porträtt av Moa Borg"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="eager"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
