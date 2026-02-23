# Project Status

**Date:** 23 février 2026

## Summary

`socon-front` is a Vue 3 application bootstrapped with Vite. It provides a frontend to manage teams and
members using Supabase as the backend. Core technologies include Vue 3 (Composition API), Pinia for state
management, Vue Router for navigation, and Supabase JS client for data operations. The workspace contains
components (accordions, sidebar, forms), views (dashboard, team, authentication), and stores for authentication
and member/team management. Toast notifications are used for user feedback.

Authentication is handled via Supabase; the `auth` store maintains the user session and listens to auth state
changes. The `member` store can load teams, fetch members, update records, add new members, and handle
weekly reporting details. UI elements include dynamic accordions for reports and a sidebar for member details.

## Implemented Features

- User sign-up / login with Supabase
- Team list retrieval and display
- Member list retrieval per team with detailed info
- Member statistics (saved vs not saved percentages)
- Add/edit member and reporting functionality
- Responsive sidebar showing member data
- Phone contact links and status badges

## Outstanding TODOs

1. **Sidebar close behavior**: overlay should close sidebar when clicking outside; currently it does not.
2. **Report rendering bug**: after adding a report the details section may render many empty accordions until
   page reload. Likely a reactivity/update issue in `SideBar.vue`.

> These TODOs are noted in `src/components/SideBar.vue`.

## Notes

- `PROJECT_STATUS.md` was previously empty; now contains up-to-date overview and pending work.
- No other explicit TODO comments were found in repository.

