"use client";

import { useI18n } from "./I18nProvider";
import { Code2, ShieldCheck, Recycle, MessagesSquare } from "lucide-react";
import { motion } from "framer-motion";

const icons = [Code2, ShieldCheck, Recycle, MessagesSquare];
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-16 sm:py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] leading-tight mb-5">
            {t.about.title}
          </h2>
          <p className="text-[17px] leading-relaxed text-fg-secondary max-w-[44ch]">
            {t.about.content}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
        >
          <h3 className="text-[15px] font-semibold text-fg-secondary mb-3">
            {t.about.values_title}
          </h3>
          <dl className="border-t border-border">
            {t.about.values.map((value, i) => {
              const Icon = icons[i % icons.length];
              const [head, ...rest] = value.split(" — ");
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
                  className="flex gap-4 py-5 border-b border-border last:border-0 group"
                >
                  <span className="w-9 h-9 shrink-0 rounded-lg border border-border flex items-center justify-center bg-bg-secondary group-hover:border-border-strong transition-colors">
                    <Icon className="w-4 h-4 text-fg-secondary" aria-hidden />
                  </span>
                  <div>
                    <dt className="font-medium text-[15px]">{head}</dt>
                    {rest.length > 0 && (
                      <dd className="text-[14px] text-fg-secondary mt-0.5">{rest.join(" — ")}</dd>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
