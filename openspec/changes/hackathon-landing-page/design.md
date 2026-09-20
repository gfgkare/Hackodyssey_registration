# Design

## Context

The frontend is a React 19 + Vite 8 + TypeScript + Tailwind CSS v4 SPA. The existing global styles (`index.css`) already define a dark-mode design system with CSS custom utilities (`hack-surface`, `hack-gradient-text`, `hack-page-shell`) and a dark background (`#070b18`). The router is React Router v7 with three routes. `framer-motion` is not yet installed. Four real club logos were provided as PNG/JPG uploads.

See `proposal.md – Why` for motivation.

## Goals / Non-Goals

**Goals:**
- Ship a production-quality, fully animated dark-mode landing page with zero backend changes.
- Re-use the existing Tailwind v4 design system tokens where possible.
- Deliver a clear conversion funnel: hero → CTA → form.

**Non-Goals:**
- Modifying registration form logic or backend.
- Adding analytics or A/B testing infrastructure.
- Real coordinator photos (placeholders used).
- Internationalisation or multi-language support.

## Decisions

### 1. Route strategy — Option A (separate landing + register routes)

`/` becomes `LandingPage`. `/register` hosts the existing `RegistrationPage`. This keeps the landing page focused on conversion without a long scroll before the form. The CTA button deep-links to `/register`.

**Alternatives considered:**
- *One long scroll page (Option B)*: simpler URL, but mixed intent (marketing + data entry) and a worse experience on re-visits to re-register.

### 2. framer-motion for animations

framer-motion's `motion.*` components and `useAnimation` / `staggerChildren` variant patterns are the most ergonomic way to achieve the specified entrance stagger and persistent pulse on the CTA. It is React 19 compatible and tree-shakeable.

**Alternatives considered:**
- *CSS keyframe animations + Tailwind*: feasible for simple fades but cannot express staggered sequence driven by JavaScript state without extra complexity.
- *React Spring*: similar capability but larger API surface; framer-motion is already standard in the React ecosystem.

### 3. Component file layout

```
frontend/src/
  pages/
    LandingPage.tsx          <-- top-level page, wires sections together
  components/
    landing/
      HeroSection.tsx        <-- animated hero + CTA button
      LogisticsSection.tsx   <-- bento team-size card
      SDGSection.tsx         <-- 6-card SDG grid
      SponsorsSection.tsx    <-- CodeChef slot + infinite marquee
      CoordinatorsSection.tsx <-- faculty + student coordinator cards
```

Each section is a self-contained component for maintainability.

### 4. Infinite marquee implementation

The club logo marquee is implemented in pure CSS + Tailwind using a `@keyframes` scroll animation (`translateX` from 0 to -50%) on a duplicated list of logos. This avoids a heavy third-party carousel library and works without JavaScript. framer-motion is used only for entrance animations of sections, not the marquee.

**Alternatives considered:**
- *framer-motion `AnimatePresence` loop*: more code, harder to make perfectly seamless.
- *Third-party carousel (e.g., embla-carousel)*: extra dependency; overkill for a simple scroll.

### 5. SDG card color palette

Each SDG track gets a distinct left-border accent and a subtle glow on hover, following UN SDG color conventions:
| Track | SDG | Color |
|---|---|---|
| Zero Hunger | 2 | `#DDA63A` amber |
| Good Health | 3 | `#4C9F38` green |
| Quality Education | 4 | `#C5192D` red |
| Clean Water | 6 | `#26BDE2` cyan |
| Sustainable Cities | 11 | `#FD9D24` orange |
| Climate Action | 13 | `#3F7E44` dark green |

### 6. Logo assets

The four uploaded images are copied to `frontend/public/logos/` as:
- `gfg-kare.png`
- `gdg-kare.jpg`
- `kare-acm.jpg`
- `kare-acmw.jpg`

Referenced as static public assets (`/logos/<filename>`). No bundler processing needed. A text fallback `CodeChef` SVG/styled div is used for the CodeChef sponsor slot since no logo was provided.

### 7. Coordinator data

All coordinator data is co-located as a typed constant in `CoordinatorsSection.tsx` (no fetch, no CMS). Phone numbers are rendered as `<a href="tel:...">` links for mobile tap-to-call.

Faculty coordinators: Dr. R. Raja Sekar, Dr. P. Chinnasamy (no phone numbers provided — cards shown without call links).

Student coordinators with phone numbers:
- L. Harsha Vardhan — +91 91005 50609
- P. Harshika Suryanjali — +91 95027 95304
- S. Thaha — +91 78933 40788
- G. Umesh Chandra — +91 95738 61418

### 8. Tailwind v4 compatibility

Tailwind v4 uses a CSS-first config (`@import "tailwindcss"` in `index.css`) with no `tailwind.config.js`. Custom SDG border colors and the marquee keyframe will be added as `@layer utilities` / `@keyframes` blocks directly in `index.css` rather than a config file.

## Risks / Trade-offs

- **framer-motion bundle size** (~60 KB gzipped) → acceptable for a marketing page; tree-shaking ensures only used APIs are included.
- **CSS marquee on slow connections** — logos that haven't loaded yet will show alt text; the marquee still animates → the CSS animation is applied to the wrapper, so it degrades gracefully.
- **No real coordinator photos** → circular photo placeholders with initials. If real photos are added later, simply replace the placeholder with an `<img>` element.
- **Tailwind v4 `@apply` limitations** — Tailwind v4 restricts `@apply` inside `@keyframes`; the marquee animation will use raw CSS values to avoid this.

## Migration Plan

1. Install `framer-motion` — no breaking changes to existing code.
2. Copy logo assets to `frontend/public/logos/`.
3. Add `LandingPage` + sub-components; update `App.tsx` routes.
4. Add CSS utilities to `index.css`.
5. Update `index.html` `<title>`.
6. Smoke-test all three route entries (`/`, `/register`, `/gfghackadmin`).

**Rollback:** Reverting `App.tsx` to point `/` back to `RegistrationPage` fully restores the previous behavior. No database or backend changes are involved.
