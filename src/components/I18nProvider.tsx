"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, getDictionary } from "@/lib/i18n";

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: ReturnType<typeof getDictionary>;
}

const I18nContext = createContext<I18nContextType>({
  locale: "ru",
  setLocale: () => {},
  t: getDictionary("ru"),
});

export function useI18n() {
  return useContext(I18nContext);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nurapps-locale") as Locale | null;
      if (saved === "ru" || saved === "en") setLocaleState(saved);
      else {
        const nav = navigator.language.toLowerCase();
        if (nav.startsWith("en")) setLocaleState("en");
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(l: Locale) {
    setLocaleState(l);
    try {
      localStorage.setItem("nurapps-locale", l);
    } catch {
      // ignore
    }
  }

  const t = getDictionary(locale);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
