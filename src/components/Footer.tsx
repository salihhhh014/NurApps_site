"use client";

import { useI18n } from "./I18nProvider";
import { Github, Send } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 bg-ink dark:bg-paper text-paper dark:text-night flex items-center justify-center font-display font-bold rounded-lg">
              N
            </span>
            <span className="font-bold text-[17px] tabular-nums">NurApps · © {year}</span>
          </div>
          <p className="text-[13px] text-ink-soft dark:text-[#8f8a7a] max-w-[62ch] leading-relaxed">
            {t.footer.rights}
          </p>
        </div>

        <nav className="flex flex-wrap gap-2" aria-label={t.footer.contact}>
          <a
            href="https://github.com/NurApps"
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-4 rounded-xl border rule font-medium text-[14px] flex items-center gap-2 hover:bg-ink/5 dark:hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            <Github className="w-4 h-4" aria-hidden />
            {t.footer.open_source}
          </a>
          <a
            href="https://t.me/nurapps"
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-4 rounded-xl border rule font-medium text-[14px] flex items-center gap-2 hover:bg-ink/5 dark:hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            <Send className="w-4 h-4" aria-hidden />
            {t.footer.telegram}
          </a>
          <a
            href="/admin"
            rel="nofollow"
            className="h-11 px-4 rounded-xl font-medium text-[14px] text-ink-faint dark:text-[#8f8a7a] flex items-center hover:text-ink dark:hover:text-white transition-colors"
          >
            /admin
          </a>
        </nav>
      </div>
      <div className="border-t rule">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-x-2 text-[12.5px] text-ink-soft dark:text-[#8f8a7a]">
          <span>{t.footer.made_with}</span>
          <span aria-hidden>·</span>
          <span>{t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
