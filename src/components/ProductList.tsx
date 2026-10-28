import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function ProductList({ limit }: { limit?: number }) {
  return (
    <ul className="rows">
      {products.slice(0, limit).map((p) => (
        <li key={p.slug}>
          <h3>
            <Link to={`/products/${p.slug}`}>{p.name}</Link>
          </h3>
          <p>{p.summary}</p>
          {p.stack.length > 0 && <p className="meta">{p.stack.join(' · ')}</p>}
        </li>
      ))}
    </ul>
  )
}
