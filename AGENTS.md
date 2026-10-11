# NOoOR Farm

Arabic (RTL) mobile-first menu site styled as a printed menu, built with **Next.js (App Router) + Tailwind CSS v4** running inside Figma Make.

## Development Server

A Next.js dev server is managed by the environment (`pnpm run dev`, port from `$PORT`). Hot reload is automatic. `next.config.ts` has `allowedDevOrigins` patterns so the preview host can hydrate.

## Project Structure

- `src/app/layout.tsx` - Root layout: `<html lang="ar" dir="rtl">`, fonts via `next/font/google` (Readex Pro display, IBM Plex Sans Arabic body)
- `src/app/page.tsx` - Renders `Storefront`
- `src/app/globals.css` - Tailwind v4 import, tokens in `@theme inline` (paper, ink, rose, blush, butter, sage, leaf), grain overlay, ring/marquee keyframes, Lenis css
- `src/components/Storefront.tsx` - Client component: header, hero, marquee, menu bands with dotted-leader rows, index/tabs, how it works, footer, cart state, order drawer, WhatsApp message
- `src/components/Parts.tsx` - `Logo` (next/image of `/logo.png`), dotted `Ring`, masked `Lines` reveal, `Stepper`, `fmt`, motion constants
- `src/lib/menu.ts` - Menu data (names, grams, prices) and `WHATSAPP_NUMBER`; edit here to change items/prices
- `public/logo.png` - Brand logo (currently a placeholder; replace the file)

## Notes

- No emojis or pictographs anywhere; icons are lucide line icons (strokeWidth 1.5) for functional UI only.
- `build` forces `NODE_ENV=production` (the sandbox sets `development`, which breaks `next build`).
- Animations use `motion/react` and Lenis smooth scroll.
- Use double quotes for strings containing apostrophes; export components as default.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
