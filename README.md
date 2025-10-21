# Virodip — Smart Parking Web App (Frontend)

This repository contains the frontend of Virodip — a smart parking web application built with Vue 3 and TypeScript. The app demonstrates booking flows, user profile management, transactions, subscriptions and map-based parking discovery.

---

## Table of Contents

- Features
- Tech stack
- Project structure
- Demo data
- Local development

---

## Features

- View parking locations on a map with markers and basic availability
- Search and filter bookings (active / completed)
- Book parking: select date, start/end time, and car
- User profile: manage personal data, cars and subscription
- Transactions / payments list (mock data)
- Authentication integration with Azure AD B2C (MSAL client-side)
- Internationalization (English / Ukrainian)

## Tech stack

- Vue 3
- TypeScript
- Pinia
- Vue Router
- Tailwind CSS
- Vee Validate + Yup
- Google Maps JavaScript API + Vue 3 Google Maps
- Chart.js
- MSAL.js

## Project structure (important folders)

- `src/`
  - `assets/` — images, icons, styles
  - `components/` — reusable UI components (BaseButton, BaseInput, modals, etc.)
  - `containers/` — page containers (book, parkings, account, main, about, contact, faq)
  - `stores/` — Pinia stores (auth store example)
  - `types/` — TypeScript types (User, Booking, Parking, Transaction)
  - `utils/` — helper utilities (date formatting, distance calc, masks)
  - `router/` — route definitions
  - `constants/` — demo data (DEFAULT_USER, parkings, transactions)

## Demo data

- The app uses `src/constants/index.ts` to seed demo parkings, transactions and a default user. This lets the UI work without a backend. When integrating a backend, replace the demo imports with API calls and remove or gate the demo constants behind a feature flag.

## Local development

1. Install dependencies

```powershell
npm install
```

2. Run dev server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

4. Preview production build

```powershell
npm run preview
```

### Type checking

```powershell
npm run type-check
```

## Notes about authentication

- The project includes MSAL configuration in `src/azure/msalConfig.ts`. The current flow is optimized for client-side redirects. If you plan to use server-side tokens or implement stricter backend validation, coordinate token validation and session handling with the backend.

