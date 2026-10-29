import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function ProductList() {
  return (
    <ul className="rows">
      {products.map((p) => (
        <li key={p.slug}>
          <h3>
            <Link to={`/products/${p.slug}`}>{p.name}</Link>
          </h3>
          <p>{p.summary}</p>
          <div className="chips">
            {p.stack.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
            {p.features.length === 0 && <span className="chip quiet">Details pending</span>}
          </div>
        </li>
      ))}
    </ul>
  )
}
