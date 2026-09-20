"use client";

import { useI18n } from "./I18nProvider";
import { useState, useMemo } from "react";
import { apps } from "@/config/apps";
import AppModal from "./AppModal";
import { Search, ArrowUpRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type Platform = "all" | "windows" | "android" | "linux" | "web" | "telegram";

const statusStyle: Record<string, string> = {
  stable: "text-green-600 border-green-200 dark:text-green-400 dark:border-green-800",
  beta: "text-yellow-700 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800",
  dev: "text-fg-muted border-border",
};

const platformLabel: Record<string, string> = {
  windows: "Windows",
  android: "Android",
  linux: "Linux",
  web: "Web",
  telegram: "Telegram",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-wrap items-end justify-between gap-4 mb-3"
          >
            <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em]">
              {t.catalog.title}
            </h2>
            <p className="text-[13px] text-fg-muted tabular-nums" role="status" aria-live="polite">
              {t.catalog.found}: {filteredApps.length}/{apps.length}
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="text-[15px] text-fg-secondary leading-relaxed mb-8 max-w-[60ch]"
          >
            {t.catalog.subtitle}
          </motion.p>

          <div className="flex flex-col lg:flex-row gap-3 lg:items-center mb-6">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted" aria-hidden />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={locale === "ru" ? "Найти: чат, книги, калькулятор…" : "Search: chat, books, calculator…"}
                aria-label={locale === "ru" ? "Поиск по программам" : "Search apps"}
                maxLength={80}
                className="w-full h-10 pl-10 pr-9 bg-transparent border border-border rounded-md text-[14px] placeholder:text-fg-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label={locale === "ru" ? "Очистить поиск" : "Clear search"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded text-fg-muted hover:text-fg hover:bg-bg-secondary"
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
                      className={`relative h-9 px-3.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer ${
                        active
                          ? "text-bg"
                          : "text-fg-secondary hover:bg-bg-secondary"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="catalog-filter-pill"
                          transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.8 }}
                          className="absolute inset-0 bg-fg rounded-md"
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
            <div className="border border-border border-dashed rounded-lg px-6 py-14 text-center">
              <p className="text-xl font-medium mb-2">{t.catalog.empty_title}</p>
              <p className="text-fg-secondary mb-6">{t.catalog.empty_hint}</p>
              <button
                onClick={() => { setFilter("all"); setSearch(""); }}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-md border border-border font-medium text-[14px] hover:bg-bg-secondary transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden />
                {t.catalog.reset}
              </button>
            </div>
          ) : (
            <motion.ul layout className="border-t border-border">
              <AnimatePresence initial={false} mode="popLayout">
                {filteredApps.map((app) => (
                  <motion.li
                    layout
                    key={app.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="border-b border-border"
                  >
                    <button
                      onClick={() => setSelectedApp(app.id)}
                      aria-haspopup="dialog"
                      className="row-lift w-full grid grid-cols-[auto_1fr_auto] sm:grid-cols-[48px_1fr_auto_auto] items-center gap-3 sm:gap-4 py-4 text-left group cursor-pointer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={app.icon}
                        alt=""
                        width={48}
                        height={48}
                        loading="lazy"
                        className="w-12 h-12 rounded-lg border border-border"
                      />
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-0.5">
                          <span className="font-medium text-[17px] leading-tight">
                            {app.name}
                          </span>
                          <span className={`stamp ${statusStyle[app.status]}`}>{statusLabel(app.status)}</span>
                        </span>
                        <span className="block text-[14px] text-fg-secondary truncate">
                          {app.tagline[locale]}
                        </span>
                        <span className="block text-[12px] text-fg-muted truncate mt-0.5">
                          {app.platforms.map((p) => platformLabel[p] ?? p).join(" · ")} — {app.license}
                        </span>
                      </span>
                      <span className="hidden md:block text-[13px] text-fg-muted max-w-[30ch] text-right leading-relaxed line-clamp-2">
                        {app.description[locale]}
                      </span>
                      <span className="row-arrow w-9 h-9 rounded-md border border-border flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4" aria-hidden />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}

          {isFiltered && filteredApps.length > 0 && (
            <button
              onClick={() => { setFilter("all"); setSearch(""); }}
              className="mt-4 u-link text-[13px] text-fg-secondary"
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
