"use client";

import Image from "next/image";
import Link from "next/link";
import { Code, ExternalLink, GitBranch, Play } from "lucide-react";

import { TextColumnGrid } from "@/components/blocks/TextColumnGrid";
import { TechPill } from "@/components/tech/TechPill";
import { buttonClassName } from "@/components/ui/Button";
import { NavLink } from "@/components/ui/NavLink";
import {
  PROJECT_LEARNINGS_FALLBACK,
  PROJECT_TECH_DETAILS_FALLBACK,
} from "@/data/project-detail-fallback";
import type { DetailItem } from "@/types/project-detail";

import { sitePath } from "@/lib/site-paths";

import { DetailItemList } from "./DetailItemList";

/** Preview-only targets when `showStubActionLinks` fills missing CMS URLs, Will remove this when i have updated my projects with real content and complete data. */
const STUB_DEPLOY_URL = "https://example.com";
const STUB_GITHUB_URL = "https://github.com";
const STUB_VIDEO_URL = "https://example.com";

export type ProjectDetailImage = {
  src: string;
  alt: string;
  sortOrder?: number;
};

export type ProjectDetailLearning = {
  title: string;
  description: string;
};

export type ProjectDetailProps = {
  title: string;
  summary: string;
  intro: string;
  description: string;
  featuredImage: string;
  githubUrl?: string | null;
  deployUrl?: string | null;
  videoUrl?: string | null;
  images: ProjectDetailImage[];
  skills: string[];
  techDetails?: DetailItem[];
  learnings?: ProjectDetailLearning[];
  /** When true and CMS arrays are empty, show neutral placeholder copy for the case-study sections */
  usePlaceholderCaseStudy?: boolean;
  /**
   * When true, any missing deploy/github/video URL still renders that hero button using a stub link
   * so you can tune layout. Turn off when publishing.
   */
  showStubActionLinks?: boolean;
  backHref?: string;
  backLabel?: string;
};

