# Socon Project

## Description

Socon is a full-stack web application. 
(Further details about the project's purpose and functionality can be added here as they become clear).

## Project Structure

The project is organized into two main directories:

- `socon-back/`: Contains the backend code, built with TypeScript and Bun.
- `socon-front/`: Contains the frontend code, built with Vue.js, Vite, and pnpm.

## Installation

### Backend (`socon-back/`)

1. Navigate to the `socon-back/` directory:
   ```bash
   cd socon-back
   ```
2. Install dependencies using Bun:
   ```bash
   bun install
   ```

### Frontend (`socon-front/`)

1. Navigate to the `socon-front/` directory:
   ```bash
   cd socon-front
   ```
2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

## Usage

### Backend (`socon-back/`)

1. Navigate to the `socon-back/` directory.
2. Start the backend server:
   ```bash
   bun run index.ts
   ```

### Frontend (`socon-front/`)

1. Navigate to the `socon-front/` directory.
2. Start the frontend development server:
   ```bash
   pnpm dev
   ```
   This will typically open the application in your web browser at `http://localhost:5173` (Vite's default).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

Please ensure your code adheres to existing styling and linting configurations. You can run linters and formatters using the scripts available in `socon-front/package.json`. For the backend, ensure your TypeScript code is clean and well-documented.
```
