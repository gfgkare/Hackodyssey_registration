# Design

## Context

The Hackodyssey registration platform contains an admin dashboard (`AdminDashboard.tsx`) and admin login (`AdminLogin.tsx`). The user requested to update the dashboard based on high-tech reference designs while strictly using the actual production data columns shown in their present frontend screenshots, with no modifications to landing and register pages.

## Goals / Non-Goals

**Goals:**
- Deliver a futuristic, sci-fi dark command center interface for `AdminDashboard` and `AdminLogin`.
- Use the actual production columns and data from the present frontend:
  - Teams: Index, Team Name + ID, Contact Intel (with leader icons), Unit Size, Category, Status.
  - Participants: Index, Team Name, Name, Reg No, Gender, Year/Branch, Phone, Email, College, Accommodation, Hostel Details.
- Provide a clean, unified top command bar with responsive search, filters, refresh, export (XLS and CSV), and logout.
- Upgrade `AdminLogin` to match the dark sci-fi aesthetic with glowing accents and sleek styling.

**Non-Goals:**
- Do not modify landing page (`/`) or registration page (`/register`).
- Do not add hypothetical TXN PROTOCOL or PROOF columns.
- Do not alter backend database schema or API contracts.

## Decisions

1. **Header Architecture**:
   - Merge the top header and filter bar into a sleek, unified card with custom yellow accent bar (`h-8 w-2 bg-yellow-500 rounded-sm`), monospace header, pill tab switcher, context-sensitive filters, search, refresh, exports, and logout.
   - When in TEAMS view, show "Search teams or registration ID...", refresh, export buttons, and logout.
   - When in PARTICIPANTS view, show All Genders select, All Accommodation select, "Search name or registration number...", refresh, export buttons, and logout.

2. **Table Design**:
   - Modernize borders to subtle zinc-900 / zinc-800 lines with high contrast headers, hover states, and monospace/sans typography.
   - Contact Intel: 3-row layout with Lucide icons (`User`, `Mail`, `Phone`) in a compact, readable stack.
   - Unit Size: Centered dark circular pill badge.
   - Accommodation badges: `HOSTLER` in dark indigo/purple badge (`bg-indigo-950/80 text-indigo-300 border border-indigo-800/50`) and `DAYSCHOLAR` in dark slate badge (`bg-zinc-800 text-zinc-300`).
   - Hostel details: Multi-line layout showing `HOSTEL: <name>`, `ROOM: <room>`, `WARDEN: <name>`, `<contact>`.

3. **AdminLogin Theme**:
   - Convert `AdminLogin` from light slate background to pitch black/zinc-950 with a dark futuristic glassmorphism card, gold/yellow accent glow, high-tech Shield icon badge, and styled dark input fields.

## Risks / Trade-offs

- [Wide participant table on small screens] -> Table wrapped with horizontal scrolling (`overflow-x-auto`) and clean min-width ensuring all columns remain readable without clipping.