export function ProjectDetail({
  title,
  summary,
  intro,
  description,
  featuredImage,
  githubUrl,
  deployUrl,
  videoUrl,
  images,
  skills,
  techDetails = [],
  learnings = [],
  usePlaceholderCaseStudy = true,
  showStubActionLinks = false,
  backHref = sitePath.projects,
  backLabel = "Tillbaka till projekt",
}: ProjectDetailProps) {
  const sortedImages = [...images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const effectiveDeployUrl = deployUrl ?? (showStubActionLinks ? STUB_DEPLOY_URL : null);
  const effectiveGithubUrl = githubUrl ?? (showStubActionLinks ? STUB_GITHUB_URL : null);
  const effectiveVideoUrl = videoUrl ?? (showStubActionLinks ? STUB_VIDEO_URL : null);

  const resolvedTechDetails =
    techDetails.length > 0
      ? techDetails
      : usePlaceholderCaseStudy
        ? PROJECT_TECH_DETAILS_FALLBACK
        : [];
  const resolvedLearnings =
    learnings.length > 0 ? learnings : usePlaceholderCaseStudy ? PROJECT_LEARNINGS_FALLBACK : [];

  const hasHeroActions = Boolean(effectiveDeployUrl || effectiveGithubUrl || effectiveVideoUrl);

  return (
    <article className="pb-20">
      <header className="relative ml-[calc(50%-50vw)] w-screen max-w-[100vw] overflow-x-clip">
        <div className="relative min-h-[min(72vh,52rem)] w-full md:min-h-[min(76vh,56rem)]">
          <Image src={featuredImage} alt="" fill priority sizes="100vw" className="object-cover" />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--palette-navy-dark)]/18 via-transparent to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)] from-0% via-navy-dark/32 via-[38%] to-transparent"
            aria-hidden
          />

          <NavLink
            href={backHref}
            leadingArrow
            className="absolute left-[max(var(--container-padding-x),calc((100vw-var(--container-max-width))/2+var(--container-padding-x)))] top-7 z-20 text-[0.8125rem] font-semibold !text-white hover:!text-white/88 focus-visible:!text-white [&_svg]:!text-current drop-shadow-[0_1px_3px_rgb(0_0_0/0.75)] md:text-sm"
          >
            {backLabel}
          </NavLink>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[var(--background)] from-0% via-[var(--background)]/32 via-[45%] to-transparent pt-36 pb-0 md:pt-44 md:pb-4" />

          <div className="absolute inset-x-0 bottom-0 z-20 pb-12 pt-36 md:pb-14 md:pt-44">
            <div className="container px-[var(--container-padding-x)]">
              <h1 className="max-w-full text-pretty text-white md:max-w-4xl">{title}</h1>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-white/82 md:text-lg">
                {summary}
              </p>

              {hasHeroActions ? (
                <div className="mt-9 flex flex-wrap gap-3">
                  {effectiveDeployUrl ? (
                    <Link
                      href={effectiveDeployUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[buttonClassName("primary"), "gap-2 [&_svg]:size-4"].join(" ")}
                      title={
                        deployUrl ? undefined : "Placeholder — lägg till deployUrl för riktig länk"
                      }
                    >
                      <ExternalLink aria-hidden />
                      Besök live-sajt
                    </Link>
                  ) : null}
                  {effectiveGithubUrl ? (
                    <Link
                      href={effectiveGithubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[buttonClassName("secondary"), "gap-2 [&_svg]:size-4"].join(" ")}
                      title={
                        githubUrl ? undefined : "Placeholder — lägg till githubUrl för riktig länk"
                      }
                    >
                      <GitBranch aria-hidden />
                      Visa källkod
                    </Link>
                  ) : null}
                  {effectiveVideoUrl ? (
                    <Link
                      href={effectiveVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[buttonClassName("secondary"), "gap-2 [&_svg]:size-4"].join(" ")}
                      title={
                        videoUrl ? undefined : "Placeholder — lägg till videoUrl för riktig länk"
                      }
                    >
                      <Play aria-hidden />
                      Se demo
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 mt-2 w-full max-w-[80rem] space-y-[3.75rem] md:space-y-20">
        <section aria-labelledby="project-tech-heading">
          <div className="mb-6 flex items-center gap-3 md:gap-3.5">
            <Code aria-hidden className="size-6 shrink-0 text-turquoise" />
            <h2 id="project-tech-heading" className="m-0 text-fg">
              Teknikstack
            </h2>
          </div>
          <ul className="mt-1 flex max-w-none list-none flex-wrap gap-2 p-0 md:gap-3">
            {skills.map((skill) => (
              <li key={skill}>
                <TechPill>{skill}</TechPill>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mt-0 text-fg">Översikt</h2>
          <p className="mt-3 max-w-none text-pretty text-xl leading-relaxed text-fg-muted">
            {intro}
          </p>
        </section>

        {resolvedTechDetails.length > 0 ? (
          <section aria-labelledby="project-tech-deep-heading">
            <div className="mb-6 flex items-center gap-3 md:gap-3.5">
              <Code aria-hidden className="size-6 shrink-0 text-turquoise" />
              <h2 id="project-tech-deep-heading" className="m-0 text-fg">
                Hur jag använde tekniken
              </h2>
            </div>
            <DetailItemList items={resolvedTechDetails} />
          </section>
        ) : null}

        <section>
          <h2 className="mt-0 text-fg">Om projektet</h2>
          <div className="mt-3 max-w-none whitespace-pre-line text-pretty leading-[var(--leading-relaxed)] text-fg-muted">
            {description}
          </div>
        </section>

        {resolvedLearnings.length > 0 ? (
          <section aria-labelledby="project-learnings-heading">
            <h2 id="project-learnings-heading" className="mt-0 text-fg">
              Vad jag lärde mig
            </h2>
            <TextColumnGrid
              columns={resolvedLearnings.map((learning) => ({
                title: learning.title,
                body: learning.description,
              }))}
            />
          </section>
        ) : null}

        {sortedImages.length > 0 ? (
          <section aria-labelledby="project-gallery-heading">
            <h2 id="project-gallery-heading" className="mt-0 mb-6 text-fg md:mb-8">
              Galleri
            </h2>
            <ul className="mx-auto grid w-full list-none grid-cols-1 gap-4 p-0 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
              {sortedImages.map((image) => (
                <li key={`${image.src}-${image.sortOrder ?? 0}`} className="min-w-0 list-none">
                  <figure className="group m-0 w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-light/25 shadow-sm shadow-black/20">
                    <div
                      className="relative w-full min-w-0 overflow-hidden"
                      style={{ aspectRatio: "4 / 3" }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt || `${title} — galleri`}
                        fill
                        sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 32vw"
                        className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none lg:group-hover:scale-[1.03]"
                      />
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
