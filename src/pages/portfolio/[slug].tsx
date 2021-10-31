import Slider from "@/components/portfolio/Slider"
import TechnologiesUsed from "@/components/portfolio/TechnologiesUsed"
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
      <div className="pt-28 p-5 mb-14">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium">
          {data.title}
        </h1>
        <div className="mt-2 mb-2">
          {data.url && (
            <a
              href={data.url}
              className="uppercase block"
              target="__blank"
              rel="noreferrer"
            >
              Open Link / Demo in new Tab
            </a>
          )}
          {data.githubUrl && (
            <a
              href={data.githubUrl}
              className="uppercase block"
              target="_blank"
              rel="noreferrer"
            >
              View Github Code
            </a>
          )}
          {data.urls &&
            data.urls.map((url, i) => (
              <a href={url} key={i} target="_blank" rel="noreferrer">
                Visit {url}
              </a>
            ))}
        </div>
      </div>
      {data.thumbnail && !data.images && (
        <div className=" bg-black">
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
      {data.iframe && <iframe className="hidden" {...data.iframe} />}
      <div className="p-6 container mx-auto">
        {data.whatIDid && (
          <div>
            <h3 className="font-semibold text-2xl mb-6">What I Did</h3>
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
          <TechnologiesUsed data={data.technologiesUsed} />
        )}
        <div className="prose prose-md md:prose-lg lg:prose-xl">
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
