# Agent Guidelines

This is a React + TypeScript + Vite portfolio website using shadcn/ui components.

## Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Lint check
npm run lint

# Preview production build
npm run preview
```

**Note:** No test framework is currently configured. If adding tests, use Vitest with React Testing Library.

## Code Style

### TypeScript
- Strict mode enabled - all code must be type-safe
- Use explicit return types for functions when not obvious
- Prefer `interface` over `type` for object shapes
- Use `as const` for readonly arrays/enums
- Path alias: `@/` maps to `src/`

### Imports
- Group imports: React, external libs, internal (@/), relative
- Use `@/` aliases for all internal imports
- Example:
  ```typescript
  import { useEffect, useRef } from 'react';
  import { gsap } from 'gsap';
  import { Button } from '@/components/ui/button';
  import { useTheme } from '@/context/ThemeContext';
  ```

### Formatting
- 2-space indentation
- Single quotes for strings
- Semicolons required
- Max line length: 100 characters
- Trailing commas in multi-line objects/arrays

### Naming Conventions
- Components: PascalCase (e.g., `Hero.tsx`, `Button`)
- Hooks: camelCase with `use` prefix (e.g., `useTheme`, `useIsMobile`)
- Utilities: camelCase (e.g., `cn`, `formatDate`)
- Types/Interfaces: PascalCase (e.g., `Project`, `ThemeContextType`)
- Constants: UPPER_SNAKE_CASE for true constants

### Component Structure
- Use functional components with explicit return types
- Sections go in `src/sections/` with default exports
- UI components go in `src/components/ui/` using shadcn patterns
- Custom components go in `src/components/`
- Props interfaces defined inline or in `src/types/`

### Styling (Tailwind + shadcn/ui)
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Follow shadcn/ui patterns: `data-slot`, `data-variant`, `data-size` attributes
- Custom colors: `cyan-500`, `violet-500`, `void`, `surface`
- Custom animations: `animate-float`, `animate-glow`, `animate-slide-up`
- Dark mode: use `dark:` prefix or CSS variables

### Error Handling
- Use Zod for runtime validation with forms
- GSAP animations: always use `gsap.context()` for cleanup
- React errors: use error boundaries for section components
- Custom hooks: validate context usage with descriptive errors

### File Organization
```
src/
  components/
    ui/           # shadcn/ui components
    *.tsx         # Custom components
  sections/       # Page sections (Hero, About, etc.)
  context/        # React context providers
  hooks/          # Custom hooks
  lib/            # Utilities (cn, etc.)
  types/          # TypeScript definitions
  data/           # JSON data files
```

### Animation Guidelines (GSAP)
- Register plugins once at module level: `gsap.registerPlugin(ScrollTrigger)`
- Use `useRef` for element references
- Always cleanup with `ctx.revert()` in useEffect return
- Use ScrollTrigger for scroll-based animations

### Git
- Do not commit without explicit user request
- Never commit secrets, API keys, or .env files
- Check git status before any commit operations
