import type { JSX } from "preact";
import { useTranslation } from "~/i18n/context";

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
    titleKey: "home.technicalSkills.javascript.title",
    subtitleKey: "home.technicalSkills.javascript.subtitle",
    className: "text-accent",
  },
  {
    key: "html-css",
    titleKey: "home.technicalSkills.htmlCss.title",
    subtitleKey: "home.technicalSkills.htmlCss.subtitle",
    className: "text-success",
  },
  {
    key: "other",
    titleKey: "home.technicalSkills.other.title",
    subtitleKey: "home.technicalSkills.other.subtitle",
    className: "text-coral",
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
      className={`hr-frame-cell ${className ?? ""}`}
      aria-label={title}
      {...props}
    >
      <div className="leading-6 text-fg-muted">{children}</div>
    </section>
  );
}

function NestedList({
  depth = 0,
  ...props
}: JSX.HTMLAttributes<HTMLUListElement> & { depth?: number }) {
  const nestedClassName =
    depth === 0
      ? "mt-2 space-y-1"
      : "mt-2 space-y-1 border-l border-l-solid border-border-muted pl-3";

  return <ul className={nestedClassName} {...props} />;
}

export function TechnicalSkills({
  technicalSkills = defaultTechnicalSkills,
}: {
  technicalSkills?: typeof defaultTechnicalSkills;
}) {
  const { t } = useTranslation();
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
          className="rounded-sm px-3 py-1 text-fg-muted transition-colors duration-150 ease-out hover:bg-surface-overlay hover:text-fg"
        >
          <span className="mr-2 font-mono text-accent">&gt;</span>
          {item}
        </li>
      );
    }

    const { title, items: subitems } = item;
    const leafCount = countLeafItems(item);

    return (
      <li key={index} className="pt-1 text-fg">
        <details className="group rounded-lg border border-solid border-border-muted bg-surface p-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm px-2 py-1 font-semibold text-fg marker:hidden hr-focus-ring">
            <span className="pr-2 leading-tight">{title}</span>
            <span className="inline-flex items-center gap-2 text-xs text-fg-muted">
              <span className="rounded-full px-2 py-0.5 font-mono shadow-[inset_0_0_0_1px_var(--color-border)]">
                {leafCount}
              </span>
              <span className="font-mono text-accent transition-transform duration-200 ease-out group-open:rotate-90">
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
    <section className="hr-frame" data-testid="section-technical-skills">
      <div className="hr-frame-col">
        <div className="hr-frame-grid">
          <div className="hr-frame-cell flex items-end justify-between gap-6">
            <div>
              <p className="label-mono mb-4 text-accent">
                {t("home.technicalSkills.moduleLabel")}
              </p>
              <h1 className="text-headline text-fg md:text-display-md">
                {t("home.technicalSkills.heading")}
              </h1>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="hidden h-8 w-8 shrink-0 text-accent sm:block"
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

          {technicalSkills?.map((section, index) => {
            const title = getSectionTitle(section, index);
            const card = (section.key && summaryCardMap[section.key]) ||
              summaryCards[index] || {
                titleKey: undefined,
                subtitleKey: undefined,
                className: "text-fg",
              };
            const cardTitle = card.titleKey ? t(card.titleKey) : title;
            const cardSubtitle = card.subtitleKey
              ? t(card.subtitleKey)
              : "TECH_MODULE";

            return (
              <div
                key={section.key ?? title}
                className="hr-frame-grid hr-frame-grid--aside"
              >
                <article className="hr-frame-cell">
                  <h2
                    className={`text-title-lg md:text-headline ${card.className}`}
                  >
                    {cardTitle}
                  </h2>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">
                    {cardSubtitle}
                  </p>
                </article>

                <TechnicalSection title={title}>
                  <ul className="space-y-1">
                    {section.items?.map((item, itemIndex) =>
                      mapTechnicalSkills(item, itemIndex)
                    )}
                  </ul>
                </TechnicalSection>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TechnicalSkills;
