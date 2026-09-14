"use client";

import { useI18n } from "./I18nProvider";
import { AppInfo } from "@/config/apps";
import { X, Github, Send, Eye } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppModal({ app, onClose }: { app: AppInfo; onClose: () => void }) {
  const { t, locale } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const hasRepo = Boolean(app.repo || app.repos?.length);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={app.name}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-0 bg-black/55"
          onClick={onClose}
          aria-hidden
        />

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full sm:max-w-xl bg-paper dark:bg-night-soft sm:rounded-2xl rounded-t-2xl border rule max-h-[92vh] overflow-y-auto shadow-[0_32px_80px_-24px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-start gap-4 p-6 pb-5 border-b rule sticky top-0 bg-paper/95 dark:bg-night-soft/95 backdrop-blur z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={app.icon} alt="" width={60} height={60} className="w-[60px] h-[60px] rounded-2xl border rule shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-ink-soft dark:text-[#8f8a7a] mb-1">
                {app.platforms.join(" · ")}
              </p>
              <h3 className="font-display font-semibold text-[26px] leading-none mb-1">{app.name}</h3>
              <p className="text-[14px] font-medium">{app.tagline[locale]}</p>
              <p className="mono text-[12px] text-ink-faint dark:text-[#7d7869] mt-1 tabular-nums">
                {app.license}
                {app.latestVersion && app.latestVersion !== "dev" ? ` · v${app.latestVersion}` : ""}
              </p>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={t.catalog.close}
              className="w-10 h-10 shrink-0 rounded-lg border rule flex items-center justify-center hover:bg-ink/5 dark:hover:bg-white/10 active:scale-95 transition-all"
            >
              <X className="w-5 h-5" aria-hidden />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-[16px] leading-relaxed text-ink-soft dark:text-[#cfc9b8]">
              {app.description[locale]}
            </p>

            {app.status === "dev" && (
              <p className="border border-dashed rule rounded-xl px-4 py-3 text-[14px] text-ink-soft dark:text-[#cfc9b8]">
                {t.catalog.dev_note}
              </p>
            )}

            {hasRepo && (
              <p className="text-[13px] text-ink-soft dark:text-[#8f8a7a] leading-relaxed">
                {t.catalog.no_releases}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {app.repo && (
                <>
                  <a
                    href={`https://github.com/${app.repo}/releases`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-[52px] px-6 bg-pine dark:bg-amber text-paper dark:text-night rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-pine-deep dark:hover:bg-[#d6a13a] active:scale-[0.98] transition-all"
                  >
                    {t.catalog.download}
                  </a>
                  <a
                    href={`https://github.com/${app.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-[52px] px-6 rounded-xl font-semibold border border-ink/25 dark:border-white/25 flex items-center justify-center gap-2 hover:bg-ink/5 dark:hover:bg-white/10 active:scale-[0.98] transition-all"
                  >
                    <Github className="w-5 h-5" aria-hidden />
                    {t.catalog.source_code}
                  </a>
                </>
              )}
              {app.repos?.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-[52px] px-4 rounded-xl font-medium border border-ink/25 dark:border-white/25 flex items-center justify-center gap-2 hover:bg-ink/5 dark:hover:bg-white/10 active:scale-[0.98] transition-all"
                >
                  <Github className="w-5 h-5" aria-hidden />
                  {r.label}
                </a>
              ))}
              {!hasRepo && app.telegram && (
                <a
                  href={app.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-[52px] px-6 bg-pine dark:bg-amber text-paper dark:text-night rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-pine-deep active:scale-[0.98] transition-all"
                >
                  <Send className="w-5 h-5" aria-hidden />
                  {t.catalog.open_bot}
                </a>
              )}
              {!hasRepo && !app.telegram && (
                <span className="flex-1 h-[52px] px-6 rounded-xl border border-dashed rule text-[13px] flex items-center justify-center gap-2 text-ink-faint">
                  <Eye className="w-4 h-4" aria-hidden />
                  {t.catalog.watch}
                </span>
              )}
            </div>

            {app.website && (
              <a
                href={app.website}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link text-[13.5px] font-medium"
              >
                {app.website.replace("https://", "")} →
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
