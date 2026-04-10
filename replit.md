# Enitan Afolabi & Company — Corporate Law Firm Website

## Overview

A complete, production-ready corporate law firm website for Enitan Afolabi & Company, a Lagos-based law firm founded in 1996. Premium design with deep dark brown and warm tan palette.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + TypeScript + Tailwind CSS (artifact: `law-firm`)
- **Backend**: Express 5 API server (artifact: `api-server`)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Session auth**: express-session for admin auth
- **Routing**: Wouter
- **UI**: Radix UI + Shadcn components, Framer Motion animations
- **Typography**: Playfair Display (headings), Inter (body)

## Key Features

### Public Pages
- **Home** — Hero, firm legacy, practice areas, team preview, contact CTA
- **About** — Firm story, mission, vision, values
- **Practice Areas** — Vertical tab navigation (desktop), accordion (mobile)
- **Our Team** — 3 executive profiles with bio modals
- **Careers** — Application form connected to API
- **Contact** — Contact form connected to API
- **Blog** — Real blog posts with search/filter, paginated grid
- **Blog Details** — Full article rendering with rich HTML content

### Admin Dashboard (`/admin`)
- Admin login with session auth (email: admin@enitanafolabiandco.com, password: admin123)
- Dashboard stats (messages, applications, blog posts)
- Contact messages management
- Career applications management
- Blog post CRUD (create, edit, delete)

## Database Tables

- `admin_users` — Admin staff
- `contact_messages` — Contact form submissions
- `career_applications` — Job applications
- `blog_posts` — Blog articles

## Firm Details

- **Name**: Enitan Afolabi & Company
- **Founded**: 1996
- **Address**: 1st Floor, Chemline House, No 7, Obasa road, off Oba Akran Avenue, Ikeja, Lagos-State
- **Email**: info@enitanafolabiandco.com
- **Tel**: +2348119480206

## Admin Credentials

- **Email**: admin@enitanafolabiandco.com
- **Password**: admin123

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/law-firm run dev` — run frontend locally

## Color Palette

- **Primary**: Deep dark brown (HSL ~20 60% 13%)
- **Secondary**: Warm tan/caramel (HSL ~32 55% 52%)
- **Neutral**: White/cream

## Design Notes

- Premium Playfair Display serif headings
- Framer Motion subtle scroll animations
- Fully responsive — all pages, forms, nav, and admin work on mobile
- Active page state in navigation
- Sticky header with mobile hamburger menu
