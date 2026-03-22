import type { JSX } from "preact";

import { threeSellPoints as defaultThreeSellPoints } from "~/constants";

type ItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  title: string;
};

function Item({ title, children, ...props }: ItemProps) {
  return (
    <div
      className="surface-module-raised mb-6 rounded-3xl border border-outline-variant p-6"
      {...props}
    >
      <p className="label-mono mb-3 text-primary">core</p>
      <h2 className="mb-3 font-headline font-semibold text-2xl leading-tight text-on-surface">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-on-surface-muted">
        {children}
      </p>
    </div>
  );
}

export function ThreeSellPoints({
  threeSellPoints = defaultThreeSellPoints,
}: {
  threeSellPoints?: typeof defaultThreeSellPoints;
}) {
  return (
    <section
      className="bg-surface px-6 pb-16 pt-16"
      data-testid="section-three-sell-points"
    >
      <div className="container mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
        {threeSellPoints.map(({ title, description }) => {
          return (
            <Item key={title} title={title}>
              {description}
            </Item>
          );
        })}
      </div>
    </section>
  );
}

export default ThreeSellPoints;
