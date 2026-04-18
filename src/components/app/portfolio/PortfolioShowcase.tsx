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
  const sectionClassName = hasTitle
    ? "bg-surface px-6 pb-12 pt-8"
    : "bg-surface px-6 py-8";

  return (
    <div data-testid="section-portfolio" className={sectionClassName}>
      <div className={containerClassName}>
        {hasTitle && (
          <div className="mb-8 rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
            <p className="label-mono mb-2 text-primary">
              {t("portfolio.showcase.moduleLabel")}
            </p>
            <h1 className="font-headline text-4xl font-semibold text-on-surface">
              {t("portfolio.showcase.heading")}
            </h1>
            <p className="mt-3 text-on-surface-muted">
              {t("portfolio.showcase.description")}
            </p>

            <div className="mt-8">
              <PortfolioItems
                regularItems={regularItems}
                featuredItem={featuredItem}
              />
            </div>
          </div>
        )}

        {!hasTitle && (
          <PortfolioItems
            regularItems={regularItems}
            featuredItem={featuredItem}
          />
        )}
      </div>
    </div>
  );
}

export default PortfolioShowcase;
