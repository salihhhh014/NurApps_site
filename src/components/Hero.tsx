"use client";

import { useI18n } from "./I18nProvider";
import { apps } from "@/config/apps";
import { ArrowDown, Github, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const { t, locale } = useI18n();

  const totalDownloads = apps.reduce((acc, app) => acc + app.stats.downloads, 0);
  const totalStars = apps.reduce((acc, app) => acc + app.stats.stars, 0);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />

      {/* Geometric decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circle */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-emerald-200/40 dark:border-emerald-800/20" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-emerald-200/20 dark:border-emerald-800/10 translate-x-8 translate-y-8" />

        {/* Small accent dots */}
        <div className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-emerald-400/60 dark:bg-emerald-500/40" />
        <div className="absolute top-1/3 right-[20%] w-1.5 h-1.5 rounded-full bg-teal-400/50 dark:bg-teal-500/30" />
        <div className="absolute bottom-1/4 left-[25%] w-1 h-1 rounded-full bg-emerald-500/40 dark:bg-emerald-400/30" />

        {/* Grid lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-200/30 dark:via-emerald-800/15 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-teal-200/20 dark:via-teal-800/10 to-transparent" />

        {/* Abstract shape */}
        <svg className="absolute bottom-20 left-10 w-64 h-64 text-emerald-100/50 dark:text-emerald-900/20" viewBox="0 0 200 200" fill="none">
          <path d="M100 0C155.228 0 200 44.772 200 100C200 155.228 155.228 200 100 200C44.772 200 0 155.228 0 100C0 44.772 44.772 0 100 0ZM100 50C72.3858 50 50 72.3858 50 100C50 127.614 72.3858 150 100 150C127.614 150 150 127.614 150 100C150 72.3858 127.614 50 100 50Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-8 border border-emerald-200/60 dark:border-emerald-800/40 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4" />
          {locale === "ru" ? "Открытый исходный код" : "Open Source"}
        </motion.div>

        {/* Title - weight-based emphasis, no gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        {/* Stats with refined design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-12 mb-12"
        >
          {[
            { value: apps.length, label: t.stats.total_apps },
            { value: totalDownloads.toLocaleString(), label: t.stats.total_downloads },
            { value: totalStars.toLocaleString(), label: t.stats.total_stars },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-soft hover:shadow-elevated transition-all duration-200 flex items-center gap-2"
          >
            {t.hero.explore_apps}
            <ArrowDown className="w-5 h-5" />
          </button>
          <a
            href="https://github.com/NurApps"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 shadow-soft"
          >
            <Github className="w-5 h-5" />
            {t.hero.github}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
