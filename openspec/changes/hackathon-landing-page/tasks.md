# Tasks

## 1. Setup & Dependencies

- [x] 1.1 Install `framer-motion` — run `npm install framer-motion` inside `frontend/` and verify it appears in `package.json` dependencies and `node_modules/framer-motion` exists.
- [x] 1.2 Copy the four uploaded club logo images to `frontend/public/logos/` as `gfg-kare.png`, `gdg-kare.jpg`, `kare-acm.jpg`, `kare-acmw.jpg` — verify each file is accessible at `http://localhost:<port>/logos/<filename>` in the dev server.
- [x] 1.3 Update `frontend/index.html` `<title>` to `"Hack Odyssey 4.0"` and add `<meta name="description" content="Hack Odyssey 4.0 — Sept 25 & 26 | Up to ₹1 Lakh Prize Pool">` — verify in browser tab and DevTools Elements panel.

## 2. Global CSS Additions

- [x] 2.1 Add `@keyframes marquee` and `@keyframes pulse-glow` animations plus SDG color custom properties to `frontend/src/index.css` in a new `@layer utilities` block — verify no Tailwind v4 `@apply` is used inside `@keyframes`, and the dev server compiles without errors.

## 3. Routing Update

- [x] 3.1 Rename the route for the existing `RegistrationPage` in `frontend/src/App.tsx` from `path="/"` to `path="/register"` — verify navigating to `http://localhost:<port>/register` still shows the full registration form.
- [x] 3.2 Add `import LandingPage from "./pages/LandingPage"` and a new `<Route path="/" element={<LandingPage />} />` in `App.tsx` — verify navigating to `http://localhost:<port>/` shows the landing page and admin routes remain intact.

## 4. LandingPage Top-Level Component

- [x] 4.1 Create `frontend/src/pages/LandingPage.tsx` that imports and renders all five section components in order: `HeroSection`, `LogisticsSection`, `SDGSection`, `SponsorsSection`, `CoordinatorsSection` — verify the page compiles with `tsc -b --pretty false` and renders without console errors.

## 5. HeroSection Component

- [x] 5.1 Create `frontend/src/components/landing/HeroSection.tsx` with a `bg-slate-950` dark-mode grid background overlay (CSS `background-image: linear-gradient` grid pattern). Verify the grid is visible in the browser.
- [x] 5.2 Implement staggered entrance animation using `framer-motion` `motion.div` / `motion.h1` with `variants` and `staggerChildren`: "Hack Odyssey 4.0" headline scales up from 80% and slides up 40px; then the prize pool "Up to ₹1 Lakh" fades in; then the dates "September 25 & 26" fade in. Verify the sequence plays once on page load with correct stagger timing.
- [x] 5.3 Add the "Register Now" glassmorphism button: `backdrop-filter: blur`, `border: 1px solid rgba(255,255,255,0.15)`, vibrant blue-to-purple gradient background, and `framer-motion` `animate` pulsing box-shadow cycle. Verify the button appears after the text animation completes, is centred, and clicking it navigates to `/register` using `react-router-dom`'s `useNavigate`.

## 6. LogisticsSection Component

- [x] 6.1 Create `frontend/src/components/landing/LogisticsSection.tsx` with a bento-box highlight card displaying "Teams of 4 to 5 members" and the sub-rule "(Minimum 4, Maximum 5)" using the existing `hack-surface` and `hack-gradient-text` CSS classes. Verify the card is rendered and styled correctly in the browser.

## 7. SDGSection Component

- [x] 7.1 Create `frontend/src/components/landing/SDGSection.tsx` with a typed array of six SDG track objects (id, number, title, description, color) matching the six specified tracks and their UN SDG colors from the design. Verify no TypeScript errors.
- [x] 7.2 Render each SDG track as a card with a left-border colored accent (`border-l-4`) and on-hover scale + glow effect using `framer-motion` `whileHover`. Verify all six cards render in a responsive 1→2→3 column grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) and each hover produces visible feedback.

## 8. SponsorsSection Component

- [x] 8.1 Create `frontend/src/components/landing/SponsorsSection.tsx` with a CodeChef sponsor block (styled text/SVG badge prominently labeled "Title Sponsor — CodeChef"). Verify it renders above the marquee.
- [x] 8.2 Implement the infinite horizontal marquee: render the four club logo images twice side-by-side in a flex row (total 8 images) inside a clipped container, and apply the `marquee` CSS keyframe animation (`translateX(0)` → `translateX(-50%)`) — verify the logos scroll seamlessly without a visible seam or pause, and images display correctly using `<img src="/logos/...">` with `alt` text.

## 9. CoordinatorsSection Component

- [x] 9.1 Create `frontend/src/components/landing/CoordinatorsSection.tsx` with typed arrays for faculty coordinators `[{ name: "Dr. R. Raja Sekar" }, { name: "Dr. P. Chinnasamy" }]` and student coordinators with phone numbers. Verify no TypeScript errors.
- [x] 9.2 Render faculty coordinator cards with a circular photo placeholder (initials or avatar icon), name, and "Faculty Coordinator" label. Render student coordinator cards with a circular photo placeholder, name, and a tappable `<a href="tel:+91XXXXXXXXXX">` call link. Verify all six cards render in a responsive grid, and tapping a student card's phone link on mobile initiates a call intent.

## 10. Verification & Polish

- [x] 10.1 Run `npm run typecheck` inside `frontend/` and verify zero TypeScript errors across all new and modified files.
- [x] 10.2 Run the dev server (`npm run dev`) and manually verify the full scroll path: hero animation plays → bento card visible → SDG grid renders with hover states → sponsor section marquee loops → coordinator cards visible with call links.
- [x] 10.3 Check responsive layout at 375px (mobile), 768px (tablet), and 1280px (desktop) using browser DevTools — verify no horizontal overflow on any section, font sizes are legible, and the SDG grid column count collapses correctly.
- [x] 10.4 Verify `/register` still loads the full registration form, submits correctly, and `/gfghackadmin` still loads the admin login — no regression in existing routes.
