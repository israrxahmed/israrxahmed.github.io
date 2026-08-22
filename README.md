# Israr Ahmed — Portfolio

Personal portfolio site for a Principal Electrical Engineer with 19+ years across
refinery, petrochemical, gas and power EPC projects.

Static single-page application — no backend or database required.

## Stack

- React 19 + TypeScript 5.9 (strict mode)
- Vite 7 (build/dev tooling)
- Tailwind CSS 3.4 with a custom design-token system (`src/index.css`, `tailwind.config.js`)
- GSAP + ScrollTrigger for scroll-driven animation
- shadcn/ui primitives (button, input, label, textarea, dialog only)
- Vitest + React Testing Library (unit/component), Playwright-core (E2E smoke)

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server with HMR
npm run build      # typecheck + production build -> dist/
npm run preview    # serve the production build locally
npm run lint       # eslint over the repo
npm test           # unit + component tests (Vitest, single run)
npm run test:e2e   # browser smoke tests against the production build
```

The E2E suite builds the app, serves `dist/` on a local port and drives a headless
Chromium through the critical user journeys (navigation, filtering, modal,
theming, contact form). It requires a Playwright Chromium download on first use:

```bash
npx playwright-core install chromium
```

## Contact form configuration

The form never pretends to succeed. Two delivery modes exist:

| Configuration | Behaviour |
|---|---|
| `VITE_CONTACT_ENDPOINT` set (e.g. a Formspree URL) | Form POSTs JSON `{name, email, message}` to that endpoint. Success is shown only when the endpoint responds 2xx; failures render an error state with a direct-email fallback. |
| Not set | Submitting hands the composed message to the visitor's own email client via `mailto:` and says so explicitly. |

Set the variable in `.env.local` (never committed):

```bash
echo 'VITE_CONTACT_ENDPOINT=https://formspree.io/f/yourid' > .env.local
```

## Editing content

All page copy lives in typed JSON under `src/data/`:

- `personal.json` — name, stats, about copy, contact details
- `projects.json` — project cards and modal content
- `skills.json`, `services.json`, `innovations.json`, `clients.json`
- `navigation.json` — nav labels/anchors

Section headline numbers are derived from these files at render time; edit the
data, not the components.

## Deployment

Any static host works (`dist/` after `npm run build`). Recommended response headers:

```
Content-Security-Policy: default-src 'self'; img-src 'self' data: https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY   # or frame-ancestors 'none' in CSP
```

Self-hosting the web fonts removes the two external `fonts.googleapis.com` /
`fonts.gstatic.com` origins entirely (and tightens CSP further); this is tracked
as follow-up work.

## Project structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md). UI primitives live in
`src/components/ui`, page sections in `src/sections`, shared tokens/helpers in
`src/lib`, types in `src/types`.
