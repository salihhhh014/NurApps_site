"use client";

import { useI18n } from "./I18nProvider";
import { news } from "@/config/news";
import { Calendar } from "lucide-react";

export default function News() {
  const { t, locale } = useI18n();

  if (news.length === 0) return null;

  return (
    <section id="news" className="py-16 sm:py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] mb-3">{t.news.title}</h2>
        <p className="text-[15px] text-fg-secondary mb-10">{t.news.subtitle}</p>
        <div className="space-y-3">
          {news.map((item) => (
            <article key={item.id} className="border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 text-[12.5px] text-fg-muted mb-2">
                <Calendar className="w-3.5 h-3.5" aria-hidden />
                <time className="tabular-nums">{item.date}</time>
              </div>
              <h3 className="font-semibold text-[18px] mb-2">{item.title[locale]}</h3>
              <p className="text-fg-secondary leading-relaxed max-w-[70ch]">{item.content[locale]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
