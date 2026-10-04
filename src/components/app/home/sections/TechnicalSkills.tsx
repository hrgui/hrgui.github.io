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
  // Nested items hang off a thin guide line instead of sitting in a box.
  const nestedClassName =
    depth === 0
      ? "border-t border-t-solid border-grid-line"
      : "mb-3 ml-3 border-l border-l-solid border-grid-line pl-4";

  return <ul className={nestedClassName} {...props} />;
}

/**
 * A small terminal that "loads" the stack: one line per skill group with its
 * real skill count. Decorative (it repeats the lists below), so it's hidden
 * from screen readers.
 */
function StackTerminal({
  sections,
  colorFor,
}: {
  sections: TechnicalSkillSection[];
  colorFor: (section: TechnicalSkillSection, index: number) => string;
}) {
  const { t } = useTranslation();
  const rows = sections.map((section, index) => ({
    slug: (section.key ?? `group_${index + 1}`).replace(/-/g, "_"),
    count: (section.items ?? []).reduce(
      (total, item) => total + countLeafItems(item),
      0
    ),
    color: colorFor(section, index),
  }));
  const total = rows.reduce((sum, row) => sum + row.count, 0);

  return (
    <div
      className="hr-code w-full overflow-hidden rounded-xl border border-solid border-border-muted lg:w-[440px]"
      aria-hidden="true"
    >
      <div className="hr-code-bar">
        <span className="hr-dot" />
        <span className="hr-dot" />
        <span className="hr-dot" />
        <span className="ml-2">{t("home.technicalSkills.terminal.file")}</span>
      </div>
      <div className="px-4 py-4 text-sm leading-6 [font-variant-ligatures:none]">
        <p>
          <span className="text-success">$</span>{" "}
          <span className="text-fg">
            {t("home.technicalSkills.terminal.command")}
          </span>
        </p>
        {rows.map((row) => (
          <p key={row.slug} className="flex gap-3">
            <span className="text-fg-subtle">&gt;</span>
            <span className={`w-[12ch] ${row.color}`}>{row.slug}</span>
            <span className="text-fg-muted">
              {row.count} {t("home.technicalSkills.terminal.skills")}
            </span>
          </p>
        ))}
        <p className="text-fg-muted">
          <span className="text-success">✓</span>{" "}
          {t("home.technicalSkills.terminal.summary", {
            groups: rows.length,
            skills: total,
          })}
        </p>
        <p>
          <span className="text-success">$</span>{" "}
          <span className="inline-block animate-cursor-blink text-success">
            ▍
          </span>
        </p>
      </div>
    </div>
  );
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
    // Top-level items are hairline rows (like What I Did and the tech
    // legend); nested items are plain lines under the guide.
    const rowClassName =
      depth === 0 ? "border-b border-b-solid border-grid-line" : "";

    if (typeof item === "string") {
      return (
        <li
          key={index}
          className={`${rowClassName} flex gap-3 px-2 text-fg-muted transition-colors duration-150 ease-out hover:bg-surface-overlay/50 hover:text-fg ${
            depth === 0 ? "py-3" : "py-1.5"
          }`}
        >
          <span className="font-mono text-accent" aria-hidden="true">
            &gt;
          </span>
          {item}
        </li>
      );
    }

    const { title, items: subitems } = item;
    const leafCount = countLeafItems(item);

    return (
      <li key={index} className={`${rowClassName} text-fg`}>
        <details className="group">
          <summary
            className={`flex cursor-pointer list-none items-center justify-between gap-3 px-2 font-semibold text-fg transition-colors duration-150 ease-out marker:hidden hover:bg-surface-overlay/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
              depth === 0 ? "py-3" : "py-1.5"
            }`}
          >
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
          <div className="hr-frame-cell grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="label-mono mb-4 text-accent">
                {t("home.technicalSkills.moduleLabel")}
              </p>
              <h1 className="text-headline text-fg md:text-display-md">
                {t("home.technicalSkills.heading")}
              </h1>
            </div>
            <StackTerminal
              sections={technicalSkills ?? []}
              colorFor={(section, index) =>
                (
                  (section.key && summaryCardMap[section.key]) ||
                  summaryCards[index]
                )?.className ?? "text-fg"
              }
            />
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
                  <NestedList>
                    {section.items?.map((item, itemIndex) =>
                      mapTechnicalSkills(item, itemIndex)
                    )}
                  </NestedList>
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
