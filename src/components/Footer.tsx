"use client";

import { useI18n } from "./I18nProvider";
import { Github, Heart } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="py-8 bg-gray-950 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
              N
            </div>
            <span className="text-sm text-gray-400">{t.footer.copyright}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              {t.footer.made_with} <Heart className="w-3.5 h-3.5 text-red-500" />
            </span>
            <a
              href="https://github.com/NurApps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors duration-150"
            >
              <Github className="w-4 h-4" />
              {t.footer.open_source}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
