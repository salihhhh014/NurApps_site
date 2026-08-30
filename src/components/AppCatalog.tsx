"use client";

import { useI18n } from "./I18nProvider";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { apps } from "@/config/apps";
import AppModal from "./AppModal";
import { Download, ExternalLink, Eye, Star, Search } from "lucide-react";

type Platform = "all" | "windows" | "android" | "linux" | "web";

export default function AppCatalog() {
  const { t, locale } = useI18n();
  const { resolvedTheme } = useTheme();
  const [filter, setFilter] = useState<Platform>("all");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const filteredApps = apps.filter((app) => {
    const matchesPlatform = filter === "all" || app.platforms.includes(filter as never);
    const matchesSearch =
      search === "" ||
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description[locale].toLowerCase().includes(search.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const platformFilters: { key: Platform; label: string }[] = [
    { key: "all", label: t.catalog.all },
    { key: "windows", label: t.catalog.windows },
    { key: "android", label: t.catalog.android },
    { key: "linux", label: t.catalog.linux },
    { key: "web", label: t.catalog.web },
  ];

  return (
    <>
      <section id="catalog" className="py-24 bg-gray-50/50 dark:bg-gray-900/50 geo-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{t.catalog.title}</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">{t.catalog.subtitle}</p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={locale === "ru" ? "Поиск приложений..." : "Search apps..."}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-150 shadow-soft"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {platformFilters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  filter === key
                    ? "bg-emerald-600 text-white shadow-soft"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredApps.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500 py-12">
              {locale === "ru" ? "Ничего не найдено" : "No results found"}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 hover:border-emerald-200 dark:hover:border-emerald-800/50 shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedApp(app.id)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-soft group-hover:bg-emerald-700 transition-colors duration-300">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                        {app.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-mono">
                          {app.license}
                        </span>
                        <span className="text-xs">v{app.latestVersion}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                    {app.description[locale]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {app.platforms.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-medium capitalize"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-700/50">
                    <span className="flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" />
                      {app.stats.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      {app.stats.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5" />
                      {app.stats.stars}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedApp && (
        <AppModal
          app={apps.find((a) => a.id === selectedApp)!}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </>
  );
}
