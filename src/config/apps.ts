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
  latestVersion: string;
  versions: AppVersion[];
}

export const apps: AppInfo[] = [
  {
    id: "nurchat",
    name: "NurChat",
    description: {
      ru: "Безопасный мессенджер с сквозным шифрованием и открытым исходным кодом. Бета-версия.",
      en: "Secure messenger with end-to-end encryption and open-source code. Beta version."
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
    description: {
      ru: "Удобная программа для чтения книг с поддержкой множества форматов. Десктоп стабилен, мобильная версия в разработке.",
      en: "Convenient book reader supporting multiple formats. Desktop is stable, mobile in development."
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
    description: {
      ru: "Telegram-бот для удобного доступа к нашим приложениям и обновлениям.",
      en: "Telegram bot for easy access to our apps and updates."
    },
    icon: "/icons/nurstore.svg",
    license: "MIT",
    platforms: ["telegram"],
    status: "stable",
    category: "tools",
    latestVersion: "1.0.0",
    versions: []
  },
  {
    id: "byteculator",
    name: "Byteculator",
    description: {
      ru: "Мощный калькулятор с поддержкой научных вычислений. Десктоп и мобильная версии в разработке.",
      en: "Powerful calculator with scientific computation support. Desktop and mobile versions in development."
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
