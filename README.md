# Enitan Afolabi & Company - Legal Excellence

A premium legal services platform for Enitan Afolabi & Company, built with a modern TypeScript monorepo architecture. This project uses a centralized Data Access Layer (DAL) and a robust configuration system designed for reliable cloud deployment.

## 🏛 Repository Structure

- `apps/web`: React 19 frontend built with Vite and Tailwind CSS.
- `apps/api`: Express 5 backend server with standardized middleware and validation.
- `packages/db`: Shared database layer using Drizzle ORM and Supabase.
- `packages/api-spec`: OpenAPI specifications for type-safe API communication.

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v20.6.0 or higher (Managed via `.nvmrc`)
- **pnpm**: v9.0.0 or higher
- **PostgreSQL**: A running instance (local or Supabase)

### 2. Installation
Install all workspace dependencies from the root:
```bash
pnpm install
```

### 3. Environment Configuration
Copy the template and fill in your credentials:
```bash
cp .env.example .env
```
> [!IMPORTANT]
> You must provide valid `DATABASE_URL`, `SUPABASE_URL`, and `SESSION_SECRET` values. See `.env.example` for the full list of required variables.

### 4. Database Setup
Sync your database schema:
```bash
pnpm --filter @workspace/db run push
```

### 5. Running Local Development
Launch both the frontend and backend in parallel:
```bash
pnpm run dev
```
- **Web App**: http://localhost:5173 (Default)
- **API Server**: http://localhost:5000/api

## 🛠 Command Reference

| Command | Description |
| :--- | :--- |
| `pnpm run dev` | Core development command (Frontend + Backend) |
| `pnpm run build` | Builds all apps and packages for production |
| `pnpm run start` | Starts the production API server |
| `pnpm run lint` | Runs ESLint across the workspace |
| `pnpm run typecheck` | Validates TypeScript across all codebases |

## ☁️ Deployment

### Continuous Integration
This repository is configured for CI/CD. Ensure all environment variables are correctly mapped in your deployment platform (Vercel, Netlify, or GitHub Actions).

### Vercel / Netlify
1. Connect your repository.
2. Set the root directory to `./`.
3. Provide the environment variables defined in `.env.example`.
4. Use `pnpm run build` as the build command.
