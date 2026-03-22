import { useEffect, useRef, useState } from "preact/hooks";

import AppSocialMedia from "~/components/app/AppSocialMedia";

const HERO_PREFIX = "I build ";
const HERO_HIGHLIGHT = "cool and awesome";
const HERO_SUFFIX = " web and mobile apps.";
const HERO_TEXT = `${HERO_PREFIX}${HERO_HIGHLIGHT}${HERO_SUFFIX}`;

export function Hero() {
  const intervalRef = useRef<number | null>(null);
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedChars(HERO_TEXT.length);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTypedChars((current) => {
        if (current >= HERO_TEXT.length) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          return current;
        }

        return current + 1;
      });
    }, 42);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const typedPrefix = HERO_PREFIX.slice(
    0,
    Math.min(typedChars, HERO_PREFIX.length)
  );
  const typedHighlight = HERO_HIGHLIGHT.slice(
    0,
    Math.max(
      0,
      Math.min(typedChars - HERO_PREFIX.length, HERO_HIGHLIGHT.length)
    )
  );
  const typedSuffix = HERO_SUFFIX.slice(
    0,
    Math.max(0, typedChars - HERO_PREFIX.length - HERO_HIGHLIGHT.length)
  );
  const isTypingComplete = typedChars >= HERO_TEXT.length;

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
        <p className="label-mono mb-4 text-primary">terminal_session_01</p>
        <h1 className="max-w-5xl font-headline text-[2.6rem] font-semibold leading-tight tracking-[-0.04em] md:text-6xl md:leading-snug xl:text-7xl xl:leading-snug 2xl:text-8xl 2xl:leading-snug">
          {typedPrefix}
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent sm:inline">
            {typedHighlight}
          </span>
          {typedSuffix}
          {!isTypingComplete && (
            <span className="ml-1 inline-block animate-pulse font-mono text-primary">
              |
            </span>
          )}
        </h1>
        {isTypingComplete && (
          <p className="mt-5 rounded border border-outline-variant bg-surface-container-lowest px-4 py-2 font-mono text-sm tracking-[0.08em] text-on-surface-muted">
            <span className="text-secondary">$</span> hrgui --about
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
