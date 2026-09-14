"use client";

import { useI18n } from "./I18nProvider";
import { Send, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Newsletter() {
  const { locale } = useI18n();

  return (
    <section className="pb-16 sm:pb-24" aria-label="Telegram">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.99, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative overflow-hidden bg-pine dark:bg-amber text-paper dark:text-night rounded-[20px] px-6 py-10 sm:px-12 sm:py-12 grid md:grid-cols-[1fr_auto] gap-8 items-center"
        >
          <div aria-hidden className="absolute inset-0">
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px" }} />
            <div className="absolute -right-20 -top-24 w-[520px] h-[520px] rounded-full blur-[70px] opacity-[0.10]" style={{ background: "radial-gradient(50% 50% at 50% 50%, white 0%, transparent 65%)" }} />
          </div>
          <div className="relative">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight mb-3">
              {locale === "ru" ? "Релизы — одной строкой в Telegram" : "Releases as one-liners on Telegram"}
            </h2>
            <p className="opacity-80 text-[16px] leading-relaxed max-w-[52ch]">
              {locale === "ru"
                ? "Пишем только когда выходит сборка или ломается что-то важное. Раз в месяц — чаще нечего сказать."
                : "We post only when a build ships or something important breaks. Monthly at most."}
            </p>
            <p className="mt-3 text-[13px] opacity-60">
              {locale === "ru" ? "Без спама · отписаться можно в один тап" : "No spam · one-tap unsubscribe"}
            </p>
          </div>
          <motion.a
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            href="https://t.me/nurapps"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group h-[52px] px-8 bg-paper dark:bg-night text-ink dark:text-paper rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] transition-all shrink-0 cursor-pointer"
          >
            <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            {locale === "ru" ? "Читать канал" : "Join channel"}
            <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
