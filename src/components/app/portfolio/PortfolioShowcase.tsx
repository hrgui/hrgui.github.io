import { type PortfolioFrontmatter } from "types/frontmatter";

interface Props {
  items: PortfolioFrontmatter[];
  hasTitle?: boolean;
}

export function PortfolioShowcase({ items, hasTitle = true }: Props) {
  return (
    <div data-testid="section-portfolio" className="bg-surface px-6 py-8">
      <div className="container mx-auto">
        <div className="rounded-3xl border border-outline-variant bg-surface-container-low p-6 sm:p-8">
          {hasTitle && (
            <>
              <p className="label-mono mb-2 text-primary">
                module_03 // portfolio
              </p>
              <h1 className="mb-8 mt-3 font-headline text-4xl font-semibold text-on-surface">
                Portfolio
              </h1>
            </>
          )}

          <div className="overflow-hidden pt-2 pb-2 sm:grid sm:grid-cols-3 sm:gap-6">
            {items?.map((item, i) => {
              return (
                <a
                  href={`/portfolio/${item.slug}`}
                  key={i}
                  className="group relative mb-4 block h-52 w-full overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-high transition-all hover:border-primary"
                >
                  <img
                    className="absolute z-10 h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-surface-container-lowest to-transparent" />
                  <h2 className="absolute bottom-0 left-0 z-30 inline-flex rounded-tr-xl bg-surface-container-lowest px-4 py-3 font-headline text-xl font-semibold tracking-tight text-on-surface transition-colors group-hover:text-primary">
                    {item.title}
                  </h2>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioShowcase;
