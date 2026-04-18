import Link from "next/link";
import { IconGitHub, IconLinkedIn, IconMail } from "@/components/svg/socials/SocialIcons";

/** Replace with your real profile URLs. */
const SOCIAL = {
  github: "https://github.com/moaborg99",
  linkedin: "https://www.linkedin.com/in/moa-b-99a167131",
} as const;

const EMAIL = "borg.moa@hotmail.com";

const socialLinkClass =
  "inline-flex text-fg-muted transition-colors hover:text-turquoise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-light">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <Link href="/" className="text-xl font-semibold text-fg">
              Moa Borg
            </Link>
            <p className="text-base text-fg-muted">Software Developer</p>
          </div>

          <ul
            aria-label="Social links"
            className="flex w-full flex-wrap items-center justify-left gap-5 md:w-auto "
          >
            <li>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="GitHub"
              >
                <IconGitHub className="h-7 w-7" />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="h-7 w-7" />
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={socialLinkClass} aria-label="Email">
                <IconMail className="h-7 w-7" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
