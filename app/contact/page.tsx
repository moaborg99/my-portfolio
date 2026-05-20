import Image from "next/image";
import type { Metadata } from "next";
import { SocialLinks } from "@/components/social/SocialLinks";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakta Moa Borg.",
};

export const revalidate = 300;

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="container">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-2 mx-auto">
          <h1
            id="contact-heading"
            className="text-[length:var(--text-h2)] font-bold leading-[var(--leading-snug)] tracking-[var(--space-heading-trim)]"
          >
            Letar ni efter en ny kollega?
          </h1>
          <p className="max-w-xl text-pretty text-fg-muted">
            Till sommaren tar jag examen och ser fram emot att fortsätta utvecklas i ett team där
            jag får arbeta med modern webbutveckling inom frontend, fullstack eller UX/UI.
          </p>

          <p className="max-w-xl text-pretty text-fg-muted">
            Jag gillar att kombinera teknik, design och problemlösning och trivs bäst i prestigelösa
            miljöer där man bygger, lär sig och utvecklas tillsammans. Vid intresse delar jag gärna
            mitt CV och berättar mer om mig själv. Hör gärna av er — jag ser fram emot kontakten.
          </p>
          <SocialLinks className="flex gap-5" iconClassName="h-8 w-8" />
        </div>

        <div className="relative mx-auto aspect-[5/6] w-full max-w-lg overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/portfolio-me.jpg"
            alt="Porträtt av Moa Borg"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="(max-width: 1024px) min(100vw, 448px), min(50vw, 448px)"
          />
        </div>
      </div>
    </section>
  );
}
