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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={locale === "ru" ? "Наверх" : "Back to top"}
          className="fixed bottom-5 right-5 z-50 w-10 h-10 bg-fg text-bg rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)] flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
