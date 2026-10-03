import classNames from "classnames";
import { useTranslation } from "~/i18n/context";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <a
      href="/"
      className="rounded-sm hr-focus-ring"
      aria-label={t("nav.homeLink")}
    >
      <div
        className={classNames(
          "font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.04em] text-fg",
          className
        )}
      >
        hrg
        <span className="mx-[0.02em] inline-block animate-cursor-blink font-mono font-normal text-accent">
          |
        </span>
        <span className="text-accent">ui</span>
      </div>
    </a>
  );
};

export default Logo;
