import { type PortfolioFrontmatter } from "types/frontmatter";
import Github from "~/components/icons/Github";
import Next from "~/components/icons/Next";

interface Props {
  items: PortfolioFrontmatter[];
  hasTitle?: boolean;
}

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
  const containerClassName = hasTitle ? "container mx-auto" : "w-full";

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
            <p className="mt-3 max-w-2xl text-on-surface-muted">
              Built in the digital underground: apps, UI experiments, and
              creative code modules I designed and shipped, from React tools to
              interactive front-end prototypes.
            </p>

            <div className="mt-8">
              <div className="space-y-6">
                {/* Featured Item */}
                {featuredItem && (
                  <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-high transition-all hover:border-primary md:flex-row">
                    {/* Image Container */}
                    <a
                      href={`/portfolio/${featuredItem.slug}`}
                      className="relative block h-80 w-full overflow-hidden bg-surface-container-lowest md:h-auto md:w-2/5 md:flex-shrink-0"
                    >
                      <img
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        src={featuredItem.thumbnail}
                        alt={featuredItem.title}
                      />
                    </a>

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
                          <a
                            href={`/portfolio/${featuredItem.slug}`}
                            className="transition-colors hover:text-primary"
                          >
                            {featuredItem.title}
                          </a>
                        </h2>
                        {featuredItem.whatIDid?.[0] && (
                          <a
                            href={`/portfolio/${featuredItem.slug}`}
                            className="block text-base leading-relaxed text-on-surface-muted transition-colors hover:text-on-surface"
                          >
                            {featuredItem.whatIDid[0]}
                          </a>
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
                        <a
                          href={`/portfolio/${featuredItem.slug}`}
                          className="rounded bg-primary/10 px-4 py-2 font-semibold text-primary transition-colors hover:bg-primary/20"
                        >
                          View
                        </a>
                        {featuredItem.demoUrl && (
                          <a
                            href={featuredItem.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded p-2 text-on-surface-muted transition-colors hover:text-primary"
                            title="Open Demo"
                          >
                            <Next className="w-6 h-6" />
                          </a>
                        )}
                        {featuredItem.githubUrl && (
                          <a
                            href={featuredItem.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded p-2 text-on-surface-muted transition-colors hover:text-primary"
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
                      <div
                        key={i}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-high transition-all hover:border-primary"
                      >
                        {/* Image Container */}
                        <a
                          href={`/portfolio/${item.slug}`}
                          className="relative block h-52 w-full overflow-hidden rounded-t-2xl bg-surface-container-lowest"
                        >
                          <img
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        </a>

                        {/* Header with ID and Status Badge */}
                        <div className="flex items-center justify-between gap-2 px-4 py-3 text-xs font-mono text-on-surface-muted">
                          <span className="rounded bg-primary/20 px-2 py-1 uppercase tracking-wider text-primary">
                            {id}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                          <h2 className="font-headline text-xl font-semibold text-on-surface">
                            <a
                              href={`/portfolio/${item.slug}`}
                              className="transition-colors hover:text-primary"
                            >
                              {item.title}
                            </a>
                          </h2>

                          {description && (
                            <a
                              href={`/portfolio/${item.slug}`}
                              className="line-clamp-2 block text-sm leading-relaxed text-on-surface-muted transition-colors hover:text-on-surface"
                            >
                              {description}
                            </a>
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
                          <a
                            href={`/portfolio/${item.slug}`}
                            className="flex-1 rounded bg-primary/10 px-3 py-2 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                          >
                            View
                          </a>
                          {item.demoUrl && (
                            <a
                              href={item.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded p-2 text-on-surface-muted transition-colors hover:text-primary"
                              title="Open Demo"
                            >
                              <Next className="w-5 h-5" />
                            </a>
                          )}
                          {item.githubUrl && (
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded p-2 text-on-surface-muted transition-colors hover:text-primary"
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
            </div>
          </div>
        )}

        {!hasTitle && (
          <div className="space-y-6">
            {/* Featured Item */}
            {featuredItem && (
              <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-high transition-all hover:border-primary md:flex-row">
                {/* Image Container */}
                <a
                  href={`/portfolio/${featuredItem.slug}`}
                  className="relative block h-80 w-full overflow-hidden bg-surface-container-lowest md:h-auto md:w-2/5 md:flex-shrink-0"
                >
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    src={featuredItem.thumbnail}
                    alt={featuredItem.title}
                  />
                </a>

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
                      <a
                        href={`/portfolio/${featuredItem.slug}`}
                        className="transition-colors hover:text-primary"
                      >
                        {featuredItem.title}
                      </a>
                    </h2>
                    {featuredItem.whatIDid?.[0] && (
                      <a
                        href={`/portfolio/${featuredItem.slug}`}
                        className="block text-base leading-relaxed text-on-surface-muted transition-colors hover:text-on-surface"
                      >
                        {featuredItem.whatIDid[0]}
                      </a>
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
                    <a
                      href={`/portfolio/${featuredItem.slug}`}
                      className="rounded bg-primary/10 px-4 py-2 font-semibold text-primary transition-colors hover:bg-primary/20"
                    >
                      View
                    </a>
                    {featuredItem.demoUrl && (
                      <a
                        href={featuredItem.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded p-2 text-on-surface-muted transition-colors hover:text-primary"
                        title="Open Demo"
                      >
                        <Next className="w-6 h-6" />
                      </a>
                    )}
                    {featuredItem.githubUrl && (
                      <a
                        href={featuredItem.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded p-2 text-on-surface-muted transition-colors hover:text-primary"
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
                  <div
                    key={i}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-high transition-all hover:border-primary"
                  >
                    {/* Image Container */}
                    <a
                      href={`/portfolio/${item.slug}`}
                      className="relative block h-52 w-full overflow-hidden rounded-t-2xl bg-surface-container-lowest"
                    >
                      <img
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        src={item.thumbnail}
                        alt={item.title}
                      />
                    </a>

                    {/* Header with ID and Status Badge */}
                    <div className="flex items-center justify-between gap-2 px-4 py-3 text-xs font-mono text-on-surface-muted">
                      <span className="rounded bg-primary/20 px-2 py-1 uppercase tracking-wider text-primary">
                        {id}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                      <h2 className="font-headline text-xl font-semibold text-on-surface">
                        <a
                          href={`/portfolio/${item.slug}`}
                          className="transition-colors hover:text-primary"
                        >
                          {item.title}
                        </a>
                      </h2>

                      {description && (
                        <a
                          href={`/portfolio/${item.slug}`}
                          className="line-clamp-2 block text-sm leading-relaxed text-on-surface-muted transition-colors hover:text-on-surface"
                        >
                          {description}
                        </a>
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
                      <a
                        href={`/portfolio/${item.slug}`}
                        className="flex-1 rounded bg-primary/10 px-3 py-2 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                      >
                        View
                      </a>
                      {item.demoUrl && (
                        <a
                          href={item.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded p-2 text-on-surface-muted transition-colors hover:text-primary"
                          title="Open Demo"
                        >
                          <Next className="w-5 h-5" />
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded p-2 text-on-surface-muted transition-colors hover:text-primary"
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
