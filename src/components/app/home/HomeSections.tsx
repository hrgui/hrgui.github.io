import { I18nProvider } from "~/i18n/context";
import { type PortfolioFrontmatter } from "~/types/frontmatter";

import { Hero } from "./sections/Hero";
import { ThreeSellPoints } from "./sections/ThreeSellPoints";
import { TechnicalSkills } from "./sections/TechnicalSkills";
import { Education } from "./sections/Education";
import { PortfolioShowcase } from "~/components/app/portfolio/PortfolioShowcase";

interface Props {
  locale?: string;
  items: PortfolioFrontmatter[];
  containerClassName?: string;
}

export function HomeSections({
  locale = "en",
  items,
  containerClassName,
}: Props) {
  return (
    <I18nProvider locale={locale}>
      <Hero />
      <ThreeSellPoints />
      <TechnicalSkills />
      <Education />
      <PortfolioShowcase
        containerClassName={containerClassName}
        items={items}
      />
    </I18nProvider>
  );
}
