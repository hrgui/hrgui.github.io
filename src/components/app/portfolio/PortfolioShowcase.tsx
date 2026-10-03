import { useTranslation } from "~/i18n/context";
import { type PortfolioFrontmatter } from "~/types/frontmatter";
import { PortfolioItems } from "./PortfolioItems";

interface Props {
  items: PortfolioFrontmatter[];
  hasTitle?: boolean;
  /** @deprecated the grid now follows the shared frame column */
  containerClassName?: string;
}

export function PortfolioShowcase({ items, hasTitle = true }: Props) {
  const { t } = useTranslation();
  const featuredItem = items?.find((item) => item.featured);
  const regularItems = items?.filter((item) => !item.featured);
  if (hasTitle) {
    return (
      <section className="hr-frame" data-testid="section-portfolio">
        <div className="hr-frame-col">
          <div className="hr-frame-grid">
            <div className="hr-frame-cell">
              <p className="label-mono mb-4 text-coral">
                {t("portfolio.showcase.moduleLabel")}
              </p>
              <h1 className="text-headline text-fg md:text-display-md">
                {t("portfolio.showcase.heading")}
              </h1>
              <p className="mt-4 max-w-[60ch] text-lead text-fg-muted">
                {t("portfolio.showcase.description")}
              </p>
            </div>
            <PortfolioItems
              regularItems={regularItems}
              featuredItem={featuredItem}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-testid="section-portfolio" className="hr-frame">
      <div className="hr-frame-col">
        <PortfolioItems
          regularItems={regularItems}
          featuredItem={featuredItem}
        />
      </div>
    </section>
  );
}

export default PortfolioShowcase;
