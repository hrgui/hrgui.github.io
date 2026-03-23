import { useEffect, useRef, useState } from "preact/hooks";

import AppSocialMedia from "~/components/app/AppSocialMedia";

const HERO_COMMAND_PROMPT = "$";
const HERO_COMMAND_BODY = " about";
const HERO_COMMAND_TEXT = `${HERO_COMMAND_PROMPT}${HERO_COMMAND_BODY}`;
const HERO_PREFIX = "I build ";
const HERO_HIGHLIGHT = "cool and awesome";
const HERO_SUFFIX = "web and mobile apps.";
const HERO_TEXT = `${HERO_PREFIX}${HERO_HIGHLIGHT}${HERO_SUFFIX}`;
const TYPING_INTERVAL_MS = 42;
const HERO_COMMAND_DELAY_MS = 500;
const HERO_COMMAND_DELAY_TICKS = Math.ceil(
  HERO_COMMAND_DELAY_MS / TYPING_INTERVAL_MS
);
const HERO_TOTAL_TYPED_CHARS =
  HERO_COMMAND_TEXT.length + HERO_COMMAND_DELAY_TICKS + HERO_TEXT.length;

export function Hero() {
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
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.12) 50%)",
            backgroundSize: "100% 3px",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0, 102, 138, 0.12), rgba(37, 165, 90, 0.08), rgba(255, 84, 73, 0.12))",
            backgroundSize: "3px 100%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 18%, rgba(0, 102, 138, 0.28), transparent 30%), radial-gradient(circle at 78% 24%, rgba(37, 165, 90, 0.18), transparent 22%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-start justify-center pl-6 pt-24 sm:p-4 sm:pt-32">
        <p className="mt-5 rounded border border-outline-variant bg-surface-container-lowest py-2 font-mono text-sm tracking-[0.08em] text-on-surface-muted">
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
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {typedHighlight}
              </span>
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
          <p className="mt-5 rounded border border-outline-variant bg-surface-container-lowest py-2 font-mono text-sm tracking-[0.08em] text-on-surface-muted">
            <span className="text-secondary">// quick_links</span>
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
