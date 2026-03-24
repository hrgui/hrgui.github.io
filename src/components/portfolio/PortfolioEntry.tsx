import type { ComponentChildren } from "preact";

import TechnologiesUsed from "~/components/portfolio/TechnologiesUsed";

import PortfolioMedia from "./PortfolioMedia";
import WhatIDid from "./WhatIDid";

import { type PortfolioFrontmatter } from "../../types/frontmatter";
import Link from "../layout/Link";

type Props = PortfolioFrontmatter & { children?: ComponentChildren };

const externalLinkClassName =
  "block rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 transition-all duration-150 ease-out hover:border-primary/70 hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-high active:scale-[0.99] active:border-primary";

const accentLineBaseClassName =
  "pointer-events-none absolute inset-x-5 top-0 h-px rounded-full";

const accentGlowBaseClassName =
  "pointer-events-none absolute inset-x-10 top-0 h-3 blur-md";

const PortfolioEntry = ({
  title,
  demoUrl,
  githubUrl,
  urls,
  thumbnail,
  images,
  iframe,
  whatIDid,
  technologiesUsed,
  children,
}: Props) => {
  return (
    <>
      <section className="graph-bg px-6 pb-10 pt-24 sm:pt-28">
        <div className="container mx-auto max-w-[1536px] lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="label-mono mb-3 text-tertiary">
              project_entry // live_record
            </p>
            <h1 className="bg-gradient-to-r from-on-background via-tertiary to-tertiary-container bg-clip-text font-headline text-3xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              {title}
            </h1>
          </div>

          <div className="mt-6 rounded-2xl border border-outline-variant bg-surface-container-high p-4 lg:mt-0 lg:min-w-[320px]">
            <p className="label-mono mb-3 text-on-surface-muted">
              external_links
            </p>
            <div className="space-y-2">
              {demoUrl && (
                <Link
                  href={demoUrl}
                  className={externalLinkClassName}
                  target="__blank"
                  rel="noreferrer"
                >
                  Open Demo
                </Link>
              )}
              {githubUrl && (
                <Link
                  href={githubUrl}
                  className={externalLinkClassName}
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub Code
                </Link>
              )}
              {urls &&
                urls.map((url, i) => (
                  <Link
                    href={url}
                    key={i}
                    target="_blank"
                    rel="noreferrer"
                    className={`${externalLinkClassName} overflow-hidden overflow-ellipsis`}
                  >
                    Visit {url}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <PortfolioMedia
        title={title}
        images={images}
        thumbnail={thumbnail}
        iframe={iframe}
      />

      <section className="bg-surface py-12">
        <div className="container mx-auto max-w-[1536px] px-6 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-12">
              {whatIDid && (
                <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-surface-container-low p-6 shadow-floating sm:p-8 md:col-span-8">
                  <div
                    className={`${accentLineBaseClassName} bg-gradient-to-r from-transparent via-primary/80 to-transparent dark:via-primary/60`}
                  />
                  <div
                    className={`${accentGlowBaseClassName} bg-gradient-to-r from-transparent via-primary/30 to-transparent dark:via-primary/22`}
                  />
                  <p className="label-mono mb-4 text-primary">
                    impact_log // execution
                  </p>
                  <WhatIDid whatIDid={whatIDid} />
                </div>
              )}
              {technologiesUsed && (
                <div className="relative overflow-hidden rounded-3xl border border-tertiary/30 bg-surface-container-low p-6 shadow-floating sm:p-8 md:col-span-4">
                  <div
                    className={`${accentLineBaseClassName} bg-gradient-to-r from-transparent via-tertiary/80 to-transparent dark:via-tertiary/60`}
                  />
                  <div
                    className={`${accentGlowBaseClassName} bg-gradient-to-r from-transparent via-tertiary/30 to-transparent dark:via-tertiary/22`}
                  />
                  <TechnologiesUsed data={technologiesUsed} />
                </div>
              )}
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-secondary/30 bg-surface-container-low p-6 shadow-floating sm:p-8">
              <div
                className={`${accentLineBaseClassName} bg-gradient-to-r from-transparent via-secondary/80 to-transparent dark:via-secondary/60`}
              />
              <div
                className={`${accentGlowBaseClassName} bg-gradient-to-r from-transparent via-secondary/30 to-transparent dark:via-secondary/22`}
              />
              <p className="label-mono mb-4 text-secondary">
                project_notes // context
              </p>
              <div className="prose prose-sm max-w-none prose-headings:mt-0 prose-headings:mb-4 dark:prose-invert md:prose-lg lg:prose-xl">
                <main>{children}</main>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioEntry;
