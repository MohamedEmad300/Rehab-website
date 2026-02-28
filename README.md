# Serenity Recovery — Frontend

A bilingual (English / Arabic) React frontend for **Serenity Recovery**, a mental health and addiction rehabilitation clinic in Cairo, Egypt.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Internationalisation](#internationalisation)
- [Color Palette](#color-palette)
- [Pages](#pages)
- [Key Conventions](#key-conventions)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v7 |
| Icons | Lucide React |
| UI primitives | Headless UI |
| Fonts | Playfair Display, Inter, Cairo (Google Fonts) |

---

## Getting Started

```bash
# Go to frontend directory
cd rehab-frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```

The dev server runs at `http://localhost:5173` by default.

---

## Project Structure

```
src/
├── components/
│   ├── booking/
│   │   └── BookingForm.tsx       # Shared booking form component
│   └── layout/
│       ├── Navbar.tsx            # Fixed top nav with language toggle
│       └── Footer.tsx            # Site footer with social links
├── context/
│   └── LanguageContext.tsx       # RTL/LTR language context + t() helper
├── hooks/
│   └── useScrollReveal.ts        # Intersection Observer scroll animations
├── i18n/
│   └── translations.ts           # All EN/AR string pairs
├── pages/
│   ├── Home.tsx                  # Landing page
│   ├── Consultants.tsx           # Consultant profiles + booking modal
│   ├── GroupTherapy.tsx          # Group therapy programs
│   ├── DayCare.tsx               # Day care programs + gallery
│   ├── Events.tsx                # Events listings + filters
│   ├── Contact.tsx               # Contact form + info
│   ├── NotFound.tsx              # 404 page
│   └── booking/
│       ├── BookConsultant.tsx
│       ├── BookGroupTherapy.tsx
│       └── BookDayCare.tsx
├── App.tsx                       # Route definitions
├── index.css                     # Global styles, Tailwind layers, animations
└── main.tsx                      # Entry point
```

---

## Internationalisation

The site is fully bilingual. Language is toggled via the navbar pill.

- **Context**: `LanguageContext` exposes `t(key)`, `isAr`, `lang`, and `toggleLang`
- **Translations**: all strings live in `src/i18n/translations.ts` as `{ en, ar }` pairs
- **RTL**: switching to Arabic sets `document.documentElement.dir = 'rtl'` and swaps the body font to Cairo
- **Page-level Arabic data**: event and program cards use separate `arData` / `arPrograms` maps keyed by ID to avoid modifying shared TypeScript types

---

## Color Palette

The palette is defined in `tailwind.config.js` and mirrors the calm, clinical aesthetic of the design reference:

| Token | Hex | Role |
|---|---|---|
| `sage` | `#7BBFBF` (primary) | Muted grey-teal — buttons, icons, links |
| `sand` | `#9876DB` (primary) | Soft lavender — decorative accents |
| `warm` | `#614090` (primary) | Dusty plum — CTA buttons |
| `cream` | `#EAF0F6` | Page background (light blue-grey) |
| `charcoal` | `#2D1B4A` | Body text, dark overlays |

CSS custom properties are kept in sync in `src/index.css` under `:root`.

---

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, services, events preview, testimonials, CTA |
| `/consultants` | Consultant profiles with modal detail view |
| `/group-therapy` | Group therapy program cards |
| `/daycare` | Day care programs + photo/video gallery |
| `/events` | Events listings with type filter + newsletter |
| `/contact` | Contact form + map + social links |
| `/booking/consultant` | Consultant booking form |
| `/booking/group-therapy` | Group therapy booking form |
| `/booking/daycare` | Day care booking form |

---

## Key Conventions

- **Scroll animations**: add `reveal`, `reveal-left`, or `reveal-right` classes — `useScrollReveal` adds `.visible` via `IntersectionObserver`
- **Stagger delays**: pair with `stagger-1` through `stagger-5`
- **Cards**: use the `.card` utility class for consistent border, shadow, and hover lift
- **Buttons**: `.btn-primary` (teal gradient), `.btn-secondary` (outlined), `.btn-coral` (plum CTA)
- **Images**: Unsplash CDN with `?w=&q=80` params for optimised loading
