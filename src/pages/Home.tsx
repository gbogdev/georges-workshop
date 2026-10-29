import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'
import { useTitle } from '../lib/useTitle'

export default function Home() {
  useTitle()
  return (
    <>
      <section className="hero">
        <h1>Northstar Software</h1>
        <p className="lead">
          Independent software projects built and maintained by one developer: TaskFlow, DevScope and FileForge. This site
          collects their documentation, downloads and release notes.
        </p>
        <div className="actions">
          <Link className="btn primary" to="/products">Browse products</Link>
          <Link className="btn" to="/docs">Documentation</Link>
        </div>
      </section>
      <h2>Projects</h2>
      <ProductList />
    </>
  )
}
