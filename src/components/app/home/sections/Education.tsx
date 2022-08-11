import { education as defaultEducation } from "@/constants";
import { Fragment } from "react";

export function Education({
  education = defaultEducation,
}: {
  education?: typeof defaultEducation;
}) {
  return (
    <div
      className="p-6 pt-8 pb-8  dark:bg-neutral-800 dark:text-gray-100  dark:border-stone-700"
      data-testid="section-education"
    >
      <div className="container mx-auto">
        <h1 className="text-3xl font-medium mb-6">Education</h1>
        <div className="flex items-center">
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
                <Fragment key={key}>
                  <div className="w-28 pr-4 shrink-0">
                    <a href={url} target="__blank">
                      <img
                        loading="lazy"
                        alt={`Open ${imgSrc} in a new tab`}
                        src={imgSrc}
                        className="w-20 h-20"
                      />
                    </a>
                  </div>
                  <div className="dark:text-gray-200">
                    <h3 className="uppercase dark:text-gray-100 mb-2 font-semibold tracking-wide">
                      {title}
                    </h3>
                    <p>{description}</p>
                    <p className="text-gray-700 dark:text-gray-100">
                      {start} - {end}
                    </p>
                  </div>
                </Fragment>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Education;
