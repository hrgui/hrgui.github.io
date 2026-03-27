import classNames from "classnames";
import { useTranslation } from "~/i18n/context";

import Github from "~/components/icons/Github";
import LinkedIn from "~/components/icons/LinkedIn";
import { GITHUB_URL, LINKEDIN_URL } from "~/constants";

type Props = {
  className?: string;
};

const AppSocialMedia = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={classNames("flex gap-2", className)}>
      <a
        title={t("social.github")}
        aria-label={t("social.github")}
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded p-1 opacity-50 transition-all duration-150 ease-out hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
      >
        <Github aria-hidden="true" />
      </a>
      <a
        title={t("social.linkedin")}
        aria-label={t("social.linkedin")}
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded p-1 opacity-50 transition-all duration-150 ease-out hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
      >
        <LinkedIn
          aria-hidden="true"
          className="transition-colors group-hover:text-blue-500 group-focus-visible:text-blue-500"
        />
      </a>
    </div>
  );
};

export default AppSocialMedia;
