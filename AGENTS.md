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
- `middleware.ts` (Basic-auth на `/admin/*`) работает только под `next start`, на статическом хостинге **не выполняется**. Не полагаться на него как на защиту статики.
- `public/robots.txt`, `public/sitemap.xml`, `public/manifest.webmanifest` закоммичены — при смене маршрутов править вручную.

## Architecture

- Entrypoints: `src/app/layout.tsx` (fonts, metadata, meta-теги), `src/app/page.tsx` (client-композиция секций), `src/app/admin/page.tsx` (client-дашборд GitHub).
- Контент — код, не CMS: `src/config/apps.ts` (каталог), `src/config/news.ts` (сейчас `[]`), `src/messages/ru.json|en.json` (строки UI).
- `src/components/*` — секции страницы (`Header`, `Hero`, `AppCatalog`, `AppModal`, `News`, ...). `page.tsx` задаёт их порядок.
- `src/lib/github.ts` + `src/hooks/useGitHub.ts` — весь живой GitHub. `src/lib/i18n.ts` — словарь поверх `src/messages/`.

## Conventions & gotchas

- i18n кастомный через `I18nProvider` (`useI18n()`, `t`, `locale`), default `ru`, localStorage `nurapps-locale`, авто-детект `navigator.language`. Зависимость `next-intl` в `package.json` **не используется** — не вводить её роутинг. Новый текст = оба ключа в `ru.json` + `en.json`; описания приложений — поля `{ru, en}` в `apps.ts`.
- Тема через `ThemeProvider`: `light | dark | system`, localStorage `nurapps-theme`, класс `.dark` на `<html>`. Tailwind v4: `@import "tailwindcss"`, `@custom-variant dark`, токены в `@theme` (`paper`, `ink`, `pine`, `amber`, `night`) в `src/app/globals.css`. Нет `tailwind.config`. Тёмные стили — только `dark:`-варианты.
- GitHub-клиент: fetch с abort 8s, in-memory кэш 5 мин, `next: {revalidate: 300}`. Без токена — лимит 60 запр/час; токен опционален (`NEXT_PUBLIC_GITHUB_TOKEN` / `GITHUB_TOKEN`). Все ошибки — soft-fail (`null` / `[]`), UI показывает скелетон/пусто. `parseRepoString` принимает только `owner/repo`.
- Добавление приложения: объект `AppInfo` в `apps.ts` (`repo` **или** `repos`, `platforms`, `status: stable|beta|dev`, иконка в `public/icons/`). `versions: []` — норма (релизы тянутся с GitHub).
- Admin: логин `admin`, пароль из `ADMIN_PASSWORD` (только `.env.local`, gitignored, fail-closed 503 если пуст). Сравнение пароля timing-safe.
