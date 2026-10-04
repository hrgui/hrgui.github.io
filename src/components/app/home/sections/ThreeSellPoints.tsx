import type { JSX } from "preact";
import { useTranslation } from "~/i18n/context";

type ItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  title: string;
  index: number;
  accentClassName: string;
};

function Item({
  title,
  index,
  accentClassName,
  children,
  ...props
}: ItemProps) {
  const { t } = useTranslation();
  return (
    <div className="hr-frame-cell" {...props}>
      <p className={`label-mono mb-4 ${accentClassName}`}>
        {String(index).padStart(2, "0")} // {t("home.sellPoints.moduleLabel")}
      </p>
      <h2 className="mb-3 text-title-lg text-fg">{title}</h2>
      <p className="text-base leading-relaxed text-fg-muted">{children}</p>
    </div>
  );
}

export function ThreeSellPoints() {
  const { t } = useTranslation();
  return (
    <section
      id="about"
      className="hr-frame scroll-mt-16"
      data-testid="section-three-sell-points"
    >
      <div className="hr-frame-col">
        <div className="hr-frame-grid hr-frame-grid--3">
          <Item
            index={1}
            accentClassName="text-accent"
            title={t("home.sellPoints.passion.title")}
          >
            {t("home.sellPoints.passion.description")}
          </Item>
          <Item
            index={2}
            accentClassName="text-success"
            title={t("home.sellPoints.versatile.title")}
          >
            {t("home.sellPoints.versatile.description")}
          </Item>
          <Item
            index={3}
            accentClassName="text-coral"
            title={t("home.sellPoints.offWork.title")}
          >
            {t("home.sellPoints.offWork.description")}
          </Item>
        </div>
      </div>
    </section>
  );
}

export default ThreeSellPoints;
