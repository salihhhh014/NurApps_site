"use client";

import { useI18n } from "./I18nProvider";
import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FAQ() {
  const { t, locale } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 border-t rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="font-display font-semibold text-4xl sm:text-5xl tracking-tight mb-4">
            {t.faq.title}
          </h2>
          <p className="text-ink-soft dark:text-[#cfc9b8] leading-relaxed max-w-[38ch]">
            {locale === "ru"
              ? "Коротко и без маркетолога. Если ответа нет — спросите в Issues, допишем."
              : "Short answers, no marketing. If something is missing — ask in Issues and we'll add it."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className="border-t rule"
        >
          {t.faq.questions.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={i} className="border-b rule">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full py-5 flex items-start gap-4 text-left group cursor-pointer"
                >
                  <span className="flex-1 font-semibold text-[17px] leading-snug group-hover:underline underline-offset-4 decoration-amber/60 decoration-1">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    className={`w-9 h-9 shrink-0 rounded-full border rule flex items-center justify-center transition-colors ${
                      open ? "bg-ink text-paper border-ink dark:bg-paper dark:text-night dark:border-paper" : "group-hover:border-ink/30 dark:group-hover:border-white/30"
                    }`}
                  >
                    <Plus className="w-5 h-5" aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-2 text-[16px] leading-relaxed text-ink-soft dark:text-[#cfc9b8] max-w-[60ch]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
