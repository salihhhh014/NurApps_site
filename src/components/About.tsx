"use client";

import { useI18n } from "./I18nProvider";
import { Github, Heart } from "lucide-react";

export default function About() {
  const { t, locale } = useI18n();

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{t.about.title}</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-12 text-center">
            {t.about.content}
          </p>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t.about.values_title}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.about.values.map((value, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-xl bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/50"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
