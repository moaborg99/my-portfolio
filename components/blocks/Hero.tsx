import Link from "next/link";
import { ArrowRight, MailIcon } from "lucide-react";

import { SocialLinks } from "@/components/social/SocialLinks";
import { buttonClassName } from "@/components/ui/Button";
import { sitePath } from "@/lib/site-paths";

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-turquoise/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-coral/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container relative z-10 w-full py-16 text-center">
        <p className="type-overline mx-auto text-turquoise">Lorem ipsum dolor sit amet</p>

        <h1 className="type-display mx-auto text-fg">
          Lorem ipsum
          <span className="mt-2 block text-turquoise">Lorem ipsum dolor sit</span>
        </h1>

        <p className="mx-auto mt-2 max-w-3xl text-fg-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={sitePath.projects}
            prefetch
            className={`${buttonClassName("primary")} group inline-flex items-center gap-2`}
          >
            Mina projekt
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:translate-x-1.5"
            />
          </Link>

          <Link
            href={sitePath.contact}
            prefetch
            className={`${buttonClassName("secondary")} inline-flex items-center gap-2`}
          >
            Kontakta mig
            <MailIcon className="h-4 w-4" />
          </Link>
        </div>

        <SocialLinks
          className="mt-10 flex items-center justify-center gap-5"
          iconClassName="h-6 w-6"
        />
      </div>
    </section>
  );
}
