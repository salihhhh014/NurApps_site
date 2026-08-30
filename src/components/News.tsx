"use client";

import { useI18n } from "./I18nProvider";
import { news } from "@/config/news";
import { Calendar, ArrowRight } from "lucide-react";

export default function News() {
  const { t, locale } = useI18n();

  return (
    <section id="news" className="py-24 bg-gray-50/50 dark:bg-gray-900/50 geo-pattern">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{t.news.title}</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">{t.news.subtitle}</p>
        </div>

        {news.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500">{t.news.no_news}</p>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 hover:border-emerald-200 dark:hover:border-emerald-800/50 shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title[locale]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.content[locale]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
