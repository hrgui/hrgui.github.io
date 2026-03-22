export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme-preference";
const DARK_CLASS_NAME = "dark";
const PREFERS_DARK_QUERY = "(prefers-color-scheme: dark)";

const isThemePreference = (value: string | null): value is ThemePreference => {
  return value === "light" || value === "dark" || value === "system";
};

export const getStoredThemePreference = (): ThemePreference => {
  if (typeof window === "undefined") {
    return "system";
  }

  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemePreference(value) ? value : "system";
};

export const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(PREFERS_DARK_QUERY).matches ? "dark" : "light";
};

export const getResolvedTheme = (
  preference: ThemePreference
): "light" | "dark" => {
  return preference === "system" ? getSystemTheme() : preference;
};

type ApplyThemeOptions = {
  persist?: boolean;
};

export const applyThemePreference = (
  preference: ThemePreference,
  options: ApplyThemeOptions = {}
) => {
  if (typeof document === "undefined") {
    return;
  }

  const resolvedTheme = getResolvedTheme(preference);
  const html = document.documentElement;
  html.classList.toggle(DARK_CLASS_NAME, resolvedTheme === "dark");
  html.style.colorScheme = resolvedTheme;
  html.style.backgroundColor = resolvedTheme === "dark" ? "#0f0f0f" : "#ffffff";

  if (options.persist && typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  }
};

export const getThemeMediaQuery = () => PREFERS_DARK_QUERY;
