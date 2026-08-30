"use client";

import { useI18n } from "./I18nProvider";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{t.faq.title}</h2>
        </div>

        <div className="space-y-3">
          {t.faq.questions.map((item, i) => (
            <div
              key={i}
              className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-colors duration-200 bg-gray-50/50 dark:bg-gray-900/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="flex items-center gap-3 text-gray-900 dark:text-white font-medium">
                  <HelpCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 pt-0">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-8">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
