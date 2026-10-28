export interface Product {
  slug: string
  name: string
  /** One factual sentence; keep generic until details are confirmed. */
  summary: string
  /** GitHub "owner/name". Omit while no public repository exists. */
  repo?: string
  features: string[]
  stack: string[]
  platforms: string[]
  install: string[]
  limitations: string[]
  screenshots: { src: string; alt: string }[]
}

export const OWNER = 'gbogdev'

const pending = 'Not yet documented.'

export const products: Product[] = [
  {
    slug: 'taskflow',
    name: 'TaskFlow',
    summary: 'A task management project. Details are being written up.',
    features: [],
    stack: ['Python'],
    platforms: [],
    install: [],
    limitations: [pending],
    screenshots: [],
  },
  {
    slug: 'devscope',
    name: 'DevScope',
    summary: 'A developer tooling project. Details are being written up.',
    features: [],
    stack: [],
    platforms: [],
    install: [],
    limitations: [pending],
    screenshots: [],
  },
  {
    slug: 'fileforge',
    name: 'FileForge',
    summary: 'A file utility project. Details are being written up.',
    features: [],
    stack: [],
    platforms: [],
    install: [],
    limitations: [pending],
    screenshots: [],
  },
]

export const findProduct = (slug: string) => products.find((p) => p.slug === slug)
