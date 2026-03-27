import { useEffect, useRef, useState } from "preact/hooks";
import { useTranslation } from "~/i18n/context";

import AppSocialMedia from "~/components/app/AppSocialMedia";

const HERO_COMMAND_PROMPT = "$";
const TYPING_INTERVAL_MS = 42;
const HERO_COMMAND_DELAY_MS = 500;
const HERO_COMMAND_DELAY_TICKS = Math.ceil(
  HERO_COMMAND_DELAY_MS / TYPING_INTERVAL_MS
);

export function Hero() {
  const { t } = useTranslation();
  const HERO_COMMAND_BODY = t("hero.commandBody");
  const HERO_COMMAND_TEXT = `${HERO_COMMAND_PROMPT}${HERO_COMMAND_BODY}`;
  const HERO_PREFIX = t("hero.prefix");
  const HERO_HIGHLIGHT = t("hero.highlight");
  const HERO_SUFFIX = t("hero.suffix");
  const HERO_TEXT = `${HERO_PREFIX}${HERO_HIGHLIGHT}${HERO_SUFFIX}`;
  const HERO_TOTAL_TYPED_CHARS =
    HERO_COMMAND_TEXT.length + HERO_COMMAND_DELAY_TICKS + HERO_TEXT.length;

  const intervalRef = useRef<number | null>(null);
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedChars(HERO_TOTAL_TYPED_CHARS);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTypedChars((current) => {
        if (current >= HERO_TOTAL_TYPED_CHARS) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          return current;
        }

        return current + 1;
      });
    }, TYPING_INTERVAL_MS);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const typedCommandChars = Math.min(typedChars, HERO_COMMAND_TEXT.length);
  const typedCommandPrompt = HERO_COMMAND_PROMPT.slice(
    0,
    Math.min(typedCommandChars, HERO_COMMAND_PROMPT.length)
  );
  const typedCommandBody = HERO_COMMAND_BODY.slice(
    0,
    Math.max(0, typedCommandChars - HERO_COMMAND_PROMPT.length)
  );
  const heroTypedChars = Math.max(
    0,
    typedChars - HERO_COMMAND_TEXT.length - HERO_COMMAND_DELAY_TICKS
  );

  const typedPrefix = HERO_PREFIX.slice(
    0,
    Math.min(heroTypedChars, HERO_PREFIX.length)
  );
  const typedHighlight = HERO_HIGHLIGHT.slice(
    0,
    Math.max(
      0,
      Math.min(heroTypedChars - HERO_PREFIX.length, HERO_HIGHLIGHT.length)
    )
  );
  const typedSuffix = HERO_SUFFIX.slice(
    0,
    Math.max(0, heroTypedChars - HERO_PREFIX.length - HERO_HIGHLIGHT.length)
  );
  const isTypingComplete = heroTypedChars >= HERO_TEXT.length;
  const isTypingCommand = typedCommandChars < HERO_COMMAND_TEXT.length;
  const isCommandPaused =
    !isTypingCommand &&
    heroTypedChars === 0 &&
    typedChars < HERO_TOTAL_TYPED_CHARS;
  const isHeroTypingStarted = heroTypedChars > 0;
  const isTypingSuffix = typedSuffix.length > 0;

  return (
    <section
      className="gplay-bg relative isolate flex h-[800px] flex-col items-start justify-center overflow-hidden bg-surface text-on-surface sm:h-[900px]"
      data-testid="section-hero"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-100 dark:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 8%, rgba(0, 229, 255, 0.24), transparent 30%), radial-gradient(circle at 82% 14%, rgba(37, 165, 90, 0.18), transparent 24%), linear-gradient(180deg, rgba(255, 255, 255, 0.16), transparent 36%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-45 dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(113, 120, 126, 0.18) 1px, transparent 1.2px)",
            backgroundSize: "6px 6px",
          }}
        />
        <div
          className="absolute inset-0 hidden opacity-45 dark:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(113, 120, 126, 0.16) 1px, transparent 1.2px)",
            backgroundSize: "6px 6px",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-52 sm:h-64"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgb(var(--color-surface-rgb) / 0) 0%, rgb(var(--color-surface-rgb) / 0.34) 42%, rgb(var(--color-surface-rgb) / 0.9) 76%, rgb(var(--color-surface-rgb) / 1) 100%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-start justify-center pl-6 pt-24 sm:p-4 sm:pt-32">
        <p className="mt-5 rounded border border-outline-variant bg-surface-container-lowest py-2 px-2 font-mono text-sm tracking-[0.08em] text-on-surface-muted">
          <span className="text-secondary">{typedCommandPrompt}</span>
          {typedCommandBody}
          {(isTypingCommand || isCommandPaused) && (
            <span className="ml-1 inline-block animate-cursor-blink font-mono text-secondary">
              |
            </span>
          )}
        </p>
        <h1 className="font-headline text-[2.6rem] font-semibold leading-tight tracking-[-0.04em] md:text-6xl md:leading-snug xl:text-7xl xl:leading-snug 2xl:text-8xl 2xl:leading-snug">
          <span className="block">
            {typedPrefix}
            {typedHighlight && (
              <a
                href="/portfolio"
                className="group relative inline-block no-underline"
              >
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-55 dark:hidden"
                  aria-hidden="true"
                  style={{
                    filter: "blur(3.5px) saturate(1.08) brightness(1.08)",
                    textShadow:
                      "0 0 8px rgb(var(--color-primary-rgb) / 0.24), 0 0 12px rgb(var(--color-secondary-rgb) / 0.2)",
                  }}
                >
                  {typedHighlight}
                </span>
                <span
                  className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-65 dark:block"
                  aria-hidden="true"
                  style={{
                    filter: "blur(6px) saturate(1.2) brightness(1.15)",
                    textShadow:
                      "0 0 16px rgb(var(--color-primary-rgb) / 0.42), 0 0 24px rgb(var(--color-secondary-rgb) / 0.34)",
                  }}
                >
                  {typedHighlight}
                </span>
                <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {typedHighlight}
                </span>
              </a>
            )}
            {!isTypingComplete && !isTypingSuffix && isHeroTypingStarted && (
              <span className="ml-1 inline-block animate-cursor-blink font-mono text-primary">
                |
              </span>
            )}
          </span>
          {(isTypingSuffix || isTypingComplete) && (
            <span className="block">
              {typedSuffix}
              {!isTypingComplete && isTypingSuffix && (
                <span className="ml-1 inline-block animate-pulse font-mono text-primary">
                  |
                </span>
              )}
            </span>
          )}
        </h1>
        {isTypingComplete && (
          <p className="mt-5 rounded border border-outline-variant bg-surface-container-lowest px-2 py-2 font-mono text-sm tracking-[0.08em] text-on-surface-muted">
            <span className="text-secondary">{t("hero.quickLinks")}</span>
          </p>
        )}
        {isTypingComplete && (
          <AppSocialMedia className="mt-6 text-xl text-on-surface" />
        )}
      </div>
    </section>
  );
}

export default Hero;
