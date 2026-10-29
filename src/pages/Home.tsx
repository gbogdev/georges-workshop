import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'
import { useTitle } from '../lib/useTitle'

export default function Home() {
  useTitle()
  return (
    <>
      <section className="hero">
        <h1>George's Workshop</h1>
        <p className="lead">
          A portfolio of the software I build: TaskFlow, DevScope and FileForge. Here you'll find what each one does,
          how to install it, and its release notes.
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
