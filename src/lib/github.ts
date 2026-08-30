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

export async function fetchRepo(owner: string, repo: string): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchReleases(owner: string, repo: string, limit = 5): Promise<GitHubRelease[]> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/releases?per_page=${limit}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchRecentCommits(owner: string, repo: string, limit = 10): Promise<GitHubCommit[]> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=${limit}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export function parseRepoString(repoStr: string): { owner: string; repo: string } | null {
  const parts = repoStr.split("/");
  if (parts.length !== 2) return null;
  return { owner: parts[0], repo: parts[1] };
}
