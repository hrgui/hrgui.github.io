import { useTranslation } from "~/i18n/context";
import { getTechBadgeStyle } from "~/components/portfolio/technologyColors";
import Github from "~/components/icons/Github";
import Next from "~/components/icons/Next";

const featuredCardClassName =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-solid border-surface-container-low bg-surface-container-low transition-all duration-150 ease-out hover:border-primary/60 focus-within:border-primary/60 focus-within:shadow-floating active:scale-[0.995] md:flex-row";

const regularCardClassName =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-solid border-surface-container-low bg-surface-container-low transition-all duration-150 ease-out hover:border-primary/60 focus-within:border-primary/60 focus-within:shadow-floating active:scale-[0.995]";

const cardPageLinkClassName =
  "absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const titleClassName = "transition-colors group-hover:text-primary";

const descriptionClassName =
  "block text-base leading-relaxed text-on-surface-muted transition-colors group-hover:text-on-surface";

const viewActionClassName =
  "rounded bg-primary/10 px-4 py-2 font-semibold text-primary transition-all duration-150 ease-out group-hover:bg-primary/20";

const demoIconClassName =
  "rounded p-2 text-on-surface-muted transition-colors duration-150 ease-out group-hover:text-primary";

const githubActionClassName =
  "relative z-20 rounded p-2 text-on-surface-muted transition-all duration-150 ease-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-high active:scale-[0.95]";

function generateId(
  category: string,
  isFeatured: boolean,
  index: number
): string {
  const categoryPrefix =
    category?.toUpperCase().replace(/-/g, "_") || "PROJECT";
  return `ID: ${categoryPrefix}_${isFeatured ? "1" : "0"}x${String(index + 1).padStart(2, "0")}`;
}

export function PortfolioItems({ featuredItem, regularItems }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      {/* Featured Item */}
      {featuredItem && (
        <div className={featuredCardClassName}>
          <a
            href={`/portfolio/${featuredItem.slug}`}
            className={cardPageLinkClassName}
            aria-label={t("portfolio.showcase.viewItem", {
              title: featuredItem.title,
            })}
          />
          {/* Image Container */}
          <div className="relative block h-80 w-full overflow-hidden bg-surface-container-lowest md:h-auto md:w-2/5 md:flex-shrink-0">
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              src={featuredItem.thumbnail}
              alt={featuredItem.title}
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
            {/* Header */}
            <div className="mb-4">
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="rounded bg-primary/20 px-2 py-1 font-mono text-xs uppercase tracking-wider text-primary">
                  {generateId(featuredItem.category || "", true, 0)}
                </span>
              </div>
              <h2 className="mb-3 font-headline text-3xl font-semibold text-on-surface">
                <span className={titleClassName}>{featuredItem.title}</span>
              </h2>
              {featuredItem.whatIDid?.[0] && (
                <span className={descriptionClassName}>
                  {featuredItem.whatIDid[0]}
                </span>
              )}
            </div>

            {/* Technologies */}
            {featuredItem.technologiesUsed &&
              featuredItem.technologiesUsed.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {featuredItem.technologiesUsed.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded border px-2 py-1 font-mono text-xs uppercase tracking-wider"
                      style={getTechBadgeStyle(tech.type, idx)}
                    >
                      {tech.type}
                    </span>
                  ))}
                </div>
              )}

            {/* Footer with Links */}
            <div className="flex items-center gap-3">
              <span className={viewActionClassName}>
                {t("portfolio.showcase.viewAction")}
              </span>
              {featuredItem.demoUrl && (
                <span className={demoIconClassName} aria-hidden="true">
                  <Next className="w-6 h-6" />
                </span>
              )}
              {featuredItem.githubUrl && (
                <a
                  href={featuredItem.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={githubActionClassName}
                  title={t("portfolio.showcase.viewOnGithub")}
                >
                  <Github width={24} height={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Regular Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {regularItems?.map((item, i) => {
          const id = generateId(item.category || "", false, i);
          const description = item.whatIDid?.[0] || "";

          return (
            <div key={i} className={regularCardClassName}>
              <a
                href={`/portfolio/${item.slug}`}
                className={cardPageLinkClassName}
                aria-label={t("portfolio.showcase.viewItem", {
                  title: item.title,
                })}
              />
              {/* Image Container */}
              <div className="relative block h-52 w-full overflow-hidden rounded-t-2xl bg-surface-container-lowest">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  src={item.thumbnail}
                  alt={item.title}
                />
              </div>

              {/* Header with ID and Status Badge */}
              <div className="flex items-center justify-between gap-2 px-4 py-3 text-xs font-mono text-on-surface-muted">
                <span className="rounded bg-primary/20 px-2 py-1 uppercase tracking-wider text-primary">
                  {id}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                <h2 className="font-headline text-xl font-semibold text-on-surface">
                  <span className={titleClassName}>{item.title}</span>
                </h2>

                {description && (
                  <span
                    className={`${descriptionClassName} line-clamp-2 text-sm`}
                  >
                    {description}
                  </span>
                )}

                {/* Technologies */}
                {item.technologiesUsed && item.technologiesUsed.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.technologiesUsed.map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded border font-mono px-2 py-1 text-xs uppercase tracking-wider"
                        style={getTechBadgeStyle(tech.type, idx)}
                      >
                        {tech.type}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer with Links */}
              <div className="flex items-center gap-3 border-t border-outline-variant px-4 py-3">
                <span
                  className={`${viewActionClassName} flex-1 px-3 text-center text-sm`}
                >
                  {t("portfolio.showcase.viewAction")}
                </span>
                {item.demoUrl && (
                  <span className={demoIconClassName} aria-hidden="true">
                    <Next className="w-5 h-5" />
                  </span>
                )}
                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={githubActionClassName}
                    title={t("portfolio.showcase.viewOnGithub")}
                  >
                    <Github width={20} height={20} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
