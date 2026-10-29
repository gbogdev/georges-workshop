import ProductList from '../components/ProductList'
import { useTitle } from '../lib/useTitle'

export default function Products() {
  useTitle('Products')
  return (
    <>
      <h1>Products</h1>
      <p className="lead">None of these projects is for sale. Availability is shown on each product page.</p>
      <ProductList />
    </>
  )
}
