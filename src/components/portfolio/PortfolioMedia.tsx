import { type PortfolioFrontmatter } from "types/frontmatter";
import { useState } from "preact/hooks";
import Slider from "~/components/portfolio/Slider/Slider";

type Props = Pick<
  PortfolioFrontmatter,
  "images" | "thumbnail" | "title" | "iframe"
>;

const PortfolioMedia = ({ images, thumbnail, title, iframe }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasIframe = Boolean(iframe);

  return (
    <section className="bg-surface-container-lowest/60 py-0">
      {!hasIframe && thumbnail && !images && (
        <div data-testid="portfolio-media-thumbnail">
          <img
            className="w-full max-w-none object-cover"
            alt={title}
            src={thumbnail}
          />
        </div>
      )}
      {!hasIframe && images && (
        <>
          <Slider
            isFullBleed
            data-testid="portfolio-media-slider"
            onIndexChange={setCurrentImageIndex}
          >
            {images.map((img, i) => {
              return (
                <div key={i}>
                  <a
                    href={img.src}
                    target="__blank"
                    className="block transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-inset active:scale-[0.995] cursor-pointer"
                  >
                    <img alt={title} src={img.thumbnail} />
                  </a>
                </div>
              );
            })}
          </Slider>
          <div className="bg-surface-container-lowest/60 py-3 px-4 text-center">
            <p className="text-sm text-on-surface/70">
              {images[currentImageIndex]?.src.split("/").pop() || ""}
            </p>
          </div>
        </>
      )}
      {hasIframe && thumbnail && (
        <div
          className="md:hidden"
          data-testid="portfolio-media-iframe-thumbnail"
        >
          <img
            className="w-full max-w-none object-cover"
            alt={title}
            src={thumbnail}
          />
        </div>
      )}
      {hasIframe && (
        <iframe
          data-testid="portfolio-media-iframe"
          className="hidden w-full max-w-none border-y border-outline-variant md:block"
          {...iframe}
        />
      )}
    </section>
  );
};

export default PortfolioMedia;
