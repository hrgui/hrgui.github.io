import { PortfolioItem } from "./PortfolioItem";

export function PortfolioItems({ featuredItem, regularItems }) {
  return (
    <div className="space-y-6">
      {/* Featured Item */}
      {featuredItem && (
        <PortfolioItem item={featuredItem} variant="featured" index={0} />
      )}

      {/* Regular Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {regularItems?.map((item, i) => {
          return <PortfolioItem key={i} item={item} index={i} />;
        })}
      </div>
    </div>
  );
}
