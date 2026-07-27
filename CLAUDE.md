# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint via Next.js
```

No test runner is configured.

## Architecture

### Routing

This project uses **both** Next.js routers simultaneously:

- **App Router** (`src/app/`) — all UI pages (`/`, `/about`, `/projects`, `/blog`, `/contact`, `/resume`, `/admin`)
- **Pages Router** (`src/pages/api/contact.ts`) — the only real API route (email via Resend)

The files in `src/pages/` (about.tsx, home.tsx, etc.) are **legacy leftovers** from before the redesign — they are not active routes.

### Data Layer

All page data comes from a single in-memory object at `src/data/placeholder.ts`. There are no real HTTP calls to any backend. Each `src/services/*.ts` file exports a React Query hook whose `queryFn` reads from `placeholder.*`. The intended future REST endpoints are enumerated in `src/lib/apiUrls.ts` but are not wired up yet.

To add real data: replace `placeholder.X` in a service's `queryFn` with `axios.get(ApiUrls.X)`.

**React Query v5** (`@tanstack/react-query`) is the sole data/state layer — no Redux or Zustand. The `QueryProvider` (`src/providers/QueryProvider.tsx`) sets 60s stale time, 1 retry.

Query cache keys are in `src/lib/queryKeys.ts`.

### Path Aliases

`@/` resolves to the **repo root** (not `src/`), configured in both `tsconfig.json` and `next.config.ts`. This means:
- `@/src/components/...` → `src/components/`
- `@/components/...` → the root-level `components/` directory (where shadcn generates files)

shadcn/ui components land in `components/components/ui/` (double `components/`) due to this alias setup.

### Styling

- **Tailwind CSS v4** — configured entirely in `src/app/globals.css` via `@theme` blocks. There is no `tailwind.config.*` file. To add custom tokens or extend Tailwind, use the CSS-native `@theme` syntax in `globals.css`.
- Design system: dark-mode only, accent `#FF6B6B` (coral red), background `#09090B`.
- Three fonts via `next/font/google`: Space Grotesk (headings), JetBrains Mono (mono/labels), Sora (body).
- Detailed hover/transition effects are done with **inline `style={}` props and `onMouseEnter`/`onMouseLeave`**, not Tailwind utilities — follow this pattern when extending existing pages.

### Component Structure

- `src/components/layout/` — Navbar and Footer (imported manually per page, not via `layout.tsx` nesting)
- `src/components/sections/home/` — 8 sections assembled in `src/app/page.tsx`
- `src/components/MouseGlow.tsx` — cursor glow via `tsparticles`

All page-level files use `'use client'` — there are no RSC pages (deliberate, to support Framer Motion and inline React Query hooks).

### Environment Variables

Required only for the contact form email to actually send:

```
RESEND_API_KEY=<Resend API key>
CONTACT_EMAIL=<destination email address>
```

Note: the contact form UI (`useSubmitContact` in `src/services/contactService.ts`) currently uses a fake `setTimeout` and does not call `/api/contact`. To wire it up, replace the mock with `axios.post('/api/contact', data)`.

### Known Quirks

- **Admin page** (`/admin`) has no authentication — it is publicly accessible and UI-only (all data is placeholder).
- **`next-sitemap`** is installed but has no config file; sitemap generation is not active.
- The contact API route lives in `src/pages/api/` (Pages Router), not `src/app/api/`. Keep new API routes there or migrate both to App Router.
