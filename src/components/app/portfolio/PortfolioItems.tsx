import { GITHUB_URL } from "~/constants";
import { PortfolioItem } from "./PortfolioItem";

// Fill the rest of the last row so the ruled grid never has a hole.
// Literal class names so UnoCSS can see them.
const MD_SPAN = ["md:hidden", "md:block md:col-span-1"];
const LG_SPAN = [
  "lg:hidden",
  "lg:block lg:col-span-2",
  "lg:block lg:col-span-1",
];

export function PortfolioItems({ featuredItem, regularItems }) {
  const count = regularItems?.length ?? 0;
  const mdRemainder = count % 2;
  const lgRemainder = count % 3;
  const showFiller = mdRemainder > 0 || lgRemainder > 0;

  return (
    <div className="hr-frame-grid hr-frame-grid--cards">
      {featuredItem && (
        <PortfolioItem item={featuredItem} variant="featured" index={0} />
      )}

      {regularItems?.map((item, i) => {
        return <PortfolioItem key={i} item={item} index={i} />;
      })}

      {showFiller && (
        <div
          className={`hr-frame-cell hidden ${MD_SPAN[mdRemainder]} ${LG_SPAN[lgRemainder]}`}
        >
          <p className="label-mono mb-3 text-fg-subtle">// more_on_github</p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hr-link"
          >
            See everything else I've shipped
          </a>
        </div>
      )}
    </div>
  );
}
