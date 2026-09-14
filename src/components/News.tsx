"use client";

import { useI18n } from "./I18nProvider";
import { news } from "@/config/news";
import { Calendar } from "lucide-react";

// Пустой раздел не показываем вообще — лучше тишина, чем заглушка.
export default function News() {
  const { t, locale } = useI18n();

  if (news.length === 0) return null;

  return (
    <section id="news" className="py-16 sm:py-24 border-t rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-display font-semibold text-4xl sm:text-5xl tracking-tight mb-3">{t.news.title}</h2>
        <p className="text-[16px] text-ink-soft dark:text-[#cfc9b8] mb-10">{t.news.subtitle}</p>
        <div className="space-y-4">
          {news.map((item) => (
            <article key={item.id} className="border rule rounded-2xl p-6">
              <div className="flex items-center gap-2 text-[12.5px] text-ink-soft dark:text-[#8f8a7a] mb-2">
                <Calendar className="w-4 h-4" aria-hidden />
                <time className="tabular-nums">{item.date}</time>
              </div>
              <h3 className="font-display font-semibold text-2xl mb-2">{item.title[locale]}</h3>
              <p className="text-ink-soft leading-relaxed max-w-[70ch]">{item.content[locale]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
