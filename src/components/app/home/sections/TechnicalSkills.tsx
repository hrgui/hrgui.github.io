import { JSX } from "preact";

import { technicalSkills as defaultTechnicalSkills } from "~/constants";

function TechnicalSection({
  title,
  children,
  ...props
}: Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> & {
  title: JSX.Element | string;
}) {
  return (
    <section className="mt-8 mb-8 pb-8" {...props}>
      <h2 className="text-3xl">{title}</h2>
      <div className="pt-8 leading-6">{children}</div>
    </section>
  );
}

function NestedList(props: JSX.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className="border-l-2 border-gray-700 pl-4 pt-4 pb-4 mt-2 mb-2"
      {...props}
    />
  );
}

export function TechnicalSkills({
  technicalSkills = defaultTechnicalSkills,
}: {
  technicalSkills?: typeof defaultTechnicalSkills;
}) {
  const mapTechnicalSkills = (item, index) => {
    if (typeof item === "string") {
      return <li key={index}>{item}</li>;
    }

    const { title, items: subitems } = item;

    return (
      <li key={index}>
        {title}
        <NestedList>{subitems.map(mapTechnicalSkills)}</NestedList>
      </li>
    );
  };

  return (
    <section
      className="p-6 pt-16 pb-16 bg-malibu-200 dark:bg-stone-900 dark:text-gray-100"
      data-testid="section-technical-skills"
    >
      <div className="container mx-auto">
        <h4 className="uppercase tracking-widest mb-3 text-gray-600 dark:text-gray-300">
          Experience... I Have.
        </h4>
        <h1 className="text-3xl font-medium dark:text-gray-200">
          Technical Skills
        </h1>
        <div className="sm:grid sm:grid-cols-3 sm:gap-8">
          {technicalSkills?.map(({ key, title, items }) => {
            return (
              <TechnicalSection title={title} key={key}>
                <ul>{items?.map(mapTechnicalSkills)}</ul>
              </TechnicalSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TechnicalSkills;
