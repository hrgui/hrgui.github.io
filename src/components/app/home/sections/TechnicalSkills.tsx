import type { JSX } from "preact";

import { technicalSkills as defaultTechnicalSkills } from "~/constants";

type TechnicalSkillSection = (typeof defaultTechnicalSkills)[number];
type TechnicalSkillItem = TechnicalSkillSection["items"][number];

const sectionTitleMap: Record<string, string> = {
  javascript: "JavaScript",
  "html-css": "HTML/CSS",
  other: "Other",
};

const summaryCards = [
  {
    key: "javascript",
    title: "JavaScript",
    subtitle: "LOGIC_ENGINE_V8",
    className: "text-primary",
    accentBorderClassName: "border-primary",
  },
  {
    key: "html-css",
    title: "HTML/CSS",
    subtitle: "STRUCTURAL_UI_CORE",
    className: "text-secondary",
    accentBorderClassName: "border-secondary",
  },
  {
    key: "other",
    title: "JACK OF ALL TRADES",
    subtitle: "OTHER_TECH_SKILLS_I_HAVE",
    className: "text-tertiary",
    accentBorderClassName: "border-tertiary",
  },
];

const getSectionTitle = (section: TechnicalSkillSection, index: number) => {
  if (section.key && sectionTitleMap[section.key]) {
    return sectionTitleMap[section.key];
  }

  if (typeof section.title === "string") {
    return section.title;
  }

  return `Section ${index + 1}`;
};

const countLeafItems = (item: TechnicalSkillItem): number => {
  if (typeof item === "string") {
    return 1;
  }

  return item.items.reduce(
    (total, subItem) => total + countLeafItems(subItem),
    0
  );
};

function TechnicalSection({
  title,
  children,
  className,
  ...props
}: Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> & {
  title: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-outline-variant bg-surface-container-low p-6 ${className ?? ""}`}
      aria-label={title}
      {...props}
    >
      <div className="leading-6 text-on-surface-muted">{children}</div>
    </section>
  );
}

function NestedList({
  depth = 0,
  ...props
}: JSX.HTMLAttributes<HTMLUListElement> & { depth?: number }) {
  const nestedClassName =
    depth === 0
      ? "mt-3 space-y-3"
      : "mt-3 space-y-3 rounded-xl border border-outline-variant bg-surface-container-high/80 p-4";

  return <ul className={nestedClassName} {...props} />;
}

export function TechnicalSkills({
  technicalSkills = defaultTechnicalSkills,
}: {
  technicalSkills?: typeof defaultTechnicalSkills;
}) {
  const summaryCardMap = Object.fromEntries(
    summaryCards.map((card) => [card.key, card])
  );

  const mapTechnicalSkills = (
    item: TechnicalSkillItem,
    index: number,
    depth = 0
  ): JSX.Element => {
    if (typeof item === "string") {
      return (
        <li
          key={index}
          className="rounded-lg border border-transparent py-0.5 pl-4 text-on-surface-muted transition-colors duration-150 ease-out hover:border-outline-variant/60 hover:bg-surface-container"
        >
          <span className="mr-2 text-primary/90">&gt;</span>
          {item}
        </li>
      );
    }

    const { title, items: subitems } = item;
    const leafCount = countLeafItems(item);

    return (
      <li key={index} className="pt-1 text-on-surface">
        <details className="group rounded-xl border border-outline-variant/90 bg-surface-container-high/60 p-3">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-md px-2 py-1 font-medium text-on-surface marker:hidden">
            <span className="pr-2 leading-tight">{title}</span>
            <span className="inline-flex items-center gap-2 text-xs text-on-surface-muted">
              <span className="rounded-full border border-outline-variant px-2 py-0.5 font-mono tracking-[0.08em]">
                {leafCount}
              </span>
              <span className="text-primary transition-transform duration-200 ease-out group-open:rotate-90">
                &gt;
              </span>
            </span>
          </summary>
          <NestedList depth={depth + 1}>
            {subitems.map((subItem, subIndex) =>
              mapTechnicalSkills(subItem, subIndex, depth + 1)
            )}
          </NestedList>
        </details>
      </li>
    );
  };

  return (
    <section
      className="bg-surface px-6 pb-16"
      data-testid="section-technical-skills"
    >
      <div className="container mx-auto">
        <div className="rounded-[2rem] border border-primary/30 dark:border-primary/18 bg-surface-container-lowest px-6 py-8 shadow-floating sm:px-10 sm:py-12">
          <div className="mb-10 flex items-center justify-between">
            <p className="label-mono text-primary">module_01 // tech_stack</p>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-7 w-7 text-primary"
            >
              <path
                d="M12 2l8 4-8 4-8-4 8-4z"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <path
                d="M12 8l8 4-8 4-8-4 8-4z"
                fill="currentColor"
                fillOpacity="0.16"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <path
                d="M12 14l8 4-8 4-8-4 8-4z"
                fill="currentColor"
                fillOpacity="0.12"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="font-headline text-4xl font-semibold text-on-surface sm:text-6xl">
            Core Proficiencies
          </h1>

          <div className="mt-10 space-y-6">
            {technicalSkills?.map((section, index) => {
              const title = getSectionTitle(section, index);
              const card = (section.key && summaryCardMap[section.key]) ||
                summaryCards[index] || {
                  title,
                  subtitle: "TECH_MODULE",
                  className: "text-on-surface",
                  accentBorderClassName: "border-outline",
                };

              return (
                <div
                  key={section.key ?? title}
                  className="rounded-3xl border border-outline-variant/80 bg-surface-container-low/40 p-4 sm:p-6"
                >
                  <div className="grid gap-4 md:grid-cols-[minmax(220px,280px)_1fr] md:items-start md:gap-6">
                    <article
                      className={`relative overflow-hidden p-6 border-solid border-t-0 border-r-0 border-l-0 border-b-2 md:border-b-0 md:border-l-2 ${card.className} ${card.accentBorderClassName}`}
                    >
                      <h2 className="font-headline text-4xl leading-tight sm:text-3xl">
                        {card.title}
                      </h2>
                      <p className="mt-3 font-mono text-sm uppercase tracking-[0.12em] text-on-surface-muted">
                        {card.subtitle}
                      </p>
                    </article>

                    <TechnicalSection title={title} className="mb-0 h-full">
                      <ul className="space-y-3">
                        {section.items?.map((item, itemIndex) =>
                          mapTechnicalSkills(item, itemIndex)
                        )}
                      </ul>
                    </TechnicalSection>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechnicalSkills;
