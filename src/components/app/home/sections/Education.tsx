import { education as defaultEducation } from "~/constants";

export function Education({
  education = defaultEducation,
}: {
  education?: typeof defaultEducation;
}) {
  return (
    <section
      className="bg-surface px-6 pb-12 pt-8"
      data-testid="section-education"
    >
      <div className="container mx-auto">
        <div className="rounded-3xl border border-outline-variant bg-surface-container-low p-6 sm:p-8">
          <p className="label-mono mb-2 text-primary">module_02 // education</p>
          <h1 className="font-headline text-4xl font-semibold text-on-surface">
            Education
          </h1>
          <div className="mt-6 space-y-6">
            {education?.map(
              ({
                key,
                imgSrc,
                url,
                title,
                description,
                timeframe: { start, end },
              }) => {
                return (
                  <article
                    key={key}
                    className="flex flex-col gap-4 rounded-2xl border border-outline-variant bg-surface-container-high p-5 sm:flex-row sm:items-center"
                  >
                    <div className="w-24 shrink-0">
                      <a
                        href={url}
                        target="__blank"
                        className="inline-block rounded-lg transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-high active:scale-95"
                      >
                        <img
                          loading="lazy"
                          alt={`Open ${title} in a new tab`}
                          src={imgSrc}
                          className="h-20 w-20 rounded-lg border border-outline-variant bg-surface-container-lowest object-contain p-2"
                        />
                      </a>
                    </div>
                    <div>
                      <h3 className="mb-2 font-headline text-xl font-semibold text-on-surface">
                        {title}
                      </h3>
                      <p className="text-on-surface-muted">{description}</p>
                      <p className="mt-2 font-mono text-sm uppercase tracking-[0.16em] text-primary">
                        {start} - {end}
                      </p>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
