import Github from "~/components/icons/Github";
import { getTechColor } from "~/components/portfolio/technologyColors";

function generateId(
  category: string,
  isFeatured: boolean,
  index: number
): string {
  const categoryPrefix =
    category?.toUpperCase().replace(/-/g, "_") || "PROJECT";
  return `${categoryPrefix}_${isFeatured ? "1" : "0"}x${String(index + 1).padStart(2, "0")}`;
}

export function PortfolioItem({
  item,
  variant = "regular", // "featured"
  index,
}) {
  const isFeatured = variant === "featured";

  const id = generateId(item.category || "", isFeatured, index);
  const description = item.whatIDid?.[0] || "";

  return (
    <article
      className={`hr-frame-cell hr-frame-cell--bleed group relative ${
        isFeatured ? "hr-project--featured col-span-full" : ""
      }`}
    >
      <a
        href={`/portfolio/${item.slug}`}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        aria-label={`View ${item.title}`}
      />

      <div className="hr-project-copy flex flex-col items-start pr-6 md:pr-12">
        <p className="label-mono mb-4 text-fg-subtle">
          {isFeatured ? "★ featured // " : "> "}
          {id}
        </p>

        <h2
          className={`text-fg transition-colors duration-150 group-hover:text-accent ${
            isFeatured ? "text-headline" : "text-title-lg"
          }`}
        >
          {item.title}
        </h2>

        {description && (
          <p
            className={`mt-3 text-fg-muted ${
              isFeatured ? "max-w-[46ch] text-lead" : "line-clamp-2"
            }`}
          >
            {description}
          </p>
        )}

        {item.technologiesUsed?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.technologiesUsed.map((tech, idx) => (
              <li
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-sm border border-solid border-border-muted px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-fg-muted"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: getTechColor(tech.type, idx) }}
                  aria-hidden="true"
                />
                {tech.type}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex h-[3.25rem] items-end gap-4">
          <div className="flex h-7 items-center gap-4">
            <span className="hr-link">View project</span>
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} on GitHub`}
                className="relative z-20 rounded-md p-1 text-fg-muted transition-colors duration-150 hover:bg-surface-overlay hover:text-fg hr-focus-ring"
              >
                <Github width={20} height={20} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>

      {item.thumbnail && (
        <div className="hr-frame-media">
          <img
            className="h-full w-full object-cover object-left-top transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            src={item.thumbnail}
            alt=""
          />
        </div>
      )}
    </article>
  );
}
