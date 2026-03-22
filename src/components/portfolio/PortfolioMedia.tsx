import { type PortfolioFrontmatter } from "types/frontmatter";
import Slider from "~/components/portfolio/Slider/Slider";

type Props = Pick<
  PortfolioFrontmatter,
  "images" | "thumbnail" | "title" | "iframe"
>;

const PortfolioMedia = ({ images, thumbnail, title, iframe }: Props) => {
  const hasIframe = Boolean(iframe);

  return (
    <section className="bg-surface-container-lowest/60 py-0">
      {!hasIframe && thumbnail && !images && (
        <div data-testid="portfolio-media-thumbnail">
          <img
            className="w-screen max-w-none object-cover"
            alt={title}
            src={thumbnail}
          />
        </div>
      )}
      {!hasIframe && images && (
        <Slider isFullBleed data-testid="portfolio-media-slider">
          {images.map((img, i) => {
            return (
              <div key={i}>
                <a href={img.src} target="__blank">
                  <img alt={title} src={img.thumbnail} />
                </a>
              </div>
            );
          })}
        </Slider>
      )}
      {hasIframe && (
        <iframe
          data-testid="portfolio-media-iframe"
          className="hidden w-screen max-w-none border-y border-outline-variant md:block"
          {...iframe}
        />
      )}
    </section>
  );
};

export default PortfolioMedia;
