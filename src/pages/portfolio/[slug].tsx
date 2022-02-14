import Slider from "@/components/portfolio/Slider"
import TechnologiesUsed from "@/components/portfolio/TechnologiesUsed"
import Seo from "@/components/Seo"
import { MDXRemote } from "next-mdx-remote"
import Head from "next/head"
import {
  getMarkdownPropsBySlugName,
  getMarkdownStaticPaths,
  PortfolioFrontmatter,
} from "../../utils/mdxUtils"

const components = {
  Head,
}

interface PortfolioPageProps {
  source
  frontMatter: PortfolioFrontmatter
}

export default function PortfolioPage({
  source,
  frontMatter: data,
}: PortfolioPageProps) {
  return (
    <>
      <Seo
        title={`Portfolio: ${data.title}`}
        description={data.whatIDid?.[0] || "Portfolio"}
      />
      <div className="p-6 pt-28 lg:flex lg:justify-between graph-bg dark:dark-graph-bg">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
          {data.title}
        </h1>
        <div className="mt-2 mb-2">
          {data.url && (
            <a
              href={data.url}
              className="uppercase block dark:text-gray-100 text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
              target="__blank"
              rel="noreferrer"
            >
              Open Link / Demo in new Tab
            </a>
          )}
          {data.githubUrl && (
            <a
              href={data.githubUrl}
              className="uppercase block dark:text-gray-100 text-gray-700 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              View Github Code
            </a>
          )}
          {data.urls &&
            data.urls.map((url, i) => (
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

      <div className="bg-gray-100 dark:bg-gray-800 pt-4 pb-4">
        {data.thumbnail && !data.images && (
          <div className="md:hidden">
            <img className="w-screen" alt={data.title} src={data.thumbnail} />
          </div>
        )}
        {data.images && (
          <Slider>
            {data.images.map((img, i) => {
              return (
                <div key={i}>
                  <a href={img.src} target="__blank">
                    <img alt={data.title} src={img.thumbnail} />
                  </a>
                </div>
              )
            })}
          </Slider>
        )}
        {data.iframe && (
          <iframe className="hidden md:block w-full" {...data.iframe} />
        )}
      </div>

      <div className="p-6 mx-auto">
        <div className="md:grid md:grid-cols-12">
          {data.whatIDid && (
            <div className="mb-10 md:col-span-8">
              <h3 className="font-semibold text-2xl md:text-4xl mb-6 text-gray-700 dark:text-gray-200">
                What I Did
              </h3>
              <ul className="ml-6">
                {data.whatIDid.map((bullet, i) => (
                  <li key={i} className="list-disc">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.technologiesUsed && (
            <TechnologiesUsed
              className={"md:col-span-4"}
              data={data.technologiesUsed}
            />
          )}
        </div>
        <div className="prose dark:prose-invert prose-sm md:prose-md md:prose-lg lg:prose-xl">
          <main>
            <MDXRemote {...source} components={components} />
          </main>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ params }) =>
  getMarkdownPropsBySlugName(params.slug, "portfolio")

export const getStaticPaths = async () => getMarkdownStaticPaths("portfolio")
