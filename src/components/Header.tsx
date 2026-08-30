"use client";

import { useTheme } from "./ThemeProvider";
import { useI18n } from "./I18nProvider";
import { useState } from "react";
import { Menu, X, Sun, Moon, Monitor, Globe } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-soft group-hover:bg-emerald-700 transition-colors">
              N
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              NurApps
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {([
              { id: "hero", key: "home" },
              { id: "catalog", key: "apps" },
              { id: "faq", key: "faq" },
              { id: "news", key: "news" },
              { id: "about", key: "about" },
            ]).map(({ id, key }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-150"
              >
                {t.nav[key as keyof typeof t.nav]}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1">
            {/* Language */}
            <button
              onClick={() => setLocale(locale === "ru" ? "en" : "ru")}
              className="p-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-150 flex items-center gap-1.5"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{locale.toUpperCase()}</span>
            </button>

            {/* Theme */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-150"
              >
                {theme === "light" ? <Sun className="w-5 h-5" /> : theme === "dark" ? <Moon className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
              </button>
              {themeMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-elevated border border-gray-100 dark:border-gray-800 overflow-hidden">
                  {([
                    { value: "light" as const, icon: Sun, label: locale === "ru" ? "Светлая" : "Light" },
                    { value: "dark" as const, icon: Moon, label: locale === "ru" ? "Тёмная" : "Dark" },
                    { value: "system" as const, icon: Monitor, label: locale === "ru" ? "Системная" : "System" },
                  ]).map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      onClick={() => { setTheme(value); setThemeMenuOpen(false); }}
                      className={`w-full px-4 py-2.5 text-sm text-left flex items-center gap-2.5 transition-colors ${
                        theme === value
                          ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-150"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 dark:border-gray-800/50 mt-2 pt-2">
            {([
              { id: "hero", key: "home" },
              { id: "catalog", key: "apps" },
              { id: "faq", key: "faq" },
              { id: "news", key: "news" },
              { id: "about", key: "about" },
            ]).map(({ id, key }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full text-left px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-150"
              >
                {t.nav[key as keyof typeof t.nav]}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
