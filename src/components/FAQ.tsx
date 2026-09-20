"use client";

import { useI18n } from "./I18nProvider";
import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FAQ() {
  const { t, locale } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] mb-4">
            {t.faq.title}
          </h2>
          <p className="text-fg-secondary leading-relaxed max-w-[38ch]">
            {locale === "ru"
              ? "Коротко и без маркетолога. Если ответа нет — спросите в Issues, допишем."
              : "Short answers, no marketing. If something is missing — ask in Issues and we'll add it."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
          className="border-t border-border"
        >
          {t.faq.questions.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={i} className="border-b border-border">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full py-5 flex items-start gap-4 text-left group cursor-pointer"
                >
                  <span className="flex-1 font-medium text-[16px] leading-snug group-hover:text-accent transition-colors">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className={`w-8 h-8 shrink-0 rounded-md border border-border flex items-center justify-center transition-colors ${
                      open ? "bg-fg text-bg border-fg" : "text-fg-muted"
                    }`}
                  >
                    <Plus className="w-4 h-4" aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-2 text-[15px] leading-relaxed text-fg-secondary max-w-[60ch]">
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
