import type { ComponentChildren } from "preact";
import { useTranslation } from "~/i18n/context";

import TechnologiesUsed from "~/components/portfolio/TechnologiesUsed";

import PortfolioMedia from "./PortfolioMedia";
import WhatIDid from "./WhatIDid";

import { type PortfolioFrontmatter } from "../../types/frontmatter";

type Props = PortfolioFrontmatter & { children?: ComponentChildren };

const externalLinkClassName = "hr-link max-w-full truncate";

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
  const { t } = useTranslation();
  const hasLinks = Boolean(demoUrl || githubUrl || (urls && urls.length > 0));
  const hasMedia = Boolean(thumbnail || images || iframe);

  return (
    <>
      <section className="hr-stage">
        <div className="hr-frame-col hr-frame-col--bare px-6 pb-14 pt-32 md:px-12 md:pt-36">
          <p className="label-mono mb-4 text-coral">
            {t("portfolio.entry.projectLabel")}
          </p>
          <h1 className="bg-gradient-to-r from-on-background via-tertiary to-tertiary-container bg-clip-text pb-[0.12em] !leading-[1.15] font-display text-[2.75rem] font-extrabold tracking-[-0.04em] text-transparent md:text-display-md">
            {title}
          </h1>

          {hasLinks && (
            <nav
              className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3"
              aria-label={t("portfolio.entry.externalLinksLabel")}
            >
              {demoUrl && (
                <a
                  href={demoUrl}
                  className={externalLinkClassName}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("portfolio.entry.openDemo")}
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  className={externalLinkClassName}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("portfolio.entry.viewGithubCode")}
                </a>
              )}
              {urls &&
                urls.map((url, i) => (
                  <a
                    href={url}
                    key={i}
                    target="_blank"
                    rel="noreferrer"
                    className={externalLinkClassName}
                  >
                    {t("portfolio.entry.visitUrl", { url })}
                  </a>
                ))}
            </nav>
          )}
        </div>
      </section>

      {hasMedia && (
        <section className="hr-frame">
          <div className="hr-frame-col">
            <PortfolioMedia
              title={title}
              images={images}
              thumbnail={thumbnail}
              iframe={iframe}
            />
          </div>
        </section>
      )}

      <section className="hr-frame">
        <div className="hr-frame-col">
          <div className="hr-frame-grid">
            {(whatIDid || technologiesUsed) && (
              <div
                className={`hr-frame-grid ${
                  whatIDid && technologiesUsed ? "hr-frame-grid--entry" : ""
                }`}
              >
                {whatIDid && (
                  <div className="hr-frame-cell">
                    <p className="label-mono mb-4 text-accent">
                      {t("portfolio.entry.impactLabel")}
                    </p>
                    <WhatIDid whatIDid={whatIDid} />
                  </div>
                )}
                {technologiesUsed && (
                  <div className="hr-frame-cell">
                    <TechnologiesUsed data={technologiesUsed} />
                  </div>
                )}
              </div>
            )}

            <div className="hr-frame-cell">
              <p className="label-mono mb-4 text-success">
                {t("portfolio.entry.notesLabel")}
              </p>
              <div className="prose prose-sm max-w-[75ch] prose-headings:mt-0 prose-headings:mb-4 dark:prose-invert md:prose-lg prose-a:text-accent">
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
