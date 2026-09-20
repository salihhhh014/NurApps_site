"use client";

import { useI18n } from "./I18nProvider";
import { Send, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Newsletter() {
  const { locale } = useI18n();

  return (
    <section className="pb-16 sm:pb-24" aria-label="Telegram">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="bg-bg-secondary border border-border rounded-lg px-6 py-10 sm:px-12 sm:py-12 grid md:grid-cols-[1fr_auto] gap-8 items-center"
        >
          <div>
            <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.02em] mb-3">
              {locale === "ru" ? "Релизы — одной строкой в Telegram" : "Releases as one-liners on Telegram"}
            </h2>
            <p className="text-fg-secondary text-[15px] leading-relaxed max-w-[52ch]">
              {locale === "ru"
                ? "Пишем только когда выходит сборка или ломается что-то важное. Раз в месяц — чаще нечего сказать."
                : "We post only when a build ships or something important breaks. Monthly at most."}
            </p>
            <p className="mt-2 text-[13px] text-fg-muted">
              {locale === "ru" ? "Без спама · отписаться в один тап" : "No spam · one-tap unsubscribe"}
            </p>
          </div>
          <motion.a
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="https://t.me/nurapps"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-11 px-7 bg-fg text-bg rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-fg/90 transition-colors shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            {locale === "ru" ? "Читать канал" : "Join channel"}
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
