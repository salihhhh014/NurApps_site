"use client";

import { useI18n } from "./I18nProvider";
import { Code2, ShieldCheck, Recycle, MessagesSquare } from "lucide-react";
import { motion } from "framer-motion";

const icons = [Code2, ShieldCheck, Recycle, MessagesSquare];
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-16 sm:py-24 border-t rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="font-display font-semibold text-4xl sm:text-5xl tracking-tight leading-[1.05] mb-6">
            {t.about.title}
          </h2>
          <p className="font-display text-[20px] leading-relaxed text-ink-soft dark:text-[#cfc9b8] max-w-[44ch]">
            {t.about.content}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <h3 className="font-semibold text-[17px] mb-3">{t.about.values_title}</h3>
          <dl className="border-t rule">
            {t.about.values.map((value, i) => {
              const Icon = icons[i % icons.length];
              const [head, ...rest] = value.split(" — ");
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                  className="flex gap-4 py-5 border-b rule last:border-0 group"
                >
                  <span className="w-10 h-10 shrink-0 rounded-xl border rule flex items-center justify-center bg-paper-deep/40 dark:bg-white/[0.04] group-hover:border-ink/20 dark:group-hover:border-white/20 transition-colors">
                    <Icon className="w-5 h-5 text-pine dark:text-amber" aria-hidden />
                  </span>
                  <div>
                    <dt className="font-semibold text-[16px]">{head}</dt>
                    {rest.length > 0 && (
                      <dd className="text-[15px] text-ink-soft dark:text-[#cfc9b8] mt-0.5">{rest.join(" — ")}</dd>
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
