import { useReleases } from '../lib/useReleases'
import { formatSize } from '../lib/github'

interface Props {
  repo?: string
  /** Show asset download links and release notes. */
  detailed?: boolean
}

const date = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString('en-GB', { dateStyle: 'medium' }) : 'unpublished')

export default function ReleaseList({ repo, detailed = false }: Props) {
  const { loading, result } = useReleases(repo)

  if (loading) return <p role="status">Loading releases…</p>
  if (!result || result.status === 'no-repo') return <p>No public repository for this project yet, so there are no releases to list.</p>
  if (result.status === 'not-found') return <p>The repository was not found on GitHub, or it has no public releases.</p>
  if (result.status === 'rate-limited')
    return (
      <p role="alert">
        GitHub's API rate limit was reached
        {result.resetAt ? `; try again after ${result.resetAt.toLocaleTimeString()}` : ''}. Releases are also listed on{' '}
        <a href={`https://github.com/${repo}/releases`}>GitHub</a>.
      </p>
    )
  if (result.status === 'error')
    return (
      <p role="alert">
        {result.message} See <a href={`https://github.com/${repo}/releases`}>GitHub</a> directly.
      </p>
    )
  if (result.releases.length === 0) return <p>No releases have been published.</p>

  return (
    <ul className="releases">
      {result.releases.map((r) => (
        <li key={r.id}>
          <h3>
            <a href={r.url}>{r.name}</a>
            {r.prerelease && <span className="tag">pre-release</span>}
          </h3>
          <p className="meta">
            {r.tag} · {date(r.publishedAt)}
          </p>
          {detailed && r.body && <pre className="notes">{r.body}</pre>}
          {detailed && r.assets.length > 0 && (
            <ul className="assets">
              {r.assets.map((a) => (
                <li key={a.name}>
                  <a href={a.url}>{a.name}</a> ({formatSize(a.size)})
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
