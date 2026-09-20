# Proposal

## Why

The existing `/` route goes directly to the registration form, which gives participants no context, excitement, or trust signals before they commit to filling in details. A high-conversion landing page is needed to anchor the brand, communicate the event's value proposition (₹1 Lakh prize pool, SDG tracks, partner clubs), and funnel visitors to the registration form with intent.

## What Changes

- Add a new **LandingPage** React component at the `/` route (animated hero, logistics bento, SDG track grid, sponsors marquee, coordinators section).
- Move the registration form to `/register` (existing `RegistrationPage` function is unchanged — only its route changes).
- Install `framer-motion` as a new frontend dependency.
- Copy the four uploaded club logos (GFG KARE, GDG On Campus KARE, KARE ACM, KARE ACM-W) into `frontend/public/logos/`.
- Update `index.html` `<title>` from `"frontend"` to `"Hack Odyssey 4.0"`.
- Add a `<meta name="description">` tag for SEO.

## Capabilities

### New Capabilities

- `landing-page`: Public-facing event landing page for Hack Odyssey 4.0 with hero animation, logistics info, SDG track cards, sponsor/partner marquee, and coordinator contact section.

### Modified Capabilities

_(none — no existing spec-level behavior changes)_

## Impact

- **Routing**: `/` changes from `RegistrationPage` to `LandingPage`. `/register` becomes the new registration route. The admin routes (`/gfghackadmin`, `/gfghackadmin/dashboard`) are unaffected.
- **Dependencies**: `framer-motion` added to `frontend/package.json`.
- **Assets**: Four logo images added to `frontend/public/logos/`.
- **No backend changes** required.
