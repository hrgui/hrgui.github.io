import classNames from "classnames";

import Github from "~/components/icons/Github";
import LinkedIn from "~/components/icons/LinkedIn";
import { GITHUB_URL, LINKEDIN_URL } from "~/constants";

type Props = {
  className?: string;
};

const AppSocialMedia = ({ className }: Props) => {
  return (
    <div className={classNames("flex gap-2", className)}>
      <a
        title="View My GitHub Profile"
        aria-label="View My GitHub Profile"
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded p-1 opacity-50 transition-all duration-150 ease-out hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
      >
        <Github aria-hidden="true" />
      </a>
      <a
        title="View My LinkedIn Profile"
        aria-label="View My LinkedIn Profile"
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
