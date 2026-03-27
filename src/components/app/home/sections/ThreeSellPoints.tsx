import type { JSX } from "preact";
import { useTranslation } from "~/i18n/context";

type ItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  title: string;
};

function Item({ title, children, ...props }: ItemProps) {
  const { t } = useTranslation();
  return (
    <div
      className="surface-module-raised mb-6 rounded-3xl border border-outline-variant p-6"
      {...props}
    >
      <p className="label-mono mb-3 text-primary">
        {t("home.sellPoints.moduleLabel")}
      </p>
      <h2 className="mb-3 font-headline font-semibold text-2xl leading-tight text-on-surface">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-on-surface-muted">
        {children}
      </p>
    </div>
  );
}

export function ThreeSellPoints() {
  const { t } = useTranslation();
  return (
    <section
      className="relative -mt-6 bg-surface px-6 pb-16 pt-16 sm:-mt-8"
      data-testid="section-three-sell-points"
    >
      <div className="container mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
        <Item title={t("home.sellPoints.passion.title")}>
          {t("home.sellPoints.passion.description")}
        </Item>
        <Item title={t("home.sellPoints.versatile.title")}>
          {t("home.sellPoints.versatile.description")}
        </Item>
        <Item title={t("home.sellPoints.offWork.title")}>
          {t("home.sellPoints.offWork.description")}
        </Item>
      </div>
    </section>
  );
}

export default ThreeSellPoints;
