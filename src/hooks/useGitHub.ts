"use client";

import { useState, useEffect } from "react";
import { GitHubRepo, GitHubRelease, GitHubCommit, fetchRepo, fetchReleases, fetchRecentCommits, parseRepoString } from "@/lib/github";

export interface AppGitHubData {
  repo: GitHubRepo | null;
  releases: GitHubRelease[];
  commits: GitHubCommit[];
  loading: boolean;
  error: string | null;
}

export function useGitHub(repoStr: string): AppGitHubData {
  const [data, setData] = useState<AppGitHubData>({
    repo: null,
    releases: [],
    commits: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!repoStr) {
      setData({ repo: null, releases: [], commits: [], loading: false, error: null });
      return;
    }

    const parsed = parseRepoString(repoStr);
    if (!parsed) {
      setData({ repo: null, releases: [], commits: [], loading: false, error: "Invalid repo format" });
      return;
    }

    let cancelled = false;

    async function load() {
      setData(prev => ({ ...prev, loading: true, error: null }));
      const [repo, releases, commits] = await Promise.all([
        fetchRepo(parsed!.owner, parsed!.repo),
        fetchReleases(parsed!.owner, parsed!.repo),
        fetchRecentCommits(parsed!.owner, parsed!.repo),
      ]);
      if (!cancelled) {
        setData({ repo, releases, commits, loading: false, error: null });
      }
    }

    load();
    return () => { cancelled = true; };
  }, [repoStr]);

  return data;
}

export function useAllGitHubData(repos: string[]) {
  const [results, setResults] = useState<Record<string, AppGitHubData>>({});
  const key = repos.filter(Boolean).sort().join(",");

  useEffect(() => {
    const validRepos = key ? key.split(",") : [];
    if (validRepos.length === 0) return;

    let cancelled = false;
    const controller = new AbortController();

    async function loadAll() {
      // Показываем скелетон только для тех, кого ещё нет в выдаче.
      setResults((prev) => {
        const next = { ...prev };
        for (const r of validRepos) {
          if (!next[r]) {
            next[r] = { repo: null, releases: [], commits: [], loading: true, error: null };
          }
        }
        return next;
      });

      const entries = await Promise.all(
        validRepos.map(async (repoStr) => {
          const parsed = parseRepoString(repoStr);
          if (!parsed || controller.signal.aborted) {
            return [repoStr, { repo: null, releases: [], commits: [], loading: false, error: "Invalid repo" }] as const;
          }
          try {
            const [repo, releases, commits] = await Promise.all([
              fetchRepo(parsed.owner, parsed.repo),
              fetchReleases(parsed.owner, parsed.repo),
              fetchRecentCommits(parsed.owner, parsed.repo),
            ]);
            return [repoStr, { repo, releases, commits, loading: false, error: null }] as const;
          } catch {
            return [repoStr, { repo: null, releases: [], commits: [], loading: false, error: "Network error" }] as const;
          }
        })
      );
      if (!cancelled) {
        setResults(Object.fromEntries(entries));
      }
    }

    loadAll();
    return () => {
      cancelled = true;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return results;
}
