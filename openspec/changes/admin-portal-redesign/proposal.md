# Proposal

## Why

The current Admin Dashboard and Admin Login user interfaces lack visual cohesion with the high-tech, futuristic theme of the event ("MISSION CONTROL") and contain layout overcrowding, sub-optimal typography, and unpolished data presentation. Modernizing the Admin Dashboard and Admin Login will deliver a premium, responsive, sci-fi command center experience matching the target designs while preserving all existing columns and data from the current production frontend.

## What Changes

- Redesign **AdminDashboard**:
  - Transform the header into a unified sci-fi "MISSION CONTROL" panel with yellow accent bar, live team count, and cohesive navigation pills.
  - Implement dynamic, context-aware filter and search controls:
    - In **Teams** view: Search Teams / ID, Refresh button, Export XLS, and Export CSV.
    - In **Participants** view: All Genders dropdown, All Accommodation dropdown, Search Name / RegNo, Refresh button, Export XLS, and Export CSV.
  - Retain all actual production columns and data from the present frontend:
    - Teams view: `#`, `TEAM NAME` (with styled `ID: <uuid>`), `CONTACT INTEL` (with dedicated user, email, and phone icons), `UNIT SIZE` (circular dark badge), `CATEGORY` (KLU / OTHER), and `STATUS` (emerald CONFIRMED badge).
    - Participants view: `#`, `TEAM NAME`, `NAME`, `REG NO`, `GENDER`, `YEAR/BRANCH`, `PHONE`, `EMAIL`, `COLLEGE`, `ACCOMMODATION` (custom `HOSTLER` and `DAYSCHOLAR` badges), `HOSTEL DETAILS` (compact multi-line hostel, room, warden, and contact details).
  - Add a sleek, unobtrusive Logout button in the header.
  - Polish the entire layout with a pitch-black/zinc-950 sci-fi aesthetic, monospace accents, custom scrollbars, and high contrast typography.
- Redesign **AdminLogin**:
  - Match the futuristic dark cyberpunk theme of the Hackathon ("MISSION CONTROL" aesthetic) with glowing accents, sci-fi card framing, illuminated input borders, and crisp typography.
- **Strict Boundary**: No modifications to the landing page or registration page.

## Capabilities

### New Capabilities
- `admin-portal-ui`: Modernized UI/UX for Admin Dashboard and Admin Login pages.

### Modified Capabilities
<!-- None -->

## Impact
- `frontend/src/pages/admin/AdminDashboard.tsx`: Full UI redesign preserving production data and columns.
- `frontend/src/pages/admin/AdminLogin.tsx`: Full UI redesign to match the dark command center theme.
- No backend schema changes or landing/register page changes.
