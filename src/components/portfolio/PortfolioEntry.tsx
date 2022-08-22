import TechnologiesUsed from "@/components/portfolio/TechnologiesUsed";
import { ComponentChildren } from "preact";
import { PortfolioFrontmatter } from "../../types/frontmatter";
import PortfolioMedia from "./PortfolioMedia";
import WhatIDid from "./WhatIDid";

type Props = PortfolioFrontmatter & { children?: ComponentChildren };

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
      <div className="p-6 pt-24 sm:pt-28 graph-bg dark:dark-graph-bg">
        <div className="container mx-auto lg:flex lg:justify-between ">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            {title}
          </h1>

          <div className="mt-2 mb-2">
            {demoUrl && (
              <a
                href={demoUrl}
                className="block underline font-semibold dark:text-gray-100 text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                target="__blank"
                rel="noreferrer"
              >
                Open Link / Demo in new Tab
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                className="block underline font-semibold dark:text-gray-100 text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                View Github Code
              </a>
            )}
            {urls &&
              urls.map((url, i) => (
                <a
                  href={url}
                  key={i}
                  target="_blank"
                  rel="noreferrer"
                  className="dark:text-gray-100 text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 transition-colors block overflow-hidden overflow-ellipsis"
                >
                  Visit {url}
                </a>
              ))}
          </div>
        </div>
      </div>

      <PortfolioMedia
        title={title}
        images={images}
        thumbnail={thumbnail}
        iframe={iframe}
      />

      <div className="dark:bg-stone-900 pt-12 pb-12">
        <div className="container pl-6 pr-6 sm:pl-2 sm:pr-2 mx-auto">
          <div className="md:grid md:grid-cols-12">
            {whatIDid && <WhatIDid whatIDid={whatIDid} />}
            {technologiesUsed && (
              <TechnologiesUsed
                className={"md:col-span-4"}
                data={technologiesUsed}
              />
            )}
          </div>

          <div className="prose dark:prose-invert max-w-[1536px] prose-sm md:prose-md md:prose-lg lg:prose-xl">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioEntry;
