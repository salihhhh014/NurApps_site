"use client";

import { useI18n } from "./I18nProvider";
import { Send } from "lucide-react";

export default function Newsletter() {
  const { locale } = useI18n();

  return (
    <section className="py-20 bg-emerald-600 dark:bg-emerald-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
          <Send className="w-4 h-4" />
          Telegram
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
          {locale === "ru" ? "Следите за обновлениями" : "Stay Updated"}
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          {locale === "ru"
            ? "Подпишитесь на наш Telegram-канал, чтобы не пропустить новые релизы и обновления."
            : "Subscribe to our Telegram channel to stay informed about new releases and updates."}
        </p>
        <a
          href="https://t.me/nurapps"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-soft"
        >
          <Send className="w-5 h-5" />
          {locale === "ru" ? "Подписаться" : "Subscribe"}
        </a>
      </div>
    </section>
  );
}
