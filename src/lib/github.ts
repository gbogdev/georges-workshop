export interface Release {
  id: number
  tag: string
  name: string
  url: string
  publishedAt: string | null
  prerelease: boolean
  body: string
  assets: { name: string; url: string; size: number }[]
}

export type ReleaseResult =
  | { status: 'ok'; releases: Release[] }
  | { status: 'no-repo' }
  | { status: 'not-found' }
  | { status: 'rate-limited'; resetAt: Date | null }
  | { status: 'error'; message: string }

const TTL_MS = 10 * 60 * 1000
const memory = new Map<string, { at: number; value: ReleaseResult }>()

function readCache(repo: string): ReleaseResult | null {
  const hit = memory.get(repo)
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value
  try {
    const raw = window.sessionStorage.getItem(`releases:${repo}`)
    if (!raw) return null
    const { at, value } = JSON.parse(raw) as { at: number; value: ReleaseResult }
    return Date.now() - at < TTL_MS ? value : null
  } catch {
    return null
  }
}

function writeCache(repo: string, value: ReleaseResult) {
  const entry = { at: Date.now(), value }
  memory.set(repo, entry)
  try {
    window.sessionStorage.setItem(`releases:${repo}`, JSON.stringify(entry))
  } catch {
    /* storage unavailable; memory cache still works */
  }
}

interface ApiRelease {
  id: number
  tag_name: string
  name: string | null
  html_url: string
  published_at: string | null
  prerelease: boolean
  draft: boolean
  body: string | null
  assets: { name: string; browser_download_url: string; size: number }[]
}

/** Only https links are rendered as hrefs (guards against javascript: URLs in API or cached data). */
export const safeUrl = (u: string) => (/^https:\/\//i.test(u) ? u : '#')

export async function fetchReleases(repo: string | undefined, signal?: AbortSignal): Promise<ReleaseResult> {
  if (!repo) return { status: 'no-repo' }
  const cached = readCache(repo)
  if (cached) return cached

  const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined
  let result: ReleaseResult
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=20`, {
      signal,
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (res.status === 404) {
      result = { status: 'not-found' }
    } else if (res.status === 429 || (res.status === 403 && (res.headers.get('x-ratelimit-remaining') === '0' || res.headers.has('retry-after')))) {
      const reset = res.headers.get('x-ratelimit-reset')
      result = { status: 'rate-limited', resetAt: reset ? new Date(Number(reset) * 1000) : null }
    } else if (!res.ok) {
      result = { status: 'error', message: `GitHub returned ${res.status}.` }
    } else {
      const data = (await res.json()) as ApiRelease[]
      result = {
        status: 'ok',
        releases: data
          .filter((r) => !r.draft)
          .map((r) => ({
            id: r.id,
            tag: r.tag_name,
            name: r.name || r.tag_name,
            url: safeUrl(r.html_url),
            publishedAt: r.published_at,
            prerelease: r.prerelease,
            body: r.body ?? '',
            assets: r.assets.map((a) => ({ name: a.name, url: safeUrl(a.browser_download_url), size: a.size })),
          })),
      }
    }
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') throw e
    return { status: 'error', message: 'Could not reach GitHub.' }
  }
  // Cache definitive answers only, not transient failures.
  if (result.status === 'ok' || result.status === 'not-found') writeCache(repo, result)
  return result
}

export const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
