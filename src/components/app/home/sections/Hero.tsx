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
      className="gplay-bg hr-stage relative flex min-h-[720px] flex-col text-fg sm:min-h-[820px]"
      data-testid="section-hero"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-52 sm:h-64"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(var(--color-frame-bg-rgb) / 0) 0%, rgb(var(--color-frame-bg-rgb) / 0.34) 42%, rgb(var(--color-frame-bg-rgb) / 0.9) 76%, rgb(var(--color-frame-bg-rgb) / 1) 100%)",
        }}
      />
      <div className="hr-frame-col hr-frame-col--bare relative z-10 flex flex-1 flex-col justify-center px-6 pb-20 pt-32 md:px-12 md:pt-40">
        <p className="inline-flex w-fit items-center gap-2 rounded-md border border-solid border-border-muted bg-surface px-3 py-1.5 font-mono text-sm text-fg-muted [font-variant-ligatures:none]">
          <span className="text-success">{typedCommandPrompt}</span>
          {typedCommandBody}
          {(isTypingCommand || isCommandPaused) && (
            <span className="inline-block animate-cursor-blink font-mono text-success">
              ▍
            </span>
          )}
        </p>
        <h1 className="mt-6 font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-fg md:text-display-md xl:text-display-xl">
          <span className="block">
            {typedPrefix}
            {typedHighlight && (
              <a
                href="/portfolio"
                className="group relative inline-block rounded-sm sm:whitespace-nowrap no-underline focus-ring"
              >
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent to-success bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-55 dark:hidden"
                  aria-hidden="true"
                  style={{
                    filter: "blur(3.5px) saturate(1.08) brightness(1.08)",
                    textShadow:
                      "0 0 8px rgb(var(--color-accent-rgb) / 0.24), 0 0 12px rgb(var(--color-success-rgb) / 0.2)",
                  }}
                >
                  {typedHighlight}
                </span>
                <span
                  className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-accent to-success bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-65 dark:block"
                  aria-hidden="true"
                  style={{
                    filter: "blur(6px) saturate(1.2) brightness(1.15)",
                    textShadow:
                      "0 0 16px rgb(var(--color-accent-rgb) / 0.42), 0 0 24px rgb(var(--color-success-rgb) / 0.34)",
                  }}
                >
                  {typedHighlight}
                </span>
                <span className="relative bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
                  {typedHighlight}
                </span>
              </a>
            )}
            {!isTypingComplete && !isTypingSuffix && isHeroTypingStarted && (
              <span className="ml-1 inline-block animate-cursor-blink font-mono font-normal text-accent">
                |
              </span>
            )}
          </span>
          {(isTypingSuffix || isTypingComplete) && (
            <span className="block">
              {typedSuffix}
              {!isTypingComplete && isTypingSuffix && (
                <span className="ml-1 inline-block animate-cursor-blink font-mono font-normal text-accent">
                  |
                </span>
              )}
            </span>
          )}
        </h1>
        <div
          className={`mt-8 flex flex-col items-start gap-6 transition-opacity duration-300 ${
            isTypingComplete ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!isTypingComplete}
        >
          <p className="inline-flex w-fit items-center rounded-md border border-solid border-border-muted bg-surface px-3 py-1.5 font-mono text-sm text-success [font-variant-ligatures:none]">
            {t("hero.quickLinks")}
          </p>
          <AppSocialMedia className="text-xl" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
