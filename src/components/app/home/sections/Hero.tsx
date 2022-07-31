import classNames from "classnames";
import { useAnimationEnd } from "hooks/useAnimationEnd";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useRef } from "react";
import AppSocialMedia from "../../AppSocialMedia";

const Hero = () => {
  const headerRef = useRef();
  const headerEntry = useIntersectionObserver(headerRef, {});
  const isHeaderVisible = !!headerEntry?.isIntersecting;
  const headerAnimationEnded = useAnimationEnd(headerRef);

  return (
    <div
      className="flex flex-col justify-center items-start dark:text-gray-200 h-hero sm:h-hero-sm gplay-bg dark:dark-gplay-bg"
      data-testid="section-hero"
    >
      <div className="p-6 xl:p-0 flex flex-col justify-center items-start container mx-auto">
        <h1
          ref={headerRef}
          className={classNames(
            `text-4xl font-semibold leading-tight md:text-6xl md:leading-snug xl:text-7xl xl:leading-snug 2xl:text-8xl 2xl:leading-snug opacity-0`,
            {
              ["motion-safe:animate-fadeIn-1.5"]: isHeaderVisible,
            }
          )}
        >
          I ❤️ making{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-saltpan-400 to-malibu-500 dark:from-saltpan-500 dark:to-malibu-400">
            cool and awesome{" "}
          </span>
          web/mobile apps.
        </h1>
        <AppSocialMedia
          className={classNames("text-xl opacity-0", {
            ["motion-safe:animate-fadeIn-1.5"]: headerAnimationEnded,
          })}
        />
      </div>
    </div>
  );
};

export default Hero;
