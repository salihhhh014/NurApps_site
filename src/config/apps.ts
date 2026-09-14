export interface AppVersion {
  version: string;
  date: string;
  size: string;
  downloads: {
    windows?: string;
    android?: string;
    linux?: string;
  };
  changelog?: string;
}

export interface AppInfo {
  id: string;
  name: string;
  tagline: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  icon: string;
  repo?: string;
  repos?: { label: string; url: string }[];
  license: string;
  platforms: ("windows" | "android" | "linux" | "web" | "telegram")[];
  status: "stable" | "beta" | "dev";
  category: string;
  website?: string;
  telegram?: string;
  latestVersion: string;
  versions: AppVersion[];
}

export const apps: AppInfo[] = [
  {
    id: "nurchat",
    name: "NurChat",
    tagline: {
      ru: "Мессенджер, который не читает вас",
      en: "A messenger that doesn't read you",
    },
    description: {
      ru: "Сквозное шифрование, никаких телефонов в базе для чтения. Сейчас — публичная бета: веб работает, десктоп и Android догоняют.",
      en: "End-to-end encryption, no phone harvesting. Now in public beta: web works, desktop and Android are catching up."
    },
    icon: "/icons/nurchat.svg",
    repo: "NurApps/NurChat",
    license: "AGPL-3.0",
    platforms: ["windows", "android", "linux", "web"],
    status: "beta",
    category: "communication",
    website: "https://chat.nurapps.dev",
    latestVersion: "beta",
    versions: []
  },
  {
    id: "nurbooks",
    name: "NurBooks",
    tagline: {
      ru: "Читалка без мусора",
      en: "A reader without clutter",
    },
    description: {
      ru: "EPUB, FB2, PDF — с запоминанием места и ночной темой. Десктоп можно ставить, мобильная версия ещё собирается.",
      en: "EPUB, FB2, PDF — with reading position and night mode. Desktop is installable, mobile is still being built."
    },
    icon: "/icons/nurbooks.svg",
    repos: [
      { label: "Desktop", url: "https://github.com/NurApps/NurBooks_desktop" },
      { label: "Mobile", url: "https://github.com/NurApps/NurBooks_mobile" },
    ],
    license: "MIT",
    platforms: ["windows", "linux", "android"],
    status: "stable",
    category: "media",
    latestVersion: "1.0.0",
    versions: []
  },
  {
    id: "nurstore",
    name: "NurStore",
    tagline: {
      ru: "Все релизы — в одном боте",
      en: "Every release in one bot",
    },
    description: {
      ru: "Telegram-бот: присылает сборки и новости обновлений, когда не хочется следить за GitHub.",
      en: "Telegram bot: sends builds and update notes for those who don't want to watch GitHub."
    },
    icon: "/icons/nurstore.svg",
    license: "MIT",
    platforms: ["telegram"],
    status: "stable",
    category: "tools",
    telegram: "https://t.me/nurapps_bot",
    latestVersion: "1.0.0",
    versions: []
  },
  {
    id: "byteculator",
    name: "Byteculator",
    tagline: {
      ru: "Калькулятор для тех, кто считает",
      en: "A calculator for people who count",
    },
    description: {
      ru: "Инженерные функции и история вычислений. Пока черновик: исходников ещё нет, скачать нечего — но можно следить.",
      en: "Engineering functions and history. Still a draft: no public source yet, nothing to download — but worth watching."
    },
    icon: "/icons/byteculator.svg",
    license: "MIT",
    platforms: ["windows", "linux", "android"],
    status: "dev",
    category: "tools",
    latestVersion: "dev",
    versions: []
  }
];
