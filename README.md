# Socon Front

A Vue 3 application for managing teams and members, built with Vite and powered by Supabase. This app is designed to help organizations track and manage outreach efforts, member details, and reporting.

## Features

- **Authentication**: Secure sign-up and login using Supabase Auth
- **Team Management**: View and add teams, with easy navigation to team dashboards
- **Member Tracking**: Add, edit, and view members (referred to as "souls") with details like name, neighborhood, status, and custom fields
- **Reporting**: Submit and view weekly reports for members
- **Dashboard**: Interactive data tables, statistics (e.g., saved percentages), and a responsive sidebar for member details
- **Responsive Design**: Mobile-friendly with auto-sliding stats on smaller screens
- **Notifications**: Toast messages for user feedback

## Tech Stack

- **Frontend**: Vue 3 (Composition API), Vue Router, Pinia
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PrimeIcons, Lucide Vue Next
- **Backend**: Supabase (Auth & Database)
- **Linting/Formatting**: ESLint, Oxlint, Prettier
- **Other**: Vue Toastification, Vue Devtools

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/citou000/socon.git
   cd socon