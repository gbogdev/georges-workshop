import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Products = lazy(() => import('./pages/Products'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const Downloads = lazy(() => import('./pages/Downloads'))
const Docs = lazy(() => import('./pages/Docs'))
const Changelog = lazy(() => import('./pages/Changelog'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<p role="status" className="wrap">Loading…</p>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductPage />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="docs" element={<Docs />} />
          <Route path="changelog" element={<Changelog />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
