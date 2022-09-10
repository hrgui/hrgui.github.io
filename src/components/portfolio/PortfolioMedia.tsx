import { PortfolioFrontmatter } from "types/frontmatter";
import Slider from "~/components/portfolio/Slider/Slider";

type Props = Pick<
  PortfolioFrontmatter,
  "images" | "thumbnail" | "title" | "iframe"
>;

const PortfolioMedia = ({ images, thumbnail, title, iframe }: Props) => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 pt-4 pb-4">
      {thumbnail && !images && (
        <div className="md:hidden" data-testid="portfolio-media-thumbnail">
          <img className="w-screen" alt={title} src={thumbnail} />
        </div>
      )}
      {images && (
        <Slider data-testid="portfolio-media-slider">
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
      {iframe && (
        <iframe
          data-testid="portfolio-media-iframe"
          className="hidden md:block w-full"
          {...iframe}
        />
      )}
    </div>
  );
};

export default PortfolioMedia;
