# Project Structure

Regenerate with `python3 generate_project_tree.py` (adjust root path as needed).

```
aiportfolio/
├─ public/                     # static assets copied verbatim into dist/
│  ├─ favicon.svg              # site icon (IA monogram)
│  ├─ hero-portrait.jpg
│  ├─ about-image.jpg
│  └─ project-*.jpg            # 8 project card images
├─ src/
│  ├─ components/
│  │  ├─ ui/                   # shadcn/ui primitives actually used:
│  │  │  ├─ button.tsx
│  │  │  ├─ dialog.tsx
│  │  │  ├─ input.tsx
│  │  │  ├─ label.tsx
│  │  │  └─ textarea.tsx
│  │  └─ ParticleBackground.tsx
│  ├─ context/
│  │  └─ ThemeContext.tsx      # theme provider + useTheme hook
│  ├─ data/                    # typed JSON content (single source of truth)
│  │  ├─ clients.json
│  │  ├─ innovations.json
│  │  ├─ navigation.json
│  │  ├─ personal.json
│  │  ├─ projects.json
│  │  ├─ services.json
│  │  └─ skills.json
│  ├─ lib/
│  │  ├─ animations.ts         # GSAP tokens + shared animation helpers
│  │  ├─ contactSubmission.ts  # endpoint/mailto delivery + zod validation
│  │  └─ utils.ts              # cn()
│  ├─ sections/                # page sections (one per scroll region)
│  │  ├─ About.tsx
│  │  ├─ Clients.tsx
│  │  ├─ Contact.tsx
│  │  ├─ Expertise.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Innovation.tsx
│  │  ├─ Navigation.tsx
│  │  ├─ Projects.tsx
│  │  └─ Services.tsx
│  ├─ types/
│  │  └─ portfolio.types.ts    # shared interfaces for the JSON data
│  ├─ App.tsx                  # composition + loading gate + ScrollTrigger init
│  ├─ index.css                # design tokens, glass system, utilities
│  └─ main.tsx                 # entry point
├─ tests/                      # Vitest suites (unit/component/build-artifact)
├─ scripts/
│  └─ e2e.mjs                  # Playwright smoke suite against dist/
├─ docs/audit/                 # audit + remediation reports (see README there)
├─ .github/workflows/ci.yml    # lint -> typecheck+build -> unit tests -> e2e
├─ index.html
├─ package.json / package-lock.json
├─ vite.config.ts
├─ tailwind.config.js
├─ tsconfig{,.app,.node}.json
├─ eslint.config.js
└─ postcss.config.js
```
