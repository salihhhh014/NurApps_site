"use client";

import { apps } from "@/config/apps";
import { useAllGitHubData } from "@/hooks/useGitHub";
import { useI18n } from "@/components/I18nProvider";
import { useTheme } from "@/components/ThemeProvider";
import { Star, GitFork, AlertCircle, Clock, RefreshCw, ExternalLink, Github, ArrowLeft, Lock } from "lucide-react";
import { useState, useEffect } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "changeme";

const statusColors = {
  stable: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  beta: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  dev: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const statusLabels = {
  stable: { ru: "Стабильная", en: "Stable" },
  beta: { ru: "Бета", en: "Beta" },
  dev: { ru: "В разработке", en: "In Development" },
};

function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("nurapps-admin");
    if (saved === ADMIN_PASSWORD) setAuthed(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem("nurapps-admin", input);
      setAuthed(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  if (authed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-elevated p-8 text-center">
          <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Admin Panel</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Введите пароль для доступа</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Пароль"
              autoFocus
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-center font-mono tracking-widest"
            />
            {error && (
              <p className="text-sm text-red-500">Неверный пароль</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-soft transition-all"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function getAllRepos(): string[] {
  const repos: string[] = [];
  for (const app of apps) {
    if (app.repo) repos.push(app.repo);
    if (app.repos) {
      for (const r of app.repos) {
        const match = r.url.match(/github\.com\/([^/]+\/[^/]+)/);
        if (match) repos.push(match[1]);
      }
    }
  }
  return repos;
}

function getRepoSlug(url: string): string | null {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
  return match ? match[1] : null;
}

export default function AdminPage() {
  const { t, locale } = useI18n();
  const { theme, setTheme } = useTheme();
  const [key, setKey] = useState(0);

  const allRepos = getAllRepos();
  const githubData = useAllGitHubData(allRepos);

  const totalStars = Object.values(githubData).reduce((acc, d) => acc + (d.repo?.stargazers_count ?? 0), 0);
  const totalForks = Object.values(githubData).reduce((acc, d) => acc + (d.repo?.forks_count ?? 0), 0);
  const totalIssues = Object.values(githubData).reduce((acc, d) => acc + (d.repo?.open_issues_count ?? 0), 0);

  function renderGitHubBlock(repoSlug: string) {
    const gh = githubData[repoSlug];
    if (!gh) return null;

    return (
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        {gh.loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <RefreshCw className="w-4 h-4 animate-spin" />
            {locale === "ru" ? "Загрузка данных GitHub..." : "Loading GitHub data..."}
          </div>
        ) : gh.repo ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-gray-600 dark:text-gray-400">{gh.repo.stargazers_count} stars</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GitFork className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">{gh.repo.forks_count} forks</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600 dark:text-gray-400">{gh.repo.open_issues_count} issues</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {new Date(gh.repo.pushed_at).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US")}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-400">
            {locale === "ru" ? "Репозиторий не найден" : "Repository not found"}
          </div>
        )}

        {gh.commits.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {locale === "ru" ? "Последние коммиты" : "Recent Commits"}
            </h4>
            <div className="space-y-2">
              {gh.commits.slice(0, 5).map((c) => (
                <div key={c.sha} className="flex items-start gap-3 text-sm">
                  <code className="text-xs text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded flex-shrink-0">
                    {c.sha.slice(0, 7)}
                  </code>
                  <div className="min-w-0">
                    <p className="text-gray-700 dark:text-gray-300 truncate">{c.commit.message}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {c.commit.author?.name} · {new Date(c.commit.author.date).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {gh.releases.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {locale === "ru" ? "Релизы" : "Releases"}
            </h4>
            <div className="space-y-2">
              {gh.releases.slice(0, 3).map((r) => (
                <div key={r.tag_name} className="flex items-center gap-3 text-sm">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-mono text-xs">
                    {r.tag_name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {new Date(r.published_at).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US")}
                  </span>
                  {r.prerelease && (
                    <span className="px-1.5 py-0.5 rounded text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      pre
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <AuthGate>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">{locale === "ru" ? "На сайт" : "To site"}</span>
              </a>
              <div className="h-5 w-px bg-gray-200 dark:bg-gray-800" />
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                {locale === "ru" ? "Админ-панель" : "Admin Panel"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setKey(k => k + 1)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all"
                title={locale === "ru" ? "Обновить данные" : "Refresh data"}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" key={key}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{apps.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.stats.total_apps}</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalStars}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.stats.total_stars}</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalForks}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Forks</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalIssues}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Issues</div>
          </div>
        </div>

        <div className="space-y-4">
          {apps.map((app) => {
            const allAppRepos: { label: string; slug: string }[] = [];
            if (app.repo) allAppRepos.push({ label: app.name, slug: app.repo });
            if (app.repos) {
              for (const r of app.repos) {
                const slug = getRepoSlug(r.url);
                if (slug) allAppRepos.push({ label: r.label, slug });
              }
            }

            return (
              <div key={app.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl font-bold shadow-soft flex-shrink-0">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{app.name}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                            {statusLabels[app.status][locale]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{app.description[locale]}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      {allAppRepos.map((r) => (
                        <a
                          key={r.slug}
                          href={`https://github.com/${r.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
                        >
                          <Github className="w-4 h-4" />
                          {r.label}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {allAppRepos.length > 0 ? (
                    allAppRepos.map((r) => (
                      <div key={r.slug}>
                        {allAppRepos.length > 1 && (
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mt-4 mb-1">{r.label}</h4>
                        )}
                        {renderGitHubBlock(r.slug)}
                      </div>
                    ))
                  ) : (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        {locale === "ru" ? "Нет публичного репозитория на GitHub" : "No public GitHub repository"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
    </AuthGate>
  );
}
