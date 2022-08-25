import { GITHUB_URL, LINKEDIN_URL } from "~/constants";
import { twMerge } from "tailwind-merge";
import Github from "~/components/icons/Github";
import LinkedIn from "~/components/icons/LinkedIn";

type Props = {
  className?: string;
};

const AppSocialMedia = ({ className }: Props) => {
  return (
    <div className={twMerge("flex gap-2", className)}>
      <a
        title="View My Github Profile"
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-50 hover:opacity-100 transition-all"
      >
        <Github />
      </a>
      <a
        title="View My LinkedIn Profile"
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-50 hover:opacity-100 transition-all"
      >
        <LinkedIn className="hover:text-blue-500" />
      </a>
    </div>
  );
};

export default AppSocialMedia;
