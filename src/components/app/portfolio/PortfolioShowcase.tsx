import { type PortfolioFrontmatter } from "types/frontmatter";
import Github from "~/components/icons/Github";
import Next from "~/components/icons/Next";

interface Props {
  items: PortfolioFrontmatter[];
  hasTitle?: boolean;
}

const featuredCardClassName =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-high transition-all duration-150 ease-out hover:border-primary/70 hover:bg-surface-container focus-within:border-primary/70 focus-within:shadow-floating md:flex-row";

const regularCardClassName =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-high transition-all duration-150 ease-out hover:border-primary/70 hover:bg-surface-container focus-within:border-primary/70 focus-within:shadow-floating";

const cardPageLinkClassName =
  "absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-high";

const titleClassName = "transition-colors group-hover:text-primary";

const descriptionClassName =
  "block text-base leading-relaxed text-on-surface-muted transition-colors group-hover:text-on-surface";

const viewActionClassName =
  "rounded bg-primary/10 px-4 py-2 font-semibold text-primary transition-all duration-150 ease-out group-hover:bg-primary/20";

const demoIconClassName =
  "rounded p-2 text-on-surface-muted transition-colors duration-150 ease-out group-hover:text-primary";

const githubActionClassName =
  "relative z-20 rounded p-2 text-on-surface-muted transition-all duration-150 ease-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-high active:scale-[0.95]";

function generateId(category: string, title: string, index: number): string {
  const categoryPrefix =
    category?.toUpperCase().replace(/-/g, "_") || "PROJECT";
  return `ID: ${categoryPrefix}_0x${String(index + 1).padStart(2, "0")}`;
}

export function PortfolioShowcase({ items, hasTitle = true }: Props) {
  const featuredItem = items?.find((item) => item.featured);
  const regularItems = items?.filter((item) => !item.featured);
  const sectionClassName = hasTitle
    ? "bg-surface  px-6 pb-12 pt-8"
    : "bg-surface px-6 py-8";
  const containerClassName = "container mx-auto max-w-[1536px]";

  return (
    <div data-testid="section-portfolio" className={sectionClassName}>
      <div className={containerClassName}>
        {hasTitle && (
          <div className="mb-8 rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
            <p className="label-mono mb-2 text-primary">
              module_03 // portfolio
            </p>
            <h1 className="font-headline text-4xl font-semibold text-on-surface">
              Portfolio
            </h1>
            <p className="mt-3 text-on-surface-muted">
              Built in the digital underground: apps, UI experiments, and
              creative code modules I designed and shipped, from React tools to
              interactive front-end prototypes.
            </p>

            <div className="mt-8">
              <div className="space-y-6">
                {/* Featured Item */}
                {featuredItem && (
                  <div className={featuredCardClassName}>
                    <a
                      href={`/portfolio/${featuredItem.slug}`}
                      className={cardPageLinkClassName}
                      aria-label={`View ${featuredItem.title}`}
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
                            {generateId(
                              featuredItem.category || "",
                              featuredItem.title || "",
                              0
                            )}
                          </span>
                        </div>
                        <h2 className="mb-3 font-headline text-3xl font-semibold text-on-surface">
                          <span className={titleClassName}>
                            {featuredItem.title}
                          </span>
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
                                className="rounded bg-secondary/20 px-2 py-1 font-mono text-xs uppercase tracking-wider text-secondary"
                              >
                                {tech.type}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* Footer with Links */}
                      <div className="flex items-center gap-3">
                        <span className={viewActionClassName}>View</span>
                        {featuredItem.demoUrl && (
                          <span
                            className={demoIconClassName}
                            aria-hidden="true"
                          >
                            <Next className="w-6 h-6" />
                          </span>
                        )}
                        {featuredItem.githubUrl && (
                          <a
                            href={featuredItem.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={githubActionClassName}
                            aria-label="View on Github"
                            title="View on GitHub"
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
                    const id = generateId(
                      item.category || "",
                      item.title || "",
                      i
                    );
                    const description = item.whatIDid?.[0] || "";

                    return (
                      <div key={i} className={regularCardClassName}>
                        <a
                          href={`/portfolio/${item.slug}`}
                          className={cardPageLinkClassName}
                          aria-label={`View ${item.title}`}
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
                          {item.technologiesUsed &&
                            item.technologiesUsed.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {item.technologiesUsed.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="rounded bg-secondary/20 px-2 py-1 text-xs uppercase tracking-wider text-secondary"
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
                            View
                          </span>
                          {item.demoUrl && (
                            <span
                              className={demoIconClassName}
                              aria-hidden="true"
                            >
                              <Next className="w-5 h-5" />
                            </span>
                          )}
                          {item.githubUrl && (
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={githubActionClassName}
                              title="View on GitHub"
                              aria-label="View on GitHub"
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
            </div>
          </div>
        )}

        {!hasTitle && (
          <div className="space-y-6">
            {/* Featured Item */}
            {featuredItem && (
              <div className={featuredCardClassName}>
                <a
                  href={`/portfolio/${featuredItem.slug}`}
                  className={cardPageLinkClassName}
                  aria-label={`View ${featuredItem.title}`}
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
                        {generateId(
                          featuredItem.category || "",
                          featuredItem.title || "",
                          0
                        )}
                      </span>
                    </div>
                    <h2 className="mb-3 font-headline text-3xl font-semibold text-on-surface">
                      <span className={titleClassName}>
                        {featuredItem.title}
                      </span>
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
                            className="rounded bg-secondary/20 px-2 py-1 font-mono text-xs uppercase tracking-wider text-secondary"
                          >
                            {tech.type}
                          </span>
                        ))}
                      </div>
                    )}

                  {/* Footer with Links */}
                  <div className="flex items-center gap-3">
                    <span className={viewActionClassName}>View</span>
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
                        title="View on GitHub"
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
                const id = generateId(item.category || "", item.title || "", i);
                const description = item.whatIDid?.[0] || "";

                return (
                  <div key={i} className={regularCardClassName}>
                    <a
                      href={`/portfolio/${item.slug}`}
                      className={cardPageLinkClassName}
                      aria-label={`View ${item.title}`}
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
                      {item.technologiesUsed &&
                        item.technologiesUsed.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.technologiesUsed.map((tech, idx) => (
                              <span
                                key={idx}
                                className="rounded bg-secondary/20 px-2 py-1 text-xs uppercase tracking-wider text-secondary"
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
                        View
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
                          title="View on GitHub"
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
        )}
      </div>
    </div>
  );
}

export default PortfolioShowcase;
