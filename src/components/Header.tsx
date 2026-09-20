"use client";

import { useTheme } from "./ThemeProvider";
import { useI18n } from "./I18nProvider";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, Monitor, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { news } from "@/config/news";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const themeRef = useRef<HTMLDivElement>(null);

  const hasNews = news.length > 0;

  const links = [
    { id: "catalog", key: "apps" },
    { id: "faq", key: "faq" },
    ...(hasNews ? [{ id: "news", key: "news" }] : []),
    { id: "about", key: "about" },
  ];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setThemeOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setThemeOpen(false);
        setMenuOpen(false);
      }
    }
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 8);
      const dy = y - lastY.current;
      if (y > 120 && dy > 8 && !menuOpen && !themeOpen) setHidden(true);
      else if (dy < -8 || y < 120) setHidden(false);
      lastY.current = y;
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen, themeOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      animate={{ y: hidden ? -64 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 34 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur supports-[backdrop-filter]:bg-bg/80 dark:supports-[backdrop-filter]:bg-night/80 bg-bg/95 dark:bg-night/95 transition-shadow duration-200 ${scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : ""}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 text-left cursor-pointer group" aria-label="NurApps — наверх">
            <span className="w-8 h-8 bg-fg text-bg flex items-center justify-center font-bold text-sm rounded-md leading-none transition-transform duration-150 group-hover:scale-105 group-active:scale-95">
              N
            </span>
            <span className="leading-tight">
              <span className="block font-semibold text-[15px] tracking-[-0.01em]">NurApps</span>
              <span className="block text-[11px] text-fg-muted">{locale === "ru" ? "открытый код" : "open source"}</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-0.5" aria-label="Навигация">
            {links.map(({ id, key }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-3 py-1.5 text-[14px] text-fg-secondary hover:text-fg rounded-md hover:bg-bg-secondary transition-colors cursor-pointer"
              >
                {t.nav[key as keyof typeof t.nav]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setLocale(locale === "ru" ? "en" : "ru")}
              className="h-8 px-2.5 text-[12px] font-medium text-fg-secondary hover:text-fg rounded-md hover:bg-bg-secondary transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label={locale === "ru" ? "Переключить на английский" : "Switch to Russian"}
            >
              <Globe className="w-3.5 h-3.5" aria-hidden />
              {locale.toUpperCase()}
            </button>

            <div className="relative" ref={themeRef}>
              <button
                onClick={() => setThemeOpen((v) => !v)}
                aria-expanded={themeOpen}
                aria-haspopup="menu"
                aria-label={locale === "ru" ? "Тема оформления" : "Color theme"}
                className="w-8 h-8 flex items-center justify-center text-fg-secondary hover:text-fg rounded-md hover:bg-bg-secondary transition-colors cursor-pointer"
              >
                {theme === "light" ? <Sun className="w-4 h-4" aria-hidden /> : theme === "dark" ? <Moon className="w-4 h-4" aria-hidden /> : <Monitor className="w-4 h-4" aria-hidden />}
              </button>
              <AnimatePresence>
                {themeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    role="menu"
                    className="absolute right-0 mt-2 w-40 bg-bg dark:bg-night-soft rounded-lg border border-border shadow-[0_4px_12px_rgba(0,0,0,0.12)] overflow-hidden py-1"
                  >
                    {(
                      [
                        { value: "light" as const, icon: Sun, label: locale === "ru" ? "Светлая" : "Light" },
                        { value: "dark" as const, icon: Moon, label: locale === "ru" ? "Тёмная" : "Dark" },
                        { value: "system" as const, icon: Monitor, label: locale === "ru" ? "Как в системе" : "System" },
                      ]
                    ).map(({ value, icon: Icon, label }) => (
                      <button
                        key={value}
                        role="menuitem"
                        onClick={() => {
                          setTheme(value);
                          setThemeOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-[13px] text-left flex items-center gap-2 transition-colors cursor-pointer ${
                          theme === value ? "bg-accent/10 text-accent font-medium" : "text-fg-secondary hover:bg-bg-secondary"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" aria-hidden />
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              className="md:hidden w-8 h-8 flex items-center justify-center text-fg-secondary rounded-md hover:bg-bg-secondary cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? <motion.span key="x" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}><X className="w-4 h-4" aria-hidden /></motion.span> : <motion.span key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}><Menu className="w-4 h-4" aria-hidden /></motion.span>}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden overflow-hidden border-t border-border"
              aria-label="Мобильная навигация"
            >
              <div className="py-1">
                {[{ id: "hero", key: "home" }, ...links].map(({ id, key }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="flex items-center justify-between w-full text-left py-2.5 text-[15px] font-medium border-b border-border last:border-0 cursor-pointer"
                  >
                    {t.nav[key as keyof typeof t.nav]}
                    <span aria-hidden className="text-fg-muted text-[13px]">→</span>
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
