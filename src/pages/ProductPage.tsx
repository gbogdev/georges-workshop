import { Link, useParams } from 'react-router-dom'
import FactList from '../components/FactList'
import ReleaseList from '../components/ReleaseList'
import { findProduct, OWNER } from '../data/products'
import { useTitle } from '../lib/useTitle'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = findProduct(slug)
  useTitle(product?.name)
  if (!product) return <NotFound />

  return (
    <>
      <p className="crumb">
        <Link to="/products">Products</Link> / {product.name}
      </p>
      <h1>{product.name}</h1>
      <p className="lead">{product.summary}</p>
      {product.repo && (
        <div className="actions">
          <a className="btn primary" href={`https://github.com/${product.repo}`}>Source on GitHub</a>
          <a className="btn" href={`https://github.com/${product.repo}/releases`}>Releases</a>
        </div>
      )}

      <section>
        <h2>Screenshots</h2>
        {product.screenshots.length ? (
          <div className="gallery">
            {product.screenshots.map((s) => (
              <figure key={s.src}>
                <img src={s.src} alt={s.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        ) : (
          <p className="muted">No screenshots published yet.</p>
        )}
      </section>

      <div className="panel">
      <FactList title="Features" items={product.features} />
      <FactList title="Technology" items={product.stack} />
      <FactList title="Supported platforms" items={product.platforms} />
      <FactList title="Installation" items={product.install} ordered code />
      <FactList title="Known limitations" items={product.limitations} />
      </div>

      <section>
        <h2>Source and releases</h2>
        {product.repo ? (
          <p>
            <a href={`https://github.com/${product.repo}`}>Source code</a> ·{' '}
            <a href={`https://github.com/${product.repo}/releases`}>Releases</a>
          </p>
        ) : (
          <p className="muted">
            No public repository yet. Check <a href={`https://github.com/${OWNER}`}>github.com/{OWNER}</a> for updates.
          </p>
        )}
        <ReleaseList repo={product.repo} />
      </section>
    </>
  )
}
