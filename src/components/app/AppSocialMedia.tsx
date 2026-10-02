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
        className="group rounded-md p-1.5 text-fg-muted transition-colors duration-150 ease-out hover:bg-surface-overlay hover:text-fg focus-ring active:scale-95"
      >
        <Github aria-hidden="true" />
      </a>
      <a
        title={t("social.linkedin")}
        aria-label={t("social.linkedin")}
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-md p-1.5 text-fg-muted transition-colors duration-150 ease-out hover:bg-surface-overlay hover:text-fg focus-ring active:scale-95"
      >
        <LinkedIn aria-hidden="true" />
      </a>
    </div>
  );
};

export default AppSocialMedia;
