import { type PortfolioFrontmatter } from "types/frontmatter";

type Props = Pick<PortfolioFrontmatter, "whatIDid">;

const WhatIDid = ({ whatIDid }: Props) => {
  return (
    <div>
      <h3 className="mb-6 font-headline text-2xl font-semibold text-on-surface md:text-4xl">
        What I Did
      </h3>
      <ul className="space-y-3">
        {whatIDid.map((bullet, i) => (
          <li
            key={i}
            className="rounded-lg border border-outline-variant bg-surface-container-high px-4 py-3 text-on-surface-muted"
          >
            <span className="mr-2 text-primary">&gt;</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatIDid;
