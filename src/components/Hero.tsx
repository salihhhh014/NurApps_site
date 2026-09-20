"use client";

import { useI18n } from "./I18nProvider";
import { apps } from "@/config/apps";
import { ArrowDown, Github, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const statusText: Record<string, { ru: string; en: string }> = {
  stable: { ru: "stable", en: "stable" },
  beta: { ru: "beta", en: "beta" },
  dev: { ru: "draft", en: "draft" },
};

const statusDot: Record<string, string> = {
  stable: "bg-green-500",
  beta: "bg-yellow-500",
  dev: "bg-neutral-400",
};

export default function Hero() {
  const { t, locale } = useI18n();
  const shouldReduce = useReducedMotion();

  return (
    <section id="hero" className="pt-[64px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden />
            <span className="text-[13px] font-medium text-fg-secondary">
              {locale === "ru" ? "Открытый код · без трекеров" : "Open source · zero trackers"}
            </span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
            }}
            className="text-[38px] leading-[1.08] sm:text-[52px] lg:text-[58px] font-semibold tracking-[-0.03em] mb-5"
          >
            {locale === "ru" ? (
              <>
                Программы,
                <br />
                которые можно{" "}
                <span className="text-accent">прочитать</span>.
              </>
            ) : (
              <>
                Software
                <br />
                you can <span className="text-accent">read</span>.
              </>
            )}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
            className="text-[16px] sm:text-[17px] leading-relaxed text-fg-secondary max-w-[50ch] mb-3"
          >
            {t.hero.description}
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
            className="text-[13px] text-fg-muted mb-8"
          >
            {t.hero.note}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
              className="h-11 px-6 bg-fg text-bg rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-fg/90 transition-colors cursor-pointer"
            >
              {t.hero.explore_apps}
              <ArrowDown className="w-4 h-4" aria-hidden />
            </button>
            <a
              href="https://github.com/NurApps"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-6 rounded-lg font-medium text-[15px] border border-border hover:border-border-strong hover:bg-bg-secondary flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Github className="w-4 h-4" aria-hidden />
              {t.hero.github}
            </a>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }}
            className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-[12.5px] text-fg-muted"
          >
            <span>MIT · AGPL-3.0</span>
            <span aria-hidden>·</span>
            <span>Releases on GitHub</span>
            <span aria-hidden>·</span>
            <span>Issues & Telegram</span>
          </motion.div>
        </motion.div>

        {/* Project list — simple, no decorative wrapper */}
        <motion.aside
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          aria-label={locale === "ru" ? "Проекты" : "Projects"}
          className="border border-border rounded-lg overflow-hidden"
        >
          <div className="px-4 py-2.5 border-b border-border bg-bg-secondary">
            <span className="text-[12.5px] font-medium text-fg-secondary">
              {locale === "ru" ? "Проекты" : "Projects"}
            </span>
          </div>
          <ul className="divide-y divide-border">
            {apps.map((app) => (
              <li key={app.id}>
                <button
                  onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-bg-secondary transition-colors group cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={app.icon} alt="" width={28} height={28} className="rounded-md shrink-0" loading="lazy" />
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="font-medium text-[14px] truncate">{app.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[app.status]}`} aria-hidden />
                      <span className="text-[11.5px] text-fg-muted">{statusText[app.status][locale]}</span>
                    </span>
                    <span className="block text-[12px] text-fg-secondary truncate">{app.tagline[locale]}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-fg-muted group-hover:text-fg transition-colors shrink-0" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
          <div className="px-4 py-2.5 border-t border-border flex items-center justify-between">
            <span className="text-[12px] text-fg-muted">{locale === "ru" ? "Без трекеров" : "No trackers"}</span>
            <a href="https://github.com/NurApps" target="_blank" rel="noopener noreferrer" className="u-link text-[12px] font-medium">
              github.com/NurApps
            </a>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
