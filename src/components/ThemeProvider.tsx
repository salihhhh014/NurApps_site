"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "dark",
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nurapps-theme") as Theme | null;
      if (saved === "light" || saved === "dark" || saved === "system") {
        setTheme(saved);
      }
    } catch {
      // приватный режим — остаёмся на системной теме
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    function resolve() {
      const t = theme === "system" ? (mq.matches ? "dark" : "light") : theme;
      setResolvedTheme(t);
      document.documentElement.classList.toggle("dark", t === "dark");
      document.documentElement.classList.toggle("light", t === "light");
    }

    resolve();
    mq.addEventListener("change", resolve);
    return () => mq.removeEventListener("change", resolve);
  }, [theme]);

  function handleSetTheme(t: Theme) {
    setTheme(t);
    try {
      localStorage.setItem("nurapps-theme", t);
    } catch {
      // ignore
    }
  }

  // До монтирования не красим ничего, чтобы не было вспышки чужой темы.
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, resolvedTheme }}>
        <span style={{ visibility: "hidden" }}>{children}</span>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
