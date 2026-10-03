import { useTranslation } from "~/i18n/context";

import { toDisplayDate } from "./utils";

type Props = {
  hidden?: boolean;
  date?: string;
  title?: string;
  excerpt?: string;
};

const BlogSubHeader = ({ hidden, date, title, excerpt }: Props) => {
  const { t } = useTranslation();
  const isDevHidden = hidden && process.env.NODE_ENV === "development";

  return (
    <section className="hr-stage">
      <div className="hr-frame-col hr-frame-col--bare px-6 pb-14 pt-32 md:px-12 md:pt-36">
        {/* Same centred reading width as the article body */}
        <div className="mx-auto max-w-[960px]">
          {(date || isDevHidden) && (
            <div className="mb-5 flex flex-wrap items-center gap-3">
              {date && (
                <p className="label-mono text-accent">
                  {toDisplayDate(date)} // {t("blog.subHeader.entryRecord")}
                </p>
              )}
              {isDevHidden && (
                <span className="rounded-full bg-coral-muted px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-coral">
                  {t("blog.subHeader.hiddenDraft")}
                </span>
              )}
            </div>
          )}

          {isDevHidden && (
            <p className="mb-6 max-w-[60ch] border-l-2 border-l-solid border-coral pl-4 text-sm text-fg-muted">
              {t("blog.subHeader.hiddenWarning")}
            </p>
          )}

          <h1 className="max-w-[24ch] bg-gradient-to-r from-on-background via-primary to-primary-container bg-clip-text pb-[0.12em] !leading-[1.1] font-display text-[2.5rem] font-extrabold tracking-[-0.035em] text-transparent md:text-display-md">
            {title}
          </h1>

          {excerpt && (
            <p className="mt-5 max-w-[60ch] text-lead text-fg-muted">
              {excerpt}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSubHeader;
