export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  license: { spdx_id: string } | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
}

export interface GitHubRelease {
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string;
  prerelease: boolean;
  assets: {
    name: string;
    size: number;
    browser_download_url: string;
  }[];
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

const GITHUB_API = "https://api.github.com";

// Простое in-memory кэширование, чтобы не упираться в лимит 60 запр/час
// для анонимных запросов и не дёргать API на каждый ре-рендер.
const cache = new Map<string, { at: number; data: unknown }>();
const CACHE_TTL = 5 * 60 * 1000;

function cached<T>(key: string): T | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return hit.data as T;
}

function put(key: string, data: unknown) {
  if (cache.size > 200) cache.clear();
  cache.set(key, { at: Date.now(), data });
}

async function ghFetch(path: string): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "NurApps-site",
    };
    const token =
      process.env.NEXT_PUBLIC_GITHUB_TOKEN ||
      process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    return await fetch(`${GITHUB_API}${path}`, {
      headers,
      signal: controller.signal,
      next: { revalidate: 300 },
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchRepo(owner: string, repo: string): Promise<GitHubRepo | null> {
  const key = `repo:${owner}/${repo}`;
  const hit = cached<GitHubRepo>(key);
  if (hit) return hit;
  try {
    const res = await ghFetch(`/repos/${owner}/${repo}`);
    if (!res || !res.ok) return null;
    const data = (await res.json()) as GitHubRepo;
    put(key, data);
    return data;
  } catch {
    return null;
  }
}

export async function fetchReleases(owner: string, repo: string, limit = 5): Promise<GitHubRelease[]> {
  const key = `releases:${owner}/${repo}:${limit}`;
  const hit = cached<GitHubRelease[]>(key);
  if (hit) return hit;
  try {
    const res = await ghFetch(`/repos/${owner}/${repo}/releases?per_page=${limit}`);
    if (!res || !res.ok) return [];
    const data = (await res.json()) as GitHubRelease[];
    put(key, data);
    return data;
  } catch {
    return [];
  }
}

export async function fetchRecentCommits(owner: string, repo: string, limit = 10): Promise<GitHubCommit[]> {
  const key = `commits:${owner}/${repo}:${limit}`;
  const hit = cached<GitHubCommit[]>(key);
  if (hit) return hit;
  try {
    const res = await ghFetch(`/repos/${owner}/${repo}/commits?per_page=${limit}`);
    if (!res || !res.ok) return [];
    const data = (await res.json()) as GitHubCommit[];
    put(key, data);
    return data;
  } catch {
    return [];
  }
}

export function parseRepoString(repoStr: string): { owner: string; repo: string } | null {
  const parts = repoStr.split("/");
  if (parts.length !== 2) return null;
  return { owner: parts[0], repo: parts[1] };
}
