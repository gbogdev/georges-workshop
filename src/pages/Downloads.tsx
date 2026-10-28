import { Link } from 'react-router-dom'
import ReleaseList from '../components/ReleaseList'
import { products } from '../data/products'
import { useTitle } from '../lib/useTitle'

export default function Downloads() {
  useTitle('Downloads')
  return (
    <>
      <h1>Downloads</h1>
      <p>Release information is read live from each project's GitHub repository.</p>
      {products.map((p) => (
        <section key={p.slug}>
          <h2>
            <Link to={`/products/${p.slug}`}>{p.name}</Link>
          </h2>
          <ReleaseList repo={p.repo} detailed />
        </section>
      ))}
    </>
  )
}
