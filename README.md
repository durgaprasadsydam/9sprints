# 9Sprints — Ship Fast. Scale Smart. In Sprints.

Static marketing site: Tailwind v4 (CSS-first `@theme`), GSAP 3 + ScrollTrigger + SplitText, Lenis, Swiper (testimonials only). No frameworks.

## Commands
- `npm install --include=dev` — install deps
- `npm run build` — regenerate HTML + copy vendor files + minified CSS (`dist/output.css`)
- `npm run dev` — Tailwind watch (run `npm run pages` after editing `scripts/*.mjs`)
- `npm run serve` — local server on :5173

## Structure
- `*.html` — generated pages (plain HTML). Edit shared header/footer in `scripts/lib.mjs`, homepage in `scripts/home.mjs`, the 4 service pages (one template + data) in `scripts/services.mjs`.
- `src/input.css` — tokens (`@theme`), theme variables, components
- `js/main.js` — Lenis, header, mega menu, mobile menu, cursor, theme, buttons, preloader
- `js/animations.js` — data-attribute animation system + page sections

## Placeholders
All numbers, logos, testimonials, case studies and images are marked `[PLACEHOLDER]`. Images are SVG placeholders in `assets/img/` — replace with WebP (keep width/height attributes).
Contact details (`hello@9sprints.com`, phone) live in `SITE` in `scripts/lib.mjs`.

## Brand
Colours, gradients and semantic tokens live at the top of `src/input.css` (dark default, light via `[data-theme="light"]`, first visit follows `prefers-color-scheme`). Service colours are set per page via `--service`. Logo files in `assets/logo/` are approximations — replace with the official artwork.
