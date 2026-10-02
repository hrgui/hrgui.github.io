import { useTranslation } from "~/i18n/context";

import { education as defaultEducation } from "~/constants";

export function Education({
  education = defaultEducation,
}: {
  education?: typeof defaultEducation;
}) {
  const { t } = useTranslation();
  return (
    <section className="hr-frame" data-testid="section-education">
      <div className="hr-frame-col">
        <div className="hr-frame-grid">
          <div className="hr-frame-cell">
            <p className="label-mono mb-4 text-success">
              {t("home.education.moduleLabel")}
            </p>
            <h1 className="text-headline text-fg md:text-display-md">
              {t("home.education.heading")}
            </h1>
          </div>
          {education?.map(({ key, imgSrc, url, timeframe: { start, end } }) => {
            const title = t(`home.education.${key}.title`);
            return (
              <article key={key} className="hr-frame-grid hr-frame-grid--aside">
                <div className="hr-frame-cell flex items-center gap-4">
                  <a
                    href={url}
                    target="__blank"
                    className="inline-block shrink-0 rounded-lg transition-transform duration-150 ease-out focus-ring active:scale-95"
                  >
                    <img
                      loading="lazy"
                      alt={t("home.education.imgAlt", { title })}
                      src={imgSrc}
                      className="h-16 w-16 rounded-lg border border-solid border-border-muted bg-surface object-contain p-2"
                    />
                  </a>
                  <p className="font-mono text-sm text-fg-subtle">
                    {start} → {end}
                  </p>
                </div>
                <div className="hr-frame-cell">
                  <h3 className="mb-2 text-title-lg text-fg">{title}</h3>
                  <p className="text-fg-muted">
                    {t(`home.education.${key}.description`)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Education;
