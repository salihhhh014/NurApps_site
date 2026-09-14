import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
// Статический экспорт: кастомные headers Next игнорирует,
// поэтому безопасность закрываем мета-тегами в layout + настройками хостинга.
// (Cloudflare Pages / Vercel: добавить X-Frame-Options DENY, nosniff.)
};

export default nextConfig;
