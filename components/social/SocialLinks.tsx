"use client";

import { IconGitHub, IconLinkedIn, IconMail } from "@/components/social/SocialIcons";

const SOCIAL = {
  github: "https://github.com/moaborg99",
  linkedin: "https://www.linkedin.com/in/moa-b-99a167131",
} as const;

const EMAIL = "borg.moa@hotmail.com";

const linkClass =
  "inline-flex text-fg-muted transition-colors hover:text-turquoise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise";

export type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
  onNavigate?: () => void;
};

export function SocialLinks({
  className,
  iconClassName = "h-7 w-7",
  onNavigate,
}: SocialLinksProps) {
  return (
    <ul aria-label="Sociala länkar" className={className}>
      <li>
        <a
          href={SOCIAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="GitHub"
          onClick={onNavigate}
        >
          <IconGitHub className={iconClassName} />
        </a>
      </li>
      <li>
        <a
          href={SOCIAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="LinkedIn"
          onClick={onNavigate}
        >
          <IconLinkedIn className={iconClassName} />
        </a>
      </li>
      <li>
        <a href={`mailto:${EMAIL}`} className={linkClass} aria-label="E-post" onClick={onNavigate}>
          <IconMail className={iconClassName} />
        </a>
      </li>
    </ul>
  );
}
