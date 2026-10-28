import { useEffect, useState } from 'react'
import { fetchReleases, type ReleaseResult } from './github'

export function useReleases(repo: string | undefined) {
  const [state, setState] = useState<{ repo?: string; result: ReleaseResult } | null>(null)

  useEffect(() => {
    const ctrl = new AbortController()
    fetchReleases(repo, ctrl.signal)
      .then((result) => setState({ repo, result }))
      .catch(() => {})
    return () => ctrl.abort()
  }, [repo])

  const loading = state === null || state.repo !== repo
  return { loading, result: loading ? null : state.result }
}
