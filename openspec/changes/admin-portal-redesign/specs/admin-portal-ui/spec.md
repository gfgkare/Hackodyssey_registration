# Spec Delta

## Purpose

Provides a responsive, sci-fi command center interface for administrator authentication and real-time team and participant monitoring, management, and exporting.

## ADDED Requirements

### Requirement: Mission Control Header and Navigation
The Admin Dashboard SHALL feature a futuristic "MISSION CONTROL" header with a yellow accent bar, live registered team count, view toggle between TEAMS and PARTICIPANTS, a sleek logout control, and contextual actions.

#### Scenario: Switching between Teams and Participants view
- **WHEN** admin clicks on the TEAMS tab
- **THEN** system activates the TEAMS view with team-specific search and table columns
- **WHEN** admin clicks on the PARTICIPANTS tab
- **THEN** system activates the PARTICIPANTS view with participant-specific search, gender filter, accommodation filter, and participant table columns

### Requirement: Teams View Presentation
The Admin Dashboard TEAMS view SHALL display registered teams with columns for index `#`, `TEAM NAME` with ID subtitle, `CONTACT INTEL` with icons for leader name, email, and phone, `UNIT SIZE` with a circular member count badge, `CATEGORY`, and `STATUS`.

#### Scenario: Rendering team details
- **WHEN** teams are loaded in the dashboard
- **THEN** each team row displays the team name, team ID, leader contact intel with icons, member count in a badge, category (KLU/OTHER), and confirmed status

### Requirement: Participants View Presentation
The Admin Dashboard PARTICIPANTS view SHALL display individual members with columns for index `#`, `TEAM NAME`, `NAME`, `REG NO`, `GENDER`, `YEAR/BRANCH`, `PHONE`, `EMAIL`, `COLLEGE`, `ACCOMMODATION`, and `HOSTEL DETAILS`.

#### Scenario: Displaying accommodation and hostel badges
- **WHEN** participant is a hosteller
- **THEN** accommodation column displays a styled HOSTLER badge, and hostel details column displays hostel name, room number, warden name, and contact
- **WHEN** participant is a day scholar
- **THEN** accommodation column displays a styled DAYSCHOLAR badge, and hostel details column displays a dash

### Requirement: Admin Login Aesthetic
The Admin Login interface SHALL adopt a dark, sci-fi cyberpunk aesthetic consistent with the Hackathon Mission Control theme.

#### Scenario: Admin renders login page
- **WHEN** admin navigates to `/gfghackadmin`
- **THEN** admin sees a dark futuristic login card with glowing accents, themed input fields, and responsive controls
