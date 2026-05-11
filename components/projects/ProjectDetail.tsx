"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Code, ExternalLink, GitBranch, Play } from "lucide-react";

import { TextColumnGrid } from "@/components/blocks/TextColumnGrid";
import { TechPill } from "@/components/tech/TechPill";
import { buttonClassName } from "@/components/ui/Button";
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
const GALLERY_THUMB_QUALITY = 72;
const LIGHTBOX_IMAGE_QUALITY = 90;

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
  usePlaceholderCaseStudy?: boolean;
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
  backLabel = "Alla projekt",
}: ProjectDetailProps) {
  const sortedImages = [...images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const effectiveDeployUrl = deployUrl ?? (showStubActionLinks ? STUB_DEPLOY_URL : null);
  const effectiveGithubUrl = githubUrl ?? (showStubActionLinks ? STUB_GITHUB_URL : null);
  const effectiveVideoUrl = videoUrl ?? (showStubActionLinks ? STUB_VIDEO_URL : null);
  const selectedImage = selectedImageIndex === null ? null : sortedImages[selectedImageIndex];

  const resolvedTechDetails =
    techDetails.length > 0
      ? techDetails
      : usePlaceholderCaseStudy
        ? PROJECT_TECH_DETAILS_FALLBACK
        : [];
  const resolvedLearnings =
    learnings.length > 0 ? learnings : usePlaceholderCaseStudy ? PROJECT_LEARNINGS_FALLBACK : [];

  const hasHeroActions = Boolean(effectiveDeployUrl || effectiveGithubUrl || effectiveVideoUrl);

  useEffect(() => {
    if (selectedImageIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImageIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImageIndex]);

  useEffect(() => {
    if (selectedImageIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedImageIndex]);

  return (
    <article className="pb-20">
      <header className="relative ml-[calc(50%-50vw)] w-screen max-w-[100vw] overflow-x-clip">
        <div className="relative min-h-[min(72vh,52rem)] w-full md:min-h-[min(76vh,56rem)]">
          <Image
            src={featuredImage}
            alt={`Utvald projektbild: ${title}`}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />

          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-black/22 md:bg-black/18"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-black/65 to-transparent md:h-44 md:from-black/55"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[min(70vh,36rem)] bg-gradient-to-t from-[var(--background)]/96 via-black/42 to-transparent md:h-[min(72vh,40rem)]"
            aria-hidden
          />
          <Link
            href={backHref}
            className={[
              buttonClassName("secondary"),
              "absolute left-[max(var(--container-padding-x),calc((100vw-var(--container-max-width))/2+var(--container-padding-x)))] top-7 z-20 gap-2 [&_svg]:size-4",
            ].join(" ")}
          >
            <ArrowLeft aria-hidden />
            {backLabel}
          </Link>

          <div className="absolute inset-x-0 bottom-0 z-20 pb-12 pt-36 md:pb-14 md:pt-44">
            <div className="container px-[var(--container-padding-x)]">
              <h1 className="max-w-full text-pretty text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.75),0_0_28px_rgb(0_0_0/0.45)] md:max-w-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-white/90 [text-shadow:0_1px_2px_rgb(0_0_0/0.7),0_0_20px_rgb(0_0_0/0.4)] md:text-lg">
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
              {sortedImages.map((image, index) => (
                <li key={`${image.src}-${image.sortOrder ?? 0}`} className="min-w-0 list-none">
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className="group block w-full rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    aria-label={`Öppna bild ${index + 1} i större vy`}
                  >
                    <figure className="m-0 w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-light/25 shadow-sm shadow-black/20">
                      <div
                        className="relative w-full min-w-0 overflow-hidden"
                        style={{ aspectRatio: "16 / 9" }}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt || `${title} — galleri`}
                          fill
                          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 32vw"
                          quality={GALLERY_THUMB_QUALITY}
                          className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none lg:group-hover:scale-[1.03]"
                        />
                      </div>
                    </figure>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-dark/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Förstorad galleribild"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              className="absolute right-2 top-2 z-10 rounded-md bg-navy-dark/80 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"
              aria-label="Stäng förstorad bild"
            >
              Stäng
            </button>
            <div className="relative mx-auto max-h-[85vh] w-full overflow-hidden rounded-xl border border-white/15 bg-black/40">
              <div className="relative h-[min(85vh,56.25vw)] w-full max-h-[85vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt || `${title} — galleri`}
                  fill
                  sizes="100vw"
                  quality={LIGHTBOX_IMAGE_QUALITY}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
