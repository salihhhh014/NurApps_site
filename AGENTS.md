# AGENTS.md — NurApps Site

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, статический каталог приложений. Лицензия GPL-3.0.

## Commands

- `npm install` / `npm run dev` / `npm run build` / `npm run lint` (`next lint`)
- Deploy-артефакт — `out/` после `npm run build`. Не редактировать `out/`, `.next/`, `node_modules/`.
- Тестов, CI, lint-конфига нет. Верификация = `npm run lint` + `npm run build`.
- Алиас `@/*` → `src/*` (см. `tsconfig.json`).

## Static export constraints (`next.config.ts`)

- `output: "export"`, `images.unoptimized: true`. Нет Server Actions / Route Handlers / ISR на хостинге — только статика.
- Кастомные headers Next игнорируются. Безопасность — мета-теги в `src/app/layout.tsx` + настройки хостинга (`X-Frame-Options: DENY`, `nosniff` на Cloudflare Pages / Vercel).
- `public/robots.txt`, `public/sitemap.xml`, `public/manifest.webmanifest` закоммичены — при смене маршрутов править вручную.

## Architecture

- Entrypoints: `src/app/layout.tsx` (fonts, metadata, meta-теги), `src/app/page.tsx` (client-композиция секций).
- Контент — код, не CMS: `src/config/apps.ts` (каталог), `src/config/news.ts` (сейчас `[]`), `src/messages/ru.json|en.json` (строки UI).
- `src/components/*` — секции страницы (`Header`, `Hero`, `AppCatalog`, `AppModal`, `News`, ...). `page.tsx` задаёт их порядок.
- `src/lib/i18n.ts` — словарь поверх `src/messages/`.

## Conventions & gotchas

- i18n кастомный через `I18nProvider` (`useI18n()`, `t`, `locale`), default `ru`, localStorage `nurapps-locale`, авто-детект `navigator.language`. Зависимость `next-intl` в `package.json` **не используется** — не вводить её роутинг. Новый текст = оба ключа в `ru.json` + `en.json`; описания приложений — поля `{ru, en}` в `apps.ts`.
- Тема через `ThemeProvider`: `light | dark | system`, localStorage `nurapps-theme`, класс `.dark` на `<html>`. Tailwind v4: `@import "tailwindcss"`, `@custom-variant dark`, токены в `@theme` (`bg`, `fg`, `border`, `accent`, `night`) в `src/app/globals.css`. Нет `tailwind.config`. Тёмные стили — только `dark:`-варианты.
- Добавление приложения: объект `AppInfo` в `apps.ts` (`repo` **или** `repos`, `platforms`, `status: stable|beta|dev`, иконка в `public/icons/`). `versions: []` — норма (релизы тянутся с GitHub вручную).
