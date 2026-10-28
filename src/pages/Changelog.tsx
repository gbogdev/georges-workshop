import ReleaseList from '../components/ReleaseList'
import { products } from '../data/products'
import { useTitle } from '../lib/useTitle'

export default function Changelog() {
  useTitle('Changelog')
  return (
    <>
      <h1>Changelog</h1>
      <p>Release notes are taken from GitHub releases. Projects without a public repository have no entries.</p>
      {products.map((p) => (
        <section key={p.slug}>
          <h2>{p.name}</h2>
          <ReleaseList repo={p.repo} detailed />
        </section>
      ))}
    </>
  )
}
