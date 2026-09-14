"use client";

import { useI18n } from "./I18nProvider";
import { apps } from "@/config/apps";
import { ArrowDown, Github, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const statusText: Record<string, { ru: string; en: string }> = {
  stable: { ru: "Стабильно", en: "Stable" },
  beta: { ru: "Бета", en: "Beta" },
  dev: { ru: "Черновик", en: "Draft" },
};

const statusDot: Record<string, string> = {
  stable: "bg-emerald-500",
  beta: "bg-amber",
  dev: "bg-ink-faint",
};

export default function Hero() {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, shouldReduce ? 0 : 36]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, shouldReduce ? 1 : 0.85]);

  return (
    <section ref={ref} id="hero" className="relative pt-[68px] overflow-hidden isolate">
      {/* Стартап-фон: сетка + мягкий радиальный вош как у Vercel/Linear */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-dot opacity-[0.55]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper dark:to-night" />
        <div className="absolute -top-24 right-[-15%] w-[720px] h-[520px] rounded-full blur-[90px] opacity-[0.08] dark:opacity-[0.12]" style={{ background: "radial-gradient(40% 60% at 50% 50%, var(--color-amber) 0%, transparent 70%)" }} />
        <div className="absolute top-[18%] left-[-10%] w-[520px] h-[420px] rounded-full blur-[80px] opacity-[0.06] dark:opacity-[0.10]" style={{ background: "radial-gradient(50% 50% at 50% 50%, var(--color-pine) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10 sm:pb-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-start">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } }}
          style={{ opacity }}
        >
          {/* Eyebrow pill — стартап-приём вместо mono-строки */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            className="inline-flex items-center gap-2 rounded-full border rule bg-paper/70 dark:bg-white/[0.06] backdrop-blur px-3 py-1.5 mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
            <span className="text-[12.5px] font-medium tracking-tight text-ink-soft dark:text-[#cfc9b8]">
              {locale === "ru" ? "Исходники на GitHub · без трекеров" : "Sources on GitHub · zero trackers"}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 ml-1 pl-2 border-l rule">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden />
              <span className="text-[12px] text-ink-faint dark:text-[#8f8a7a]">4 projects</span>
            </span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.68, ease: EASE } },
            }}
            className="font-display font-semibold text-[42px] leading-[0.98] sm:text-[60px] lg:text-[66px] tracking-[-0.03em] mb-5"
          >
            {locale === "ru" ? (
              <>
                Программы,
                <br />
                которые можно{" "}
                <em className="font-display italic font-medium tracking-[-0.02em]">прочитать</em>
                <span className="text-amber" aria-hidden>.</span>
              </>
            ) : (
              <>
                Software
                <br />
                you can <em className="font-display italic font-medium">read</em>
                <span className="text-amber" aria-hidden>.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
            className="text-[17px] sm:text-[18px] leading-relaxed text-ink-soft dark:text-[#cfc9b8] max-w-[52ch] mb-3"
          >
            {t.hero.description}
          </motion.p>
          <motion.p
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, ease: EASE } } }}
            className="text-[13.5px] text-ink-faint dark:text-[#8f8a7a] mb-2"
          >
            {t.hero.note}
          </motion.p>
          <motion.p
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, ease: EASE } } }}
            className="text-[13px] text-ink-soft dark:text-[#8f8a7a] mb-8 flex flex-wrap gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border rule px-2.5 py-1 bg-paper-deep/50 dark:bg-white/[0.04]">{t.hero.meta}</span>
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
              className="group h-[52px] px-7 bg-pine dark:bg-amber text-paper dark:text-night rounded-xl font-semibold text-[16px] flex items-center justify-center gap-2 glow-amber hover:bg-pine-deep dark:hover:bg-[#d6a13a] transition-colors cursor-pointer"
            >
              {t.hero.explore_apps}
              <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
            </motion.button>
            <motion.a
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              href="https://github.com/NurApps"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[52px] px-7 rounded-xl font-semibold text-[16px] border border-ink/20 dark:border-white/20 hover:border-ink dark:hover:border-white hover:bg-ink/[0.04] dark:hover:bg-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Github className="w-5 h-5" aria-hidden />
              {t.hero.github}
              <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden />
            </motion.a>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, ease: EASE } } }}
            className="mt-8 flex flex-wrap gap-3 text-[12.5px] text-ink-soft dark:text-[#8f8a7a]"
          >
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pine dark:bg-amber" aria-hidden /> MIT · AGPL-3.0
            </span>
            <span aria-hidden>·</span>
            <span>Releases on GitHub</span>
            <span aria-hidden>·</span>
            <span>Issues & Telegram</span>
          </motion.div>
        </motion.div>

        {/* Правая панель — окно как у стартап-демо (а не терминальный сленг) */}
        <motion.aside
          style={{ y: shouldReduce ? 0 : y }}
          initial={{ opacity: 0, y: 22, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
          aria-label={locale === "ru" ? "Окно проектов" : "Projects window"}
          className="card-startup overflow-hidden mt-1 lg:mt-2 will-change-transform"
        >
          <div className="h-9 flex items-center gap-1.5 px-4 border-b rule bg-paper-deep/40 dark:bg-white/[0.03]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10" aria-hidden />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10" aria-hidden />
            <span className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10" aria-hidden />
            <span className="ml-3 text-[12px] font-medium text-ink-faint dark:text-[#8f8a7a] truncate">nurapps — 4 projects</span>
            <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[11px] text-ink-faint dark:text-[#8f8a7a]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden /> {locale === "ru" ? "без трекеров" : "no trackers"}
            </span>
          </div>
          <div className="p-2 sm:p-3 bg-gradient-to-b from-transparent to-paper-deep/20 dark:to-white/[0.02]">
            <ul className="rounded-xl overflow-hidden border rule bg-paper dark:bg-night">
              {apps.map((app) => (
                <li key={app.id} className="border-b rule last:border-0">
                  <button
                    onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full flex items-center gap-3 px-3.5 py-3 text-left hover:bg-ink/[0.04] dark:hover:bg-white/[0.06] transition-colors group cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={app.icon} alt="" width={32} height={32} className="rounded-lg shrink-0 border rule" loading="lazy" />
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="font-semibold text-[14.5px] leading-none truncate">{app.name}</span>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[app.status]}`} aria-hidden />
                        <span className="text-[11.5px] text-ink-soft dark:text-[#8f8a7a] truncate hidden sm:inline">{statusText[app.status][locale]}</span>
                      </span>
                      <span className="block text-[12px] text-ink-soft dark:text-[#a39e8f] truncate">{app.tagline[locale]} · {app.license}</span>
                    </span>
                    <span className="hidden md:block text-[11px] font-mono text-ink-faint dark:text-[#7d7869] px-2 py-1 rounded-full border rule bg-paper-deep/60 dark:bg-white/[0.04] shrink-0">
                      {app.platforms.slice(0, 2).join(" · ")}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-ink dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-[12px] text-ink-soft dark:text-[#8f8a7a]">{locale === "ru" ? "Сборки — в Releases на GitHub" : "Builds — in GitHub Releases"}</span>
              <a href="https://github.com/NurApps" target="_blank" rel="noopener noreferrer" className="u-link text-[12px] font-medium cursor-pointer">
                github.com/NurApps
              </a>
            </div>
          </div>
        </motion.aside>
      </div>

      <div className="border-t rule">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-x-2 gap-y-1 text-[12.5px] text-ink-soft dark:text-[#8f8a7a]">
          <span>{locale === "ru" ? "Лицензии MIT и AGPL-3.0" : "MIT and AGPL-3.0 licenses"}</span>
          <span aria-hidden>·</span>
          <span>{locale === "ru" ? "Сборки в Releases на GitHub" : "Builds in GitHub Releases"}</span>
          <span aria-hidden>·</span>
          <span>{locale === "ru" ? "Связь через Issues и Telegram" : "Contact via Issues and Telegram"}</span>
        </div>
      </div>
    </section>
  );
}
