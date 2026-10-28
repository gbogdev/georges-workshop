import { Link } from 'react-router-dom'
import FactList from '../components/FactList'
import { products } from '../data/products'
import { useTitle } from '../lib/useTitle'

export default function Docs() {
  useTitle('Documentation')
  return (
    <>
      <h1>Documentation</h1>
      <p>
        Installation instructions for each project. Full details also appear on the{' '}
        <Link to="/products">product pages</Link>.
      </p>
      {products.map((p) => (
        <div key={p.slug} id={p.slug}>
          <h2>
            <Link to={`/products/${p.slug}`}>{p.name}</Link>
          </h2>
          <FactList title="Installation" items={p.install} ordered />
          <FactList title="Supported platforms" items={p.platforms} />
        </div>
      ))}
    </>
  )
}
