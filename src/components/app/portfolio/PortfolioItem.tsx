import Github from "~/components/icons/Github";
import Next from "~/components/icons/Next";
import { getTechBadgeStyle } from "~/components/portfolio/technologyColors";

function generateId(
  category: string,
  isFeatured: boolean,
  index: number
): string {
  const categoryPrefix =
    category?.toUpperCase().replace(/-/g, "_") || "PROJECT";
  return `ID: ${categoryPrefix}_${isFeatured ? "1" : "0"}x${String(index + 1).padStart(2, "0")}`;
}

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

export function PortfolioItem({
  item,
  variant = "regular", // "featured"
  index,
}) {
  const isFeatured = variant === "featured";

  const id = generateId(item.category || "", isFeatured, index);
  const description = item.whatIDid?.[0] || "";

  return (
    <div className={isFeatured ? featuredCardClassName : regularCardClassName}>
      <a
        href={`/portfolio/${item.slug}`}
        className={cardPageLinkClassName}
        aria-label={item.title}
      />

      {/* Image */}
      <div
        className={`relative overflow-hidden bg-surface-container-lowest ${
          isFeatured
            ? "h-80 md:h-auto md:w-2/5 md:flex-shrink-0"
            : "h-52 rounded-t-2xl"
        }`}
      >
        <img
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          src={item.thumbnail}
          alt={item.title}
        />
      </div>

      {/* Content */}
      <div
        className={`flex flex-1 flex-col justify-between ${
          isFeatured ? "p-6 md:p-8" : ""
        }`}
      >
        {/* Header */}
        <div className={isFeatured ? "mb-4" : ""}>
          {/* ID badge (both variants, styled slightly differently) */}
          <div
            className={`flex items-center justify-between gap-2 ${
              isFeatured
                ? "mb-4"
                : "px-4 py-3 text-xs font-mono text-on-surface-muted"
            }`}
          >
            <span className="rounded bg-primary/20 px-2 py-1 font-mono text-xs uppercase tracking-wider text-primary">
              {id}
            </span>
          </div>

          <div className={isFeatured ? "" : "px-4"}>
            <h2
              className={`font-headline font-semibold text-on-surface ${
                isFeatured ? "mb-3 text-3xl" : "mb-3 text-xl"
              }`}
            >
              <span className={titleClassName}>{item.title}</span>
            </h2>

            {description && (
              <span
                className={`${descriptionClassName} ${
                  isFeatured ? "" : "line-clamp-2 text-sm"
                }`}
              >
                {description}
              </span>
            )}
          </div>
        </div>

        {/* Technologies */}
        {item.technologiesUsed?.length > 0 && (
          <div
            className={`flex flex-wrap gap-2 mt-4 mb-4 ${!isFeatured ? "px-4" : ""}`}
          >
            {item.technologiesUsed.map((tech, idx) => (
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

        {/* Footer */}
        <div
          className={`flex items-center gap-3 ${
            isFeatured ? "" : "border-t border-outline-variant px-4 py-3"
          }`}
        >
          <span
            className={`${viewActionClassName} ${
              isFeatured ? "" : "flex-1 px-3 text-center text-sm"
            }`}
          >
            View
          </span>

          {item.demoUrl && (
            <span className={demoIconClassName} aria-hidden="true">
              <Next className={isFeatured ? "w-6 h-6" : "w-5 h-5"} />
            </span>
          )}

          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={githubActionClassName}
            >
              <Github
                width={isFeatured ? 24 : 20}
                height={isFeatured ? 24 : 20}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
