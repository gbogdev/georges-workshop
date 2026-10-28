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
  // Pages are lazy-loaded; warm the module graph so cold transforms don't eat the test timeout.
  beforeAll(() => Promise.all([import('./pages/Products'), import('./pages/ProductPage'), import('./pages/NotFound')]), 60000)

  it('renders home with the three projects', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1, name: 'Northstar Software' })).toBeInTheDocument()
    for (const name of ['TaskFlow', 'DevScope', 'FileForge'])
      expect(screen.getAllByRole('link', { name })[0]).toBeInTheDocument()
  })

  it('navigates to a product page and sets the title', async () => {
    renderAt('/')
    await userEvent.click(screen.getByRole('link', { name: 'Products' }))
    await screen.findByRole('heading', { level: 1, name: 'Products' }, { timeout: 5000 })
    await userEvent.click(await screen.findByRole('link', { name: 'TaskFlow' }, { timeout: 5000 }))
    expect(await screen.findByRole('heading', { level: 1, name: 'TaskFlow' }, { timeout: 5000 })).toBeInTheDocument()
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
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 403, headers: { 'x-ratelimit-remaining': '0', 'x-ratelimit-reset': '1' } })))
    expect((await fetchReleases('a/rate')).status).toBe('rate-limited')
  })

  it('treats a plain 403 as an error, not a rate limit', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 403 })))
    expect((await fetchReleases('a/forbidden')).status).toBe('error')
  })

  it('replaces non-https links from the API', async () => {
    const body = [{ id: 3, tag_name: 'v1', name: 'v1', html_url: 'javascript:alert(1)', published_at: null, prerelease: false, draft: false, body: '', assets: [{ name: 'a', browser_download_url: 'data:x', size: 1 }] }]
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status: 200 })))
    const r = await fetchReleases('a/evil')
    expect(r.status === 'ok' && [r.releases[0].url, r.releases[0].assets[0].url]).toEqual(['#', '#'])
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
