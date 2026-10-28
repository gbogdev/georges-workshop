import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'
import { useTitle } from '../lib/useTitle'

export default function Home() {
  useTitle()
  return (
    <>
      <h1>Northstar Software</h1>
      <p className="lead">
        Independent software projects built and maintained by one developer: TaskFlow, DevScope and FileForge. This site
        collects their documentation, downloads and release notes.
      </p>
      <h2>Projects</h2>
      <ProductList />
      <p>
        <Link to="/products">All products</Link> · <Link to="/downloads">Downloads</Link> · <Link to="/docs">Documentation</Link>
      </p>
    </>
  )
}
