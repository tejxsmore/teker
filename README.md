# Teker – Tech-Only Marketplace

Teker is a modern, tech-focused marketplace built using the latest full-stack tools. Whether you're buying or selling consumer electronics, camera gear, audio tech, or car gadgets – Teker is your go-to platform.

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev)
- **Database**: [PostgreSQL](https://neon.com) via [Neon](https://neon.tech)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Auth**: [Better Auth](https://better-auth.com) (for lightweight and simple authentication)
- **Hosting**: Works seamlessly with Vercel, Netlify, or any Node-compatible host

---

## Features

- Category-based product listings:
  - Consumer Electronics
  - Cameras
  - Audio Equipment
  - Car Tech & Accessories
- Authenticated user accounts with Better Auth
- PostgreSQL + Drizzle ORM for schema-safe DB management
- Neon serverless database connection
- Simple API endpoints for product CRUD

---

## Project Setup

1. **Clone the repo:**

```bash
git clone https://github.com/tejxsmore/teker.git
cd teker
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the root:

```env
DATABASE_URL="your_neon_postgres_url"
AUTH_SECRET="your_better_auth_secret"
```

4. **Run the dev server:**

```bash
npm dev
```
