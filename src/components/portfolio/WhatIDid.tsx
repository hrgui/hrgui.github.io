import { useTranslation } from "~/i18n/context";

import { type PortfolioFrontmatter } from "~/types/frontmatter";

type Props = Pick<PortfolioFrontmatter, "whatIDid">;

const WhatIDid = ({ whatIDid }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className="mb-6 text-headline text-fg">
        {t("portfolio.whatIDid.heading")}
      </h3>
      <ul className="border-t border-t-solid border-border-muted">
        {whatIDid.map((bullet, i) => (
          <li
            key={i}
            className="flex gap-3 border-b border-b-solid border-border-muted py-3 text-fg-muted"
          >
            <span className="font-mono text-accent" aria-hidden="true">
              &gt;
            </span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatIDid;
