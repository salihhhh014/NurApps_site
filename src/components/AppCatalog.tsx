"use client";

import { useI18n } from "./I18nProvider";
import { useState, useMemo } from "react";
import { apps } from "@/config/apps";
import AppModal from "./AppModal";
import { Search, ArrowUpRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type Platform = "all" | "windows" | "android" | "linux" | "web" | "telegram";

const statusStyle: Record<string, string> = {
  stable: "text-pine dark:text-amber border-pine/40 dark:border-amber/40",
  beta: "text-[#8a5a00] dark:text-amber border-[#c99a2e]/60 dark:border-amber/40",
  dev: "text-ink-faint dark:text-[#a39e8f] border-ink/20 dark:border-white/20",
};

const platformLabel: Record<string, string> = {
  windows: "Windows",
  android: "Android",
  linux: "Linux",
  web: "Web",
  telegram: "Telegram",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AppCatalog() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<Platform>("all");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const filteredApps = useMemo(
    () =>
      apps.filter((app) => {
        const matchesPlatform = filter === "all" || app.platforms.includes(filter as never);
        const q = search.trim().toLowerCase();
        const matchesSearch =
          q === "" ||
          app.name.toLowerCase().includes(q) ||
          app.tagline[locale].toLowerCase().includes(q) ||
          app.description[locale].toLowerCase().includes(q);
        return matchesPlatform && matchesSearch;
      }),
    [filter, search, locale]
  );

  const statusLabel = (s: string) =>
    s === "stable" ? t.catalog.status_stable : s === "beta" ? t.catalog.status_beta : t.catalog.status_dev;

  const filters: { key: Platform; label: string }[] = [
    { key: "all", label: t.catalog.all },
    { key: "windows", label: t.catalog.windows },
    { key: "android", label: t.catalog.android },
    { key: "linux", label: t.catalog.linux },
    { key: "web", label: t.catalog.web },
    { key: "telegram", label: "Telegram" },
  ];

  const isFiltered = filter !== "all" || search.trim() !== "";

  return (
    <>
      <section id="catalog" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-wrap items-end justify-between gap-4 mb-3"
          >
            <h2 className="font-display font-semibold text-4xl sm:text-5xl tracking-tight">
              {t.catalog.title}
            </h2>
            <p className="text-[13px] text-ink-soft dark:text-[#8f8a7a] tabular-nums" role="status" aria-live="polite">
              {t.catalog.found}: {filteredApps.length}/{apps.length}
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="text-[16px] text-ink-soft dark:text-[#cfc9b8] leading-relaxed mb-8 max-w-[60ch]"
          >
            {t.catalog.subtitle}
          </motion.p>

          <div className="flex flex-col lg:flex-row gap-3 lg:items-center mb-6">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-faint" aria-hidden />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={locale === "ru" ? "Найти: чат, книги, калькулятор…" : "Search: chat, books, calculator…"}
                aria-label={locale === "ru" ? "Поиск по программам" : "Search apps"}
                maxLength={80}
                className="w-full h-[52px] pl-12 pr-10 bg-transparent border rule rounded-xl text-[16px] placeholder:text-ink-soft/70 dark:placeholder:text-[#8f8a7a] focus:outline-none focus:border-pine dark:focus:border-amber focus:ring-2 focus:ring-pine/15 dark:focus:ring-amber/20 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label={locale === "ru" ? "Очистить поиск" : "Clear search"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-ink-faint hover:text-ink dark:hover:text-white hover:bg-ink/5 dark:hover:bg-white/10"
                >
                  ×
                </button>
              )}
            </div>
            <LayoutGroup id="catalog-filters">
              <div className="flex flex-wrap gap-1" role="tablist" aria-label={t.catalog.platforms}>
                {filters.map(({ key, label }) => {
                  const active = filter === key;
                  return (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setFilter(key)}
                      className={`relative h-10 px-4 rounded-lg text-[14px] font-medium transition-colors cursor-pointer ${
                        active
                          ? "text-paper dark:text-night"
                          : "text-ink-soft dark:text-[#cfc9b8] hover:bg-ink/5 dark:hover:bg-white/10"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="catalog-filter-pill"
                          transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.8 }}
                          className="absolute inset-0 bg-ink dark:bg-paper rounded-lg"
                        />
                      )}
                      <span className="relative">{label}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          {filteredApps.length === 0 ? (
            <div className="border rule rounded-2xl px-6 py-14 text-center">
              <p className="font-display text-2xl mb-2">{t.catalog.empty_title}</p>
              <p className="text-ink-soft dark:text-[#cfc9b8] mb-6">{t.catalog.empty_hint}</p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearch("");
                }}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-ink/25 dark:border-white/25 font-medium hover:bg-ink/5 dark:hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                <RotateCcw className="w-4 h-4" aria-hidden />
                {t.catalog.reset}
              </button>
            </div>
          ) : (
            <motion.ul layout className="border-t rule">
              <AnimatePresence initial={false} mode="popLayout">
                {filteredApps.map((app) => (
                  <motion.li
                    layout
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b rule"
                  >
                    <button
                      onClick={() => setSelectedApp(app.id)}
                      aria-haspopup="dialog"
                      className="row-lift w-full grid grid-cols-[auto_1fr_auto] sm:grid-cols-[56px_1fr_auto_auto] items-center gap-3 sm:gap-5 py-5 text-left group cursor-pointer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={app.icon}
                        alt=""
                        width={52}
                        height={52}
                        loading="lazy"
                        className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-xl border rule"
                      />
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                          <span className="font-display font-semibold text-[20px] leading-tight">
                            {app.name}
                          </span>
                          <span className={`stamp ${statusStyle[app.status]}`}>{statusLabel(app.status)}</span>
                        </span>
                        <span className="block text-[15px] font-medium text-ink dark:text-[#ece7d9] truncate">
                          {app.tagline[locale]}
                        </span>
                        <span className="block text-[12.5px] text-ink-faint dark:text-[#8f8a7a] truncate mt-0.5">
                          {app.platforms.map((p) => platformLabel[p] ?? p).join(" · ")} — {app.license}
                        </span>
                      </span>
                      <span className="hidden md:block text-[13.5px] text-ink-soft dark:text-[#a39e8f] max-w-[30ch] text-right leading-relaxed line-clamp-2">
                        {app.description[locale]}
                      </span>
                      <span className="row-arrow w-11 h-11 rounded-full border rule flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5" aria-hidden />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}

          {isFiltered && filteredApps.length > 0 && (
            <button
              onClick={() => {
                setFilter("all");
                setSearch("");
              }}
              className="mt-4 u-link text-[13.5px] text-ink-soft dark:text-[#cfc9b8]"
            >
              {t.catalog.reset} ({t.catalog.found}: {filteredApps.length})
            </button>
          )}
        </div>
      </section>

      {selectedApp && (
        <AppModal app={apps.find((a) => a.id === selectedApp)!} onClose={() => setSelectedApp(null)} />
      )}
    </>
  );
}
