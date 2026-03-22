import { useEffect, useMemo, useState } from "preact/hooks";

import {
  applyThemePreference,
  getResolvedTheme,
  getStoredThemePreference,
  getThemeMediaQuery,
  type ThemePreference,
} from "~/themePreference";

const getNextThemePreference = (
  currentPreference: ThemePreference
): ThemePreference => {
  if (currentPreference === "system") {
    return "light";
  }

  if (currentPreference === "light") {
    return "dark";
  }

  return "system";
};

const ThemeIcon = ({ preference }: { preference: ThemePreference }) => {
  if (preference === "light") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
        <path
          d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (preference === "dark") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" strokeWidth="1.8" />
      <path
        d="M8 20h8M12 16v4"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

type Props = {
  variant?: "icon" | "drawer";
};

const ThemeToggle = ({ variant = "icon" }: Props) => {
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");

  useEffect(() => {
    const savedPreference = getStoredThemePreference();
    setThemePreference(savedPreference);
    applyThemePreference(savedPreference);

    const mediaQuery = window.matchMedia(getThemeMediaQuery());
    const handleSystemThemeChange = () => {
      if (getStoredThemePreference() === "system") {
        applyThemePreference("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const resolvedTheme = useMemo(
    () => getResolvedTheme(themePreference),
    [themePreference]
  );

  const handleToggleTheme = () => {
    const nextPreference = getNextThemePreference(themePreference);
    setThemePreference(nextPreference);
    applyThemePreference(nextPreference, { persist: true });
  };

  const isDrawerVariant = variant === "drawer";

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      aria-label={`Theme: ${themePreference}. Click to switch to ${getNextThemePreference(
        themePreference
      )}.`}
      title={`Theme: ${themePreference} (${resolvedTheme})`}
      className={
        isDrawerVariant
          ? "inline-flex h-16 w-full items-center gap-2 px-6 text-left font-medium text-gray-800 transition-colors hover:text-gray-900 hover:bg-red-700 hover:bg-opacity-10 dark:text-gray-200 dark:hover:text-gray-100"
          : "mr-3 inline-flex h-10 w-10 items-center justify-center rounded border border-gray-300 text-gray-800 transition-colors hover:text-gray-900 hover:bg-red-700 hover:bg-opacity-10 dark:border-gray-700 dark:text-gray-200 dark:hover:text-gray-100"
      }
    >
      <ThemeIcon preference={themePreference} />
      {isDrawerVariant && (
        <span className="capitalize">Theme: {themePreference}</span>
      )}
    </button>
  );
};

export default ThemeToggle;
