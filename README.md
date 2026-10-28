# Northstar Software

Portfolio and product catalogue for TaskFlow, DevScope and FileForge. Release data is read from the GitHub REST API (cached 10 minutes, with rate-limit and error handling).

**Stack:** React, TypeScript, Vite, React Router, Vitest + Testing Library.

## Run locally

```bash
npm install
npm run dev
```

## Build and test

```bash
npm test
npm run build      # output in dist/
npm run preview
```

## Configuration

Copy `.env.example` to `.env` to set an optional `VITE_GITHUB_TOKEN` (raises the API rate limit; use a no-scope token, since it ships in the client bundle). Product details live in `src/data/products.ts`; set a product's `repo` (`owner/name`) once its repository is public.

## Deployment

Any static host. Serve `dist/` and rewrite unknown paths to `index.html` (single-page routing). For GitHub Pages, use a host or workflow that provides that fallback (copy `index.html` to `404.html`).

## Acknowledgment

AI tools were used for development guidance.
