# Hector PDF POC

POC for a PDF export server with admin interface. The stack is based on nuxt 3.

## Setup

```bash
bun install
bun dev
```

The development server is on `http://localhost:3000`:

## Production

Build the application for production:

```bash
bun build
```

## Server Architecture

- [ ] Schema validation with zod
  - [ ] Middleware to validate input schema
- [ ] Middleware to get context from auth cookie
- [ ] Automatic security check for permissions
- [ ] Automatic audit logs for mutations
- [x] Shared types between frontend and backend (provided via nuxt)
