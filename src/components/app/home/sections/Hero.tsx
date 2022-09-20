import classNames from "classnames";
import { useRef } from "preact/hooks";
import { twMerge } from "tailwind-merge";

import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useTransitionEnd } from "hooks/useTransitionEnd";
import AppSocialMedia from "~/components/app/AppSocialMedia";

export function Hero() {
  const headerRef = useRef();
  const headerEntry = useIntersectionObserver(headerRef, {});
  const isHeaderVisible = !!headerEntry?.isIntersecting;
  const headerAnimationEnded = useTransitionEnd(headerRef);

  return (
    <div
      className="flex flex-col justify-center items-start dark:text-gray-200 h-[800px] sm:h-[900px] gplay-bg dark:dark-gplay-bg"
      data-testid="section-hero"
    >
      <div className="pl-6 sm:p-4 flex flex-col justify-center items-start container mx-auto">
        <h1
          ref={headerRef}
          className={classNames(
            twMerge(
              classNames(
                `translate-y-1/2 motion-reduce:translate-y-0 font-semibold text-[2.5rem] md:text-6xl xl:text-7xl 2xl:text-8xl opacity-0 motion-reduce:opacity-100`,
                {
                  ["transition-hero opacity-100 translate-y-0"]:
                    isHeaderVisible,
                }
              )
            ),
            "leading-tight md:leading-snug xl:leading-snug 2xl:leading-snug"
          )}
        >
          I ❤️ making{" "}
          <span className="bg-clip-text text-transparent block sm:inline bg-gradient-to-r from-green-500 to-malibu-500 dark:from-green-500 dark:to-malibu-400">
            cool and awesome{" "}
          </span>
          web/mobile apps.
        </h1>
        <AppSocialMedia
          className={classNames(
            "translate-y-1/2 motion-reduce:translate-y-0 text-xl opacity-0 motion-reduce:opacity-100 mt-4",
            {
              ["transition-hero opacity-100 translate-y-0"]:
                headerAnimationEnded,
            }
          )}
        />
      </div>
    </div>
  );
}

export default Hero;
