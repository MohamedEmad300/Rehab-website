# Serenity Rehab — Frontend

A cozy, professional web application for a rehabilitation facility. Built with React, TypeScript, and Tailwind CSS. All pages are fully interactive with API-ready stubs awaiting backend integration.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Pages & Features](#2-pages--features)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Getting Started](#5-getting-started)
6. [Available Scripts](#6-available-scripts)
7. [Design System](#7-design-system)
8. [Backend Integration](#8-backend-integration)
9. [References](#9-references)

---

## 1. Overview

Serenity Rehab is a full-featured frontend for a rehabilitation facility website. It includes a public-facing catalog of services, a multi-step booking system, and contact/callback forms — all designed to connect to a Python FastAPI backend and PostgreSQL database.

**Key characteristics:**
- Warm, calming design using a sage green + sand color palette
- Fully responsive — works on mobile, tablet, and desktop
- Accessible navigation with keyboard support
- All data is currently served from in-component mock arrays — each has a clearly marked stub to replace with a real API call
- SEO meta tags included in `index.html`

---

## 2. Pages & Features

### Home `/`
- Full-screen hero section with background image and overlay
- Animated stats bar (years of experience, patients, doctors, satisfaction rate)
- Services overview cards linking to each catalog page
- About Us section with facility highlights
- Patient testimonials
- Social media feed integration area (Facebook, Instagram, YouTube)
- Call-to-action banner with booking and callback links

### Doctors `/doctors`
- Searchable, filterable grid of doctor profiles
- Filter by specialization (Psychiatry, Trauma, Detox, Behavioral, Family, Neurological)
- Each card shows: name, title, specialization, bio, credentials, languages, availability
- Video intro modal per doctor (stub — awaits API video URL)
- Direct "Book a Session" CTA linking to the booking page with the doctor pre-selected

### Group Therapy `/group-therapy`
- Statistics header (active programs, group size, program duration, confidentiality)
- Searchable, filterable program cards
- Filter by therapy type (CBT, Mindfulness, Trauma, Family, Life Skills)
- Each card shows: program name, therapist, type, description, duration, schedule, capacity, tags
- "Book a Spot" CTA linking to the group therapy booking page with the program pre-selected

### Day Care `/daycare`
- Interactive program selector (Full Day / Morning / Afternoon)
- Dynamic content panel showing activities, hours, and capacity per program
- Facility photo/video gallery with lightbox viewer
- Included services section (meals, transport, family updates, recreational activities)

### Events & Retreats `/events`
- Filterable event listing (All / Retreat / Workshop / Event)
- Each event card shows: date badge, type badge, title, location, date range, capacity, price, tags
- "Register Now" CTA and per-event "Request Callback" button
- Callback request modal with name, phone, email, and preferred call time
- Newsletter subscription strip

### Booking — Doctor Session `/booking/doctor`
- 4-step booking flow: Select Doctor → Pick Date & Time → Your Details → Confirm
- Doctor list pre-populated; pre-selects doctor if navigated from a doctor card
- Date picker (blocks past dates), time slot grid
- Patient info form (name, email, phone, notes)
- Confirmation screen with booking summary
- Success state with booking details

### Booking — Group Therapy `/booking/group-therapy`
- Same 4-step booking flow
- Program list pre-populated; pre-selects program if navigated from a program card

### Booking — Day Care `/booking/daycare`
- Same 4-step booking flow
- Program options: Full Day, Morning, Afternoon

### Contact `/contact`
- Two-column layout: contact info sidebar + contact form
- Contact details: phone, email, address, opening hours
- Map embed placeholder
- Social media buttons (Facebook, Instagram, YouTube)
- Contact form: name, phone, email, subject dropdown, message
- Callback request toggle with preferred time selection
- Success confirmation state

### 404 Not Found `*`
- Friendly not-found page with links back to Home and Contact

---

## 3. Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Vite | 7 | Build tool & dev server |
| React Router | 6 | Client-side routing |
| Tailwind CSS | 3 | Utility-first styling |
| Lucide React | latest | Icon library |
| @headlessui/react | latest | Accessible UI primitives |
| Playfair Display | Google Fonts | Heading typeface |
| Inter | Google Fonts | Body typeface |

---

## 4. Project Structure

```
rehab-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx          # Root layout wrapper (Navbar + Outlet + Footer)
│   │   │   ├── Navbar.tsx          # Responsive navbar, transparent-on-hero scroll effect
│   │   │   └── Footer.tsx          # Footer with links, contact info, social icons
│   │   ├── booking/
│   │   │   └── BookingForm.tsx     # Reusable 4-step booking form component
│   │   └── ui/                     # (reserved for future shared UI components)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Doctors.tsx
│   │   ├── GroupTherapy.tsx
│   │   ├── DayCare.tsx
│   │   ├── Events.tsx
│   │   ├── Contact.tsx
│   │   ├── NotFound.tsx
│   │   └── booking/
│   │       ├── BookDoctor.tsx
│   │       ├── BookGroupTherapy.tsx
│   │       └── BookDayCare.tsx
│   ├── types/
│   │   └── index.ts                # All TypeScript interfaces (Doctor, Event, Booking, etc.)
│   ├── App.tsx                     # Router configuration, all routes declared here
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Tailwind directives, global styles, custom component classes
├── index.html                      # SEO meta tags, font preloads
├── tailwind.config.js              # Custom color palette, fonts, shadows, border radius
├── vite.config.ts
├── tsconfig.app.json
├── future-backend-implementation.md
└── README.md
```

---

## 5. Getting Started

### Prerequisites

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **npm** v9 or higher (included with Node.js)

### Installation

```bash
# Clone or navigate to the project folder
cd rehab-frontend

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

The app will start at:

```
http://localhost:5173
```

Vite's dev server features hot module replacement (HMR) — changes to any file are reflected in the browser instantly without a full reload.

### Building for Production

```bash
npm run build
```

Output is placed in the `dist/` folder. The production build is optimized, minified, and ready to be served by any static host or web server.

To preview the production build locally:

```bash
npm run preview
```

The preview server runs at:

```
http://localhost:4173
```

---

## 6. Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port **5173** |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Preview the production build on port **4173** |
| `npm run lint` | Run ESLint across all TypeScript/TSX files |

---

## 7. Design System

### Color Palette

| Name | Usage | Hex (mid) |
|------|-------|-----------|
| `sage` | Primary — buttons, headers, accents | `#477e4b` |
| `sand` | Secondary — tags, highlights | `#d4833a` |
| `warm` | Tertiary — day care, warm accents | `#da9558` |
| `cream` | Background | `#fdf8f2` |
| `charcoal` | Body text | `#2d2d2d` |

All colors have full 50–900 shade scales defined in `tailwind.config.js`.

### Typography

- **Headings** (`h1`, `h2`, `h3`): Playfair Display — elegant serif for warmth and authority
- **Body / UI**: Inter — clean, highly legible sans-serif

### Reusable CSS Classes (defined in `index.css`)

| Class | Description |
|-------|-------------|
| `.btn-primary` | Filled sage green button with hover/active states |
| `.btn-secondary` | White bordered button |
| `.btn-outline` | White outline button for use on dark backgrounds |
| `.card` | White rounded card with shadow and hover lift effect |
| `.input-field` | Styled form input with focus ring |
| `.label` | Form field label |
| `.badge` | Small pill/tag element |
| `.section-title` | Large centered section heading |
| `.section-subtitle` | Muted subtitle below section heading |

---

## 8. Backend Integration

The frontend is fully prepared for a **Python FastAPI + PostgreSQL** backend. All API calls are stubbed with placeholder `await new Promise(...)` calls that are ready to be replaced.

See **`future-backend-implementation.md`** for the complete guide, including:

- Full architecture diagram
- Every stub location and the exact replacement `fetch()` call
- Pydantic model definitions mirroring the TypeScript types
- Complete API endpoint reference table
- PostgreSQL schema with all tables
- CORS configuration
- Environment variable setup for both frontend and backend
- JWT authentication pattern
- File upload flow for doctor videos and gallery images

### Quick summary of what needs to be wired

| Frontend file | Stub | Backend endpoint |
|---|---|---|
| `BookingForm.tsx` | `await new Promise(...)` | `POST /api/bookings` |
| `Contact.tsx` | `await new Promise(...)` | `POST /api/contact` |
| `Events.tsx` (callback) | `await new Promise(...)` | `POST /api/callbacks` |
| `Doctors.tsx` | mock array | `GET /api/doctors` |
| `GroupTherapy.tsx` | mock array | `GET /api/therapy/programs` |
| `DayCare.tsx` | mock array | `GET /api/daycare/programs` |
| `Events.tsx` | mock array | `GET /api/events` |

### Environment variable

Create `rehab-frontend/.env` before connecting to the backend:

```env
VITE_API_URL=http://localhost:8000
```

---

## 9. References

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com) *(for backend)*
- [`future-backend-implementation.md`](./future-backend-implementation.md) — full backend integration guide

---

*Serenity Rehab — A Sanctuary for Healing & Renewal*
