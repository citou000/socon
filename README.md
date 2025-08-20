# Socon Project

## Description

Socon (Soul Connect) is a CRM application designed for tracking and managing soul harvesting activities. It's a modern full-stack web application that helps monitor members, their locations, and spiritual progress. The frontend is built with Vue.js and Tailwind CSS, while the backend uses Bun runtime with TypeScript and Drizzle ORM for efficient data management.

### Key Features

- **Member Management**: Track and manage member information including names, neighborhoods, and salvation status
- **Soul Harvesting Tracking**: Monitor soul harvesting activities and progress
- **Reporting System**: Add and track weekly reports for each member
- **Dashboard Analytics**: View key statistics and metrics about soul harvesting progress
- **User Authentication**: Secure login and signup system for authorized access

### Data Structure

Members are tracked with the following information:

- Name
- Neighborhood
- Soul Harvesters
- Salvation Status
- Detailed weekly reports

## Project Structure

The project is organized into two main directories:

- `socon-back/`: Contains the backend code, built with TypeScript and Bun, featuring:

  - Drizzle ORM for database operations
  - Bun HTTP for server functionality
  - TypeScript for type safety

- `socon-front/`: Contains the frontend code, built with Vue.js, featuring:
  - Vite as the build tool
  - Tailwind CSS for styling
  - PrimeIcons for UI icons
  - Vue Router for routing
  - Modern state management
