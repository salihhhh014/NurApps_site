"use client";

import { useI18n } from "./I18nProvider";
import { Github, Send } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-7 h-7 bg-fg text-bg flex items-center justify-center font-bold text-xs rounded-md">N</span>
            <span className="font-semibold text-[15px] tabular-nums">NurApps · © {year}</span>
          </div>
          <p className="text-[12.5px] text-fg-muted max-w-[62ch] leading-relaxed">
            {t.footer.rights}
          </p>
        </div>

        <nav className="flex flex-wrap gap-2" aria-label={t.footer.contact}>
          <a href="https://github.com/NurApps" target="_blank" rel="noopener noreferrer" className="h-9 px-3.5 rounded-md border border-border font-medium text-[13px] flex items-center gap-2 hover:bg-bg-secondary transition-colors cursor-pointer">
            <Github className="w-3.5 h-3.5" aria-hidden />
            {t.footer.open_source}
          </a>
          <a href="https://t.me/nurapps" target="_blank" rel="noopener noreferrer" className="h-9 px-3.5 rounded-md border border-border font-medium text-[13px] flex items-center gap-2 hover:bg-bg-secondary transition-colors cursor-pointer">
            <Send className="w-3.5 h-3.5" aria-hidden />
            {t.footer.telegram}
          </a>
          <a href="/admin" rel="nofollow" className="h-9 px-3.5 rounded-md font-medium text-[13px] text-fg-muted flex items-center hover:text-fg transition-colors">
            /admin
          </a>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-x-2 text-[12px] text-fg-muted">
          <span>{t.footer.made_with}</span>
          <span aria-hidden>·</span>
          <span>{t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
