"use client";

import { useI18n } from "./I18nProvider";
import { AppInfo } from "@/config/apps";
import { X, ExternalLink, Github } from "lucide-react";

const statusColors = {
  stable: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  beta: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  dev: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const statusLabels = {
  stable: { ru: "Стабильная", en: "Stable" },
  beta: { ru: "Бета", en: "Beta" },
  dev: { ru: "В разработке", en: "In Development" },
};

export default function AppModal({ app, onClose }: { app: AppInfo; onClose: () => void }) {
  const { t, locale } = useI18n();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 p-6 flex items-start justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-3xl font-bold shadow-soft">
              {app.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{app.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                  {statusLabels[app.status][locale]}
                </span>
              </div>
              <span className="text-sm text-gray-400 dark:text-gray-500 font-mono">{app.license}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{app.description[locale]}</p>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t.catalog.platforms}</h4>
            <div className="flex flex-wrap gap-2">
              {app.platforms.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium capitalize"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {app.repo && (
              <>
                <a
                  href={`https://github.com/${app.repo}/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-soft transition-all flex items-center justify-center gap-2"
                >
                  {t.catalog.download}
                </a>
                <a
                  href={`https://github.com/${app.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  {t.catalog.source_code}
                </a>
              </>
            )}
            {!app.repo && app.website && (
              <a
                href={app.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                {locale === "ru" ? "Открыть" : "Open"}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
