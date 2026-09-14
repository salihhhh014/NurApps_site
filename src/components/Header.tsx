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
      animate={{ y: hidden ? -72 : 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b rule backdrop-blur supports-[backdrop-filter]:bg-paper/85 dark:supports-[backdrop-filter]:bg-night/85 bg-paper/95 dark:bg-night/95 transition-shadow duration-300 ${scrolled ? "shadow-[0_12px_32px_-20px_rgba(0,0,0,0.35)]" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[68px]">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 text-left cursor-pointer group" aria-label="NurApps — наверх">
            <span className="w-9 h-9 bg-ink dark:bg-paper text-paper dark:text-night flex items-center justify-center font-display font-bold text-xl rounded-[10px] leading-none pt-[1px] transition-transform duration-200 group-hover:scale-[1.02] group-active:scale-[0.98]">
              N
            </span>
            <span className="leading-tight">
              <span className="block font-bold text-[17px] tracking-tight">NurApps</span>
              <span className="block text-[12px] text-ink-soft dark:text-[#a39e8f]">{locale === "ru" ? "мастерская открытого кода" : "open-source workshop"}</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Навигация">
            {links.map(({ id, key }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-3 py-2 text-[14.5px] font-medium text-ink-soft dark:text-[#cfc9b8] hover:text-ink dark:hover:text-white rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {t.nav[key as keyof typeof t.nav]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setLocale(locale === "ru" ? "en" : "ru")}
              className="h-10 px-3 text-[13px] font-medium text-ink-soft dark:text-[#cfc9b8] hover:text-ink dark:hover:text-white rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label={locale === "ru" ? "Переключить на английский" : "Switch to Russian"}
            >
              <Globe className="w-4 h-4" aria-hidden />
              {locale.toUpperCase()}
            </button>

            <div className="relative" ref={themeRef}>
              <button
                onClick={() => setThemeOpen((v) => !v)}
                aria-expanded={themeOpen}
                aria-haspopup="menu"
                aria-label={locale === "ru" ? "Тема оформления" : "Color theme"}
                className="w-10 h-10 flex items-center justify-center text-ink-soft dark:text-[#cfc9b8] hover:text-ink dark:hover:text-white rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {theme === "light" ? <Sun className="w-5 h-5" aria-hidden /> : theme === "dark" ? <Moon className="w-5 h-5" aria-hidden /> : <Monitor className="w-5 h-5" aria-hidden />}
              </button>
              <AnimatePresence>
                {themeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    role="menu"
                    className="absolute right-0 mt-2 w-44 bg-paper dark:bg-night-soft rounded-xl border rule shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)] overflow-hidden py-1"
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
                        className={`w-full px-4 py-2.5 text-sm text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                          theme === value ? "bg-pine/10 dark:bg-amber/15 text-pine dark:text-amber font-medium" : "text-ink-soft dark:text-[#cfc9b8] hover:bg-ink/5 dark:hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-4 h-4" aria-hidden />
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
              className="md:hidden w-10 h-10 flex items-center justify-center text-ink-soft dark:text-[#cfc9b8] rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X className="w-5 h-5" aria-hidden /></motion.span> : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu className="w-5 h-5" aria-hidden /></motion.span>}
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
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t rule"
              aria-label="Мобильная навигация"
            >
              <div className="py-2">
                {[{ id: "hero", key: "home" }, ...links].map(({ id, key }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="flex items-center justify-between w-full text-left px-1 py-3.5 text-[16px] font-medium border-b rule last:border-0 cursor-pointer"
                  >
                    {t.nav[key as keyof typeof t.nav]}
                    <span aria-hidden className="text-ink-faint">→</span>
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
