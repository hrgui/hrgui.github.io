import { PortfolioFrontmatter } from "types/frontmatter";

interface Props {
  items: PortfolioFrontmatter[];
  hasTitle?: boolean;
}

export function PortfolioShowcase({ items, hasTitle = true }: Props) {
  return (
    <div className="p-6 bg-saltpan-200 dark:bg-stone-900 dark:text-gray-200">
      <div className="container mx-auto">
        {hasTitle && (
          <h1 className="text-3xl font-medium mb-8 mt-3">Portfolio</h1>
        )}

        <div className="pt-2 pb-2 overflow-hidden sm:grid sm:grid-cols-3 sm:gap-6">
          {items?.map((item, i) => {
            return (
              <a
                href={`/portfolio/${item.slug}`}
                key={i}
                className=" text-gray-200 block mb-4 hover:text-gray-100 sm:opacity-75 sm:hover:opacity-100 transition-all z-0 w-full h-52 overflow-hidden relative"
              >
                <img
                  className="object-cover absolute h-52 z-10 w-full rounded-lg"
                  loading="lazy"
                  src={item.thumbnail}
                  alt={item.title}
                />
                <h2 className="p-4 z-20 bg-black inline-flex rounded-bl-lg tracking-tight font-semibold text-xl absolute bottom-0 left-0 transition-all">
                  {item.title}
                </h2>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PortfolioShowcase;
