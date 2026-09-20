# Spec Delta

## Purpose

Provides a high-conversion, animated public landing page for the Hack Odyssey 4.0 hackathon that presents event information, SDG tracks, sponsors, and coordinator contacts, funneling visitors to the registration form.

## ADDED Requirements

### Requirement: Landing page is the root route
The system SHALL serve the `LandingPage` component at the `/` route. The existing registration form SHALL be served at `/register`. The admin routes SHALL remain unchanged at `/gfghackadmin` and `/gfghackadmin/dashboard`.

#### Scenario: Visitor navigates to root
- **WHEN** a user navigates to the site root (`/`)
- **THEN** the LandingPage is displayed, not the registration form

#### Scenario: Visitor navigates to /register
- **WHEN** a user navigates to `/register`
- **THEN** the registration form is displayed as before

### Requirement: Hero section displays event identity on load
The landing page SHALL display a hero section with the hackathon name "Hack Odyssey 4.0", dates "September 25 & 26", and prize pool "Up to ₹1 Lakh" with a staggered entrance animation against a dark-mode grid background.

#### Scenario: Hero elements animate in on load
- **WHEN** the landing page first mounts
- **THEN** the hackathon name scales and slides up, followed by prize pool and date text, in staggered sequence

#### Scenario: Register Now CTA is visible after animation
- **WHEN** the staggered text animation completes
- **THEN** a "Register Now" button with glassmorphism styling and a pulsing effect appears and is actionable

#### Scenario: Register Now CTA navigates to registration
- **WHEN** a user clicks or taps the "Register Now" button
- **THEN** they are navigated to `/register`

### Requirement: Logistics bento card shows team rules
The landing page SHALL display a bento-box style card that clearly states team size rules: minimum 4, maximum 5 members per team.

#### Scenario: Team rule card is visible
- **WHEN** the landing page is rendered
- **THEN** a card is visible stating "Teams of 4 to 5 members (Minimum 4, Maximum 5)"

### Requirement: SDG track grid displays all six tracks
The landing page SHALL display a responsive grid of six interactive cards, one per SDG track, with color-coded borders and hover interactions.

#### Scenario: All six SDG tracks are rendered
- **WHEN** the SDG section is in view
- **THEN** cards for SDG 2 (Zero Hunger), SDG 3 (Good Health), SDG 4 (Quality Education), SDG 6 (Clean Water), SDG 11 (Sustainable Cities), and SDG 13 (Climate Action) are all visible

#### Scenario: SDG card responds to hover
- **WHEN** a user hovers over an SDG track card
- **THEN** the card produces a visible interactive response (e.g., scale, glow, or border highlight)

### Requirement: Sponsors and partners section features logos
The landing page SHALL display a CodeChef sponsor slot and an infinite horizontal scroll marquee/carousel featuring the logos of GFG KARE, GDG On Campus KARE, KARE ACM, and KARE ACM-W.

#### Scenario: Club logos scroll continuously
- **WHEN** the sponsors section is visible
- **THEN** the four club logos scroll horizontally in a continuous loop without stopping

#### Scenario: CodeChef sponsor slot is present
- **WHEN** the sponsors section is visible
- **THEN** a prominent CodeChef sponsor display is present above or alongside the club logo marquee

### Requirement: Coordinator contact cards are displayed
The landing page SHALL display contact cards for faculty coordinators (Dr. R. Raja Sekar, Dr. P. Chinnasamy) and student coordinators (L. Harsha Vardhan, P. Harshika Suryanjali, S. Thaha, G. Umesh Chandra) with photo placeholders and tap-to-call links for those with phone numbers.

#### Scenario: Student coordinator cards show name and call link
- **WHEN** the coordinators section is rendered
- **THEN** each student coordinator card displays the coordinator's name and a tappable phone link that initiates a call

#### Scenario: Faculty coordinator cards show name
- **WHEN** the coordinators section is rendered
- **THEN** faculty coordinator cards for Dr. R. Raja Sekar and Dr. P. Chinnasamy are displayed with photo placeholders

### Requirement: Landing page is responsive
The landing page SHALL render correctly on mobile (≥320px), tablet, and desktop viewports without horizontal overflow.

#### Scenario: Mobile layout renders without overflow
- **WHEN** the landing page is viewed on a 375px-wide viewport
- **THEN** no section overflows horizontally and all content is readable
