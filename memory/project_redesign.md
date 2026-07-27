---
name: portfolio-redesign-2026
description: Full portfolio website redesign — dark theme, Next.js app router, React Query, Framer Motion, shadcn
metadata:
  type: project
---

Completed full redesign of the portfolio website based on the design reference in `Portfolio website redesign/Portfolio.dc.html`.

**Design system:**

- Background: `#09090B`, Card: `#0C0C0F`, Input bg: `#131317`
- Accent: `#FF6B6B` (coral red)
- Fonts: Space Grotesk (heading), JetBrains Mono (mono/labels), Sora (body)
- All three fonts loaded via `next/font/google` with CSS variables `--font-space-grotesk`, `--font-jetbrains-mono`, `--font-sora`

**Architecture:**

- Next.js 15 App Router with pages: `/`, `/about`, `/projects`, `/projects/[id]`, `/blog`, `/blog/[id]`, `/resume`, `/contact`
- React Query (`@tanstack/react-query`) wraps all data fetching via `src/providers/QueryProvider.tsx`
- Query keys centralized in `src/lib/queryKeys.ts` (enum `QueryKeys`)
- API URLs centralized in `src/lib/apiUrls.ts` (enum `ApiUrls`)
- Placeholder JSON data in `src/data/placeholder.ts`
- Per-section services in `src/services/` (homeService, aboutService, projectsService, blogService, resumeService, contactService)
- Home section components in `src/components/sections/home/`
- Layout components in `src/components/layout/` (Navbar, Footer)

**Why:** User requested applying the Claude-designed redesign from the `Portfolio website redesign/` folder, with shadcn UI, framer-motion animations, and React Query with per-section service architecture.

**Old pages** were moved to `src/_legacy/` (home.tsx, about.tsx, projects.tsx, skills.tsx, footer.tsx). The API route `src/pages/api/contact.ts` remains.
