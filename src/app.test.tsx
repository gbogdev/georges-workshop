import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { fetchReleases } from './lib/github'

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

describe('navigation', () => {
  it('renders home with the three projects', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1, name: 'Northstar Software' })).toBeInTheDocument()
    for (const name of ['TaskFlow', 'DevScope', 'FileForge'])
      expect(screen.getAllByRole('link', { name })[0]).toBeInTheDocument()
  })

  it('navigates to a product page and sets the title', async () => {
    renderAt('/')
    await userEvent.click(screen.getByRole('link', { name: 'Products' }))
    await userEvent.click(await screen.findByRole('link', { name: 'TaskFlow' }))
    expect(await screen.findByRole('heading', { level: 1, name: 'TaskFlow' })).toBeInTheDocument()
    expect(document.title).toBe('TaskFlow · Northstar Software')
  })

  it('shows not-found for unknown routes and products', async () => {
    renderAt('/products/nope')
    expect(await screen.findByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})

describe('fetchReleases', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('reports no-repo without fetching', async () => {
    const f = vi.fn()
    vi.stubGlobal('fetch', f)
    expect(await fetchReleases(undefined)).toEqual({ status: 'no-repo' })
    expect(f).not.toHaveBeenCalled()
  })

  it('maps rate limiting', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 403, headers: { 'x-ratelimit-reset': '1' } })))
    expect((await fetchReleases('a/rate')).status).toBe('rate-limited')
  })

  it('maps network errors and 404s', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')))
    expect((await fetchReleases('a/offline')).status).toBe('error')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 404 })))
    expect((await fetchReleases('a/missing')).status).toBe('not-found')
  })

  it('parses releases, skips drafts, and caches', async () => {
    const body = [
      { id: 1, tag_name: 'v1', name: null, html_url: 'u', published_at: null, prerelease: false, draft: false, body: null, assets: [] },
      { id: 2, tag_name: 'v0', name: 'x', html_url: 'u', published_at: null, prerelease: false, draft: true, body: '', assets: [] },
    ]
    const f = vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status: 200 }))
    vi.stubGlobal('fetch', f)
    const r = await fetchReleases('a/ok')
    expect(r.status === 'ok' && r.releases.map((x) => x.name)).toEqual(['v1'])
    await fetchReleases('a/ok')
    expect(f).toHaveBeenCalledTimes(1)
  })
})
