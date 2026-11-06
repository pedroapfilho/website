---
title: 'next/font call in a client component fails the Turbopack build with "Font loader calls must be assigned to a const"'
severity: 'minor'
target: 'vercel/next.js'
---

On next 16.3.8 (Turbopack build), calling `Host_Grotesk({ display: "swap", subsets: ["latin"], variable: "--font-host" })` from `next/font/google` in any module that ends up in the client graph fails `next build` with "Font loader calls must be assigned to a const", even though the call is assigned to a module-scope const. Reproduced three ways in this repo: a shared `app/font.ts` (`export const hostGrotesk = Host_Grotesk(...)`) imported by `app/global-error.tsx`; the same module with no import alias; and the loader called directly inside `app/global-error.tsx` ("use client"). The same `app/font.ts` builds fine when only server components import it. The Next docs describe a shared font definitions file without saying client components are excluded. Impact here: `global-error.tsx` cannot load Host Grotesk itself, so `globals.css` falls back to the face name with `var(--font-host, "Host Grotesk")`. Config in play: `cacheComponents: true`, `partialPrefetching: true`, `experimental.instantInsights`.
