import { createContext, type ComponentChildren } from "preact";
import { useContext } from "preact/hooks";

import type { Translation } from "~/i18n/locales/en";
import en from "~/i18n/locales/en";

type TFunction = (key: string, opts?: Record<string, unknown>) => string;

const locales: Record<string, Translation> = { en };

function resolvePath(obj: unknown, path: string): string {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : path;
}

function createT(locale: string): TFunction {
  const translations = locales[locale] ?? locales.en;
  return (key, opts) => {
    let str = resolvePath(translations, key);
    if (opts) {
      Object.entries(opts).forEach(([k, v]) => {
        str = str.replace(`{{${k}}}`, String(v));
      });
    }
    return str;
  };
}

const I18nContext = createContext<TFunction>(createT("en"));

interface ProviderProps {
  locale?: string;
  children: ComponentChildren;
}

export function I18nProvider({ locale = "en", children }: ProviderProps) {
  return (
    <I18nContext.Provider value={createT(locale)}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return { t: useContext(I18nContext) };
}
