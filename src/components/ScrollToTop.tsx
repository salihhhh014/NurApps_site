"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useI18n } from "./I18nProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { locale } = useI18n();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVisible(window.scrollY > 600));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={locale === "ru" ? "Наверх" : "Back to top"}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-ink dark:bg-paper text-paper dark:text-night rounded-full shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
