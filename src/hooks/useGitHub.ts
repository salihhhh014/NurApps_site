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

  useEffect(() => {
    const validRepos = repos.filter(Boolean);
    if (validRepos.length === 0) return;

    let cancelled = false;

    async function loadAll() {
      const entries = await Promise.all(
        validRepos.map(async (repoStr) => {
          const parsed = parseRepoString(repoStr);
          if (!parsed) return [repoStr, { repo: null, releases: [], commits: [], loading: false, error: "Invalid repo" }] as const;
          const [repo, releases, commits] = await Promise.all([
            fetchRepo(parsed.owner, parsed.repo),
            fetchReleases(parsed.owner, parsed.repo),
            fetchRecentCommits(parsed.owner, parsed.repo),
          ]);
          return [repoStr, { repo, releases, commits, loading: false, error: null }] as const;
        })
      );
      if (!cancelled) {
        setResults(Object.fromEntries(entries));
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, [repos.join(",")]);

  return results;
}
