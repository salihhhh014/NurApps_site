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
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={app.name}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full sm:max-w-lg bg-bg dark:bg-night-soft sm:rounded-lg rounded-t-lg border border-border max-h-[92vh] overflow-y-auto shadow-[0_16px_48px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-start gap-4 p-5 pb-4 border-b border-border sticky top-0 bg-bg/95 dark:bg-night-soft/95 backdrop-blur z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={app.icon} alt="" width={56} height={56} className="w-14 h-14 rounded-lg border border-border shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-fg-muted mb-1">{app.platforms.join(" · ")}</p>
              <h3 className="font-semibold text-[20px] leading-tight mb-1">{app.name}</h3>
              <p className="text-[13px] text-fg-secondary">{app.tagline[locale]}</p>
              <p className="mono text-[11px] text-fg-muted mt-1 tabular-nums">
                {app.license}{app.latestVersion && app.latestVersion !== "dev" ? ` · v${app.latestVersion}` : ""}
              </p>
            </div>
            <button ref={closeRef} onClick={onClose} aria-label={t.catalog.close} className="w-8 h-8 shrink-0 rounded-md border border-border flex items-center justify-center hover:bg-bg-secondary cursor-pointer">
              <X className="w-4 h-4" aria-hidden />
            </button>
          </div>

          <div className="p-5 space-y-5">
            <p className="text-[15px] leading-relaxed text-fg-secondary">{app.description[locale]}</p>

            {app.status === "dev" && (
              <p className="border border-dashed border-border rounded-md px-3 py-2.5 text-[13px] text-fg-secondary">
                {t.catalog.dev_note}
              </p>
            )}

            {hasRepo && (
              <p className="text-[12.5px] text-fg-muted leading-relaxed">{t.catalog.no_releases}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5">
              {app.repo && (
                <>
                  <a href={`https://github.com/${app.repo}/releases`} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 px-5 bg-fg text-bg rounded-md font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-fg/90 transition-colors cursor-pointer">
                    {t.catalog.download}
                  </a>
                  <a href={`https://github.com/${app.repo}`} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 px-5 rounded-md font-medium border border-border text-[14px] flex items-center justify-center gap-2 hover:bg-bg-secondary transition-colors cursor-pointer">
                    <Github className="w-4 h-4" aria-hidden />
                    {t.catalog.source_code}
                  </a>
                </>
              )}
              {app.repos?.map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 px-4 rounded-md font-medium border border-border text-[14px] flex items-center justify-center gap-2 hover:bg-bg-secondary transition-colors cursor-pointer">
                  <Github className="w-4 h-4" aria-hidden />
                  {r.label}
                </a>
              ))}
              {!hasRepo && app.telegram && (
                <a href={app.telegram} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 px-5 bg-fg text-bg rounded-md font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-fg/90 transition-colors cursor-pointer">
                  <Send className="w-4 h-4" aria-hidden />
                  {t.catalog.open_bot}
                </a>
              )}
              {!hasRepo && !app.telegram && (
                <span className="flex-1 h-10 px-5 rounded-md border border-dashed border-border text-[13px] flex items-center justify-center gap-2 text-fg-muted">
                  <Eye className="w-3.5 h-3.5" aria-hidden />
                  {t.catalog.watch}
                </span>
              )}
            </div>

            {app.website && (
              <a href={app.website} target="_blank" rel="noopener noreferrer" className="u-link text-[13px] font-medium">
                {app.website.replace("https://", "")} →
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
