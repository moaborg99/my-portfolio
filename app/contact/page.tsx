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
    <section aria-labelledby="contact-heading">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-2">
          <h1 id="contact-heading">Letar ni efter en ny kollega?</h1>
          <p className="max-w-prose text-pretty text-fg-muted">
            Jag är kreativ, nyfiken och letar aktivt efter ett team att få fortsätta utvecklas i
            efter examen. Jag tror på att vi växer genom att dela kunskap och erfarenheter. Jag är
            öppen för roller inom webbutveckling både som fullstack, frontend och mer kreativa
            kombinationsroller inom UI/UX.
          </p>
          <p className="max-w-prose text-pretty text-fg-muted">
            Om jag verkar intressant, kontakta mig gärna så kan jag berätta mer om vad jag kan bidra
            med och dela mitt CV.
          </p>
          <SocialLinks className="flex gap-4" iconClassName="h-8 w-8" />
        </div>

        <div className="w-full">
          <Image
            src="/about-cta.jpg"
            alt="Porträtt av Moa Borg"
            width={900}
            height={1125}
            priority
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
