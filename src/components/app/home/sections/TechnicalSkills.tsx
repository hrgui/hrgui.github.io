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
    title: "JavaScript",
    subtitle: "LOGIC_ENGINE_V8",
    className: "border-l-4 border-l-primary text-primary",
  },
  {
    title: "HTML/CSS",
    subtitle: "STRUCTURAL_UI_CORE",
    className: "border-l-4 border-l-secondary text-secondary",
  },
  {
    title: "JACK OF ALL TRADES",
    subtitle: "OTHER_TECH_SKILLS_I_HAVE",
    className: "border-l-4 border-l-tertiary text-tertiary",
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

function TechnicalSection({
  title,
  children,
  ...props
}: Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> & {
  title: string;
}) {
  return (
    <section
      className="mt-8 mb-8 rounded-3xl border border-outline-variant bg-surface-container-low p-6"
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
      ? "mt-3 space-y-2"
      : "mt-3 space-y-2 rounded-xl border border-outline-variant bg-surface-container-high p-4";

  return <ul className={nestedClassName} {...props} />;
}

export function TechnicalSkills({
  technicalSkills = defaultTechnicalSkills,
}: {
  technicalSkills?: typeof defaultTechnicalSkills;
}) {
  const mapTechnicalSkills = (
    item: TechnicalSkillItem,
    index: number,
    depth = 0
  ): JSX.Element => {
    if (typeof item === "string") {
      return (
        <li key={index} className="pl-4 text-on-surface-muted">
          <span className="mr-2 text-primary">&gt;</span>
          {item}
        </li>
      );
    }

    const { title, items: subitems } = item;

    return (
      <li key={index} className="pt-1 text-on-surface">
        <p className="pl-4 font-medium text-on-surface">{title}</p>
        <NestedList depth={depth + 1}>
          {subitems.map((subItem, subIndex) =>
            mapTechnicalSkills(subItem, subIndex, depth + 1)
          )}
        </NestedList>
      </li>
    );
  };

  return (
    <section
      className="bg-surface px-6 pb-16"
      data-testid="section-technical-skills"
    >
      <div className="container mx-auto">
        <div className="rounded-[2rem] border border-primary/35 bg-surface-container-lowest px-6 py-8 shadow-floating sm:px-10 sm:py-12">
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

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {summaryCards.map((card) => (
              <article
                key={card.title}
                className={`rounded-2xl bg-surface-container-high p-6 ${card.className}`}
              >
                <h2 className="font-headline text-4xl leading-tight sm:text-3xl">
                  {card.title}
                </h2>
                <p className="mt-3 font-mono text-sm uppercase tracking-[0.12em] text-on-surface-muted">
                  {card.subtitle}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 sm:grid sm:grid-cols-3 sm:gap-8">
            {technicalSkills?.map((section, index) => {
              const title = getSectionTitle(section, index);

              return (
                <TechnicalSection title={title} key={section.key ?? title}>
                  <ul>
                    {section.items?.map((item, itemIndex) =>
                      mapTechnicalSkills(item, itemIndex)
                    )}
                  </ul>
                </TechnicalSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechnicalSkills;
