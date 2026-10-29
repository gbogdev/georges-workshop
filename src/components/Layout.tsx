import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { OWNER } from '../data/products'

const links = [
  { to: '/products', label: 'Products' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/docs', label: 'Docs' },
  { to: '/changelog', label: 'Changelog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap bar">
          <NavLink to="/" className="brand" end>George's Workshop</NavLink>
          <nav aria-label="Main">
            <ul>
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to}>{l.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" className="wrap">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <span>George's Workshop</span>
          <a href={`https://github.com/${OWNER}`}>GitHub</a>
        </div>
      </footer>
    </>
  )
}
