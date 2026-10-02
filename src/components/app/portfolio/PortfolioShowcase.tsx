import { useTranslation } from "~/i18n/context";
import { type PortfolioFrontmatter } from "~/types/frontmatter";
import { PortfolioItems } from "./PortfolioItems";

interface Props {
  items: PortfolioFrontmatter[];
  hasTitle?: boolean;
  containerClassName?: string;
}

export function PortfolioShowcase({
  items,
  hasTitle = true,
  containerClassName = "container mx-auto max-w-[1536px]",
}: Props) {
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
            <div className="hr-frame-cell">
              <PortfolioItems
                regularItems={regularItems}
                featuredItem={featuredItem}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div data-testid="section-portfolio" className="bg-canvas px-6 py-8">
      <div className={containerClassName}>
        <PortfolioItems
          regularItems={regularItems}
          featuredItem={featuredItem}
        />
      </div>
    </div>
  );
}

export default PortfolioShowcase;
