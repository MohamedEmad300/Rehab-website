# Future Backend Implementation Guide

A complete reference for wiring the Serenity Rehab frontend to a Python FastAPI backend with a PostgreSQL database.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Frontend — What's Already Ready](#2-frontend--whats-already-ready)
3. [Frontend — What Needs to Be Added](#3-frontend--what-needs-to-be-added)
4. [API Stub Replacement Map](#4-api-stub-replacement-map)
5. [FastAPI Project Structure](#5-fastapi-project-structure)
6. [Pydantic Models](#6-pydantic-models)
7. [API Endpoints Reference](#7-api-endpoints-reference)
8. [Database Schema](#8-database-schema)
9. [CORS Configuration](#9-cors-configuration)
10. [Environment Variables](#10-environment-variables)
11. [Authentication (Future)](#11-authentication-future)
12. [File Uploads — Doctor Videos & Gallery](#12-file-uploads--doctor-videos--gallery)
13. [Recommended Tech Stack](#13-recommended-tech-stack)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────┐
│           React Frontend (Vite)             │
│   localhost:5173  /  yourdomain.com         │
└────────────────────┬────────────────────────┘
                     │ HTTP / JSON (REST)
                     ▼
┌─────────────────────────────────────────────┐
│         FastAPI Backend (Python)            │
│              localhost:8000                 │
│                                             │
│  Routers:                                   │
│    /api/doctors                             │
│    /api/bookings                            │
│    /api/therapy                             │
│    /api/daycare                             │
│    /api/events                              │
│    /api/contact                             │
│    /api/callbacks                           │
└──────────────────┬──────────────────────────┘
                   │ SQLAlchemy (async)
                   ▼
┌─────────────────────────────────────────────┐
│             PostgreSQL Database             │
└─────────────────────────────────────────────┘
```

> **Note:** For the scale of this project, a single FastAPI application with separate routers is sufficient. A microservices split can be introduced later if needed without changing the frontend.

---

## 2. Frontend — What's Already Ready

### TypeScript types map directly to Pydantic models

All data shapes are defined in `src/types/index.ts`. Each interface maps 1-to-1 to a FastAPI Pydantic model — no frontend changes needed when the backend is ready.

| TypeScript Interface | FastAPI Pydantic Model     |
|----------------------|----------------------------|
| `Doctor`             | `class Doctor(BaseModel)`  |
| `TherapyProgram`     | `class TherapyProgram(BaseModel)` |
| `DayCareProgram`     | `class DayCareProgram(BaseModel)` |
| `Event`              | `class Event(BaseModel)`   |
| `BookingFormData`    | `class BookingCreate(BaseModel)` |
| `ContactFormData`    | `class ContactCreate(BaseModel)` |

### All API call points are isolated and stubbed

Every form submission and data fetch has a clearly marked placeholder (`await new Promise(...)`). Replacing them is surgical — one `fetch()` call per stub.

---

## 3. Frontend — What Needs to Be Added

### Step 1 — Create the environment file

Create `rehab-frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

For production, create `rehab-frontend/.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com
```

### Step 2 — Create the API client

Create `rehab-frontend/src/lib/api.ts`:

```ts
const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// Convenience helpers
export const api = {
  get:    <T>(path: string) =>
    apiFetch<T>(path),
  post:   <T>(path: string, body: unknown) =>
    apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put:    <T>(path: string, body: unknown) =>
    apiFetch<T>(path, { method: 'PUT',  body: JSON.stringify(body) }),
  delete: <T>(path: string) =>
    apiFetch<T>(path, { method: 'DELETE' }),
};
```

---

## 4. API Stub Replacement Map

Every stub location and the exact call that replaces it.

### Booking Form — `src/components/booking/BookingForm.tsx` line ~68

**Current stub:**
```ts
await new Promise((r) => setTimeout(r, 1800));
setDone(true);
```

**Replace with:**
```ts
await api.post('/api/bookings', {
  service_type: service.type,
  service_id:   form.serviceId,
  date:         form.date,
  time:         form.time,
  patient_name:  form.name,
  patient_email: form.email,
  patient_phone: form.phone,
  notes:        form.notes,
});
setDone(true);
```

---

### Contact Form — `src/pages/Contact.tsx` line ~68

**Current stub:**
```ts
await new Promise((r) => setTimeout(r, 1600));
setSubmitted(true);
```

**Replace with:**
```ts
await api.post('/api/contact', {
  name:             form.name,
  email:            form.email,
  phone:            form.phone,
  subject:          form.subject,
  message:          form.message,
  request_callback: form.requestCallback,
  callback_time:    form.callbackTime,
});
setSubmitted(true);
```

---

### Events Callback Modal — `src/pages/Events.tsx`

**Current stub:**
```ts
// inside handleCallbackSubmit
setSubmitted(true);
```

**Replace with:**
```ts
await api.post('/api/callbacks', {
  event_id:      callbackModal.id,
  name:          callbackForm.name,
  phone:         callbackForm.phone,
  email:         callbackForm.email,
  preferred_time: callbackForm.time,
});
setSubmitted(true);
```

---

### Doctors Catalog — `src/pages/Doctors.tsx`

**Current stub:**
```ts
const mockDoctors: Doctor[] = [ /* hardcoded array */ ];
```

**Replace with a data-fetching hook at the top of the component:**
```ts
const [doctors, setDoctors]   = useState<Doctor[]>([]);
const [loading, setLoading]   = useState(true);

useEffect(() => {
  api.get<Doctor[]>('/api/doctors')
    .then(setDoctors)
    .finally(() => setLoading(false));
}, []);
```

---

### Group Therapy — `src/pages/GroupTherapy.tsx`

```ts
useEffect(() => {
  api.get<TherapyProgram[]>('/api/therapy/programs')
    .then(setPrograms)
    .finally(() => setLoading(false));
}, []);
```

---

### Day Care — `src/pages/DayCare.tsx`

```ts
useEffect(() => {
  api.get<DayCareProgram[]>('/api/daycare/programs')
    .then(setPrograms)
    .finally(() => setLoading(false));
}, []);
```

---

### Events — `src/pages/Events.tsx`

```ts
useEffect(() => {
  api.get<Event[]>('/api/events')
    .then(setEvents)
    .finally(() => setLoading(false));
}, []);
```

---

## 5. FastAPI Project Structure

```
backend/
├── main.py                  # App entry point, CORS, router registration
├── database.py              # SQLAlchemy engine & session
├── models/                  # SQLAlchemy ORM models (database tables)
│   ├── doctor.py
│   ├── booking.py
│   ├── therapy.py
│   ├── daycare.py
│   ├── event.py
│   └── contact.py
├── schemas/                 # Pydantic models (request/response shapes)
│   ├── doctor.py
│   ├── booking.py
│   ├── therapy.py
│   ├── daycare.py
│   ├── event.py
│   └── contact.py
├── routers/                 # FastAPI routers (one per service)
│   ├── doctors.py
│   ├── bookings.py
│   ├── therapy.py
│   ├── daycare.py
│   ├── events.py
│   ├── contact.py
│   └── callbacks.py
├── services/                # Business logic layer
│   ├── booking_service.py
│   ├── notification_service.py  # Email / SMS on booking
│   └── callback_service.py
├── alembic/                 # Database migrations
│   └── versions/
├── alembic.ini
└── requirements.txt
```

---

## 6. Pydantic Models

These mirror the TypeScript interfaces in `src/types/index.ts` exactly.

### `schemas/doctor.py`
```python
from pydantic import BaseModel
from typing import Optional, List

class DoctorBase(BaseModel):
    name: str
    title: str
    specialization: str
    bio: str
    credentials: List[str]
    languages: List[str]
    available_days: List[str]
    image_url: str
    video_url: Optional[str] = None

class DoctorCreate(DoctorBase):
    pass

class Doctor(DoctorBase):
    id: str

    class Config:
        from_attributes = True
```

---

### `schemas/booking.py`
```python
from pydantic import BaseModel, EmailStr
from typing import Optional, Literal

class BookingCreate(BaseModel):
    service_type:  Literal['doctor', 'group-therapy', 'daycare']
    service_id:    Optional[str] = None
    date:          str
    time:          str
    patient_name:  str
    patient_email: EmailStr
    patient_phone: str
    notes:         Optional[str] = None

class BookingResponse(BookingCreate):
    id:     str
    status: str  # 'pending' | 'confirmed' | 'cancelled'

    class Config:
        from_attributes = True
```

---

### `schemas/contact.py`
```python
from pydantic import BaseModel, EmailStr
from typing import Optional

class ContactCreate(BaseModel):
    name:             str
    email:            EmailStr
    phone:            str
    subject:          str
    message:          str
    request_callback: bool = False
    callback_time:    Optional[str] = None

class CallbackCreate(BaseModel):
    event_id:       Optional[str] = None
    name:           str
    phone:          str
    email:          Optional[EmailStr] = None
    preferred_time: Optional[str] = None
```

---

## 7. API Endpoints Reference

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/doctors` | List all doctors |
| `GET` | `/api/doctors/{id}` | Get single doctor |
| `POST` | `/api/doctors` | Create doctor (admin) |
| `PUT` | `/api/doctors/{id}` | Update doctor (admin) |
| `DELETE` | `/api/doctors/{id}` | Delete doctor (admin) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/bookings` | Create a booking |
| `GET` | `/api/bookings/{id}` | Get booking by ID |
| `GET` | `/api/bookings` | List all bookings (admin) |
| `PUT` | `/api/bookings/{id}/status` | Update booking status (admin) |
| `DELETE` | `/api/bookings/{id}` | Cancel a booking |

### Group Therapy
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/therapy/programs` | List all programs |
| `GET` | `/api/therapy/programs/{id}` | Get single program |
| `POST` | `/api/therapy/programs` | Create program (admin) |

### Day Care
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/daycare/programs` | List day care programs |
| `GET` | `/api/daycare/programs/{id}` | Get single program |

### Events & Retreats
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/events` | List all events |
| `GET` | `/api/events/{id}` | Get single event |
| `POST` | `/api/events` | Create event (admin) |
| `PUT` | `/api/events/{id}` | Update event (admin) |
| `DELETE` | `/api/events/{id}` | Delete event (admin) |

### Contact & Callbacks
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/callbacks` | Request a callback |
| `GET` | `/api/callbacks` | List all callbacks (admin) |
| `PUT` | `/api/callbacks/{id}/status` | Mark callback handled (admin) |

---

## 8. Database Schema

### PostgreSQL Tables

```sql
-- Doctors
CREATE TABLE doctors (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    title           VARCHAR(255),
    specialization  VARCHAR(255),
    bio             TEXT,
    credentials     TEXT[],
    languages       TEXT[],
    available_days  TEXT[],
    image_url       VARCHAR(500),
    video_url       VARCHAR(500),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Therapy Programs
CREATE TABLE therapy_programs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    therapist   VARCHAR(255),
    type        VARCHAR(255),
    description TEXT,
    duration    VARCHAR(100),
    schedule    VARCHAR(255),
    capacity    INTEGER,
    image_url   VARCHAR(500),
    tags        TEXT[],
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Day Care Programs
CREATE TABLE daycare_programs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    hours       VARCHAR(100),
    description TEXT,
    activities  TEXT[],
    capacity    INTEGER,
    image_url   VARCHAR(500),
    video_url   VARCHAR(500),
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Events
CREATE TABLE events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(255) NOT NULL,
    type        VARCHAR(50),  -- 'retreat' | 'event' | 'workshop'
    date        DATE NOT NULL,
    end_date    DATE,
    location    VARCHAR(255),
    description TEXT,
    capacity    INTEGER,
    price       NUMERIC(10, 2),
    image_url   VARCHAR(500),
    video_url   VARCHAR(500),
    tags        TEXT[],
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_type  VARCHAR(50) NOT NULL,  -- 'doctor' | 'group-therapy' | 'daycare'
    service_id    UUID,
    date          DATE NOT NULL,
    time          VARCHAR(20),
    patient_name  VARCHAR(255) NOT NULL,
    patient_email VARCHAR(255) NOT NULL,
    patient_phone VARCHAR(50),
    notes         TEXT,
    status        VARCHAR(50) DEFAULT 'pending',
    created_at    TIMESTAMP DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE contact_messages (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name             VARCHAR(255) NOT NULL,
    email            VARCHAR(255) NOT NULL,
    phone            VARCHAR(50),
    subject          VARCHAR(255),
    message          TEXT NOT NULL,
    request_callback BOOLEAN DEFAULT FALSE,
    callback_time    VARCHAR(50),
    handled          BOOLEAN DEFAULT FALSE,
    created_at       TIMESTAMP DEFAULT NOW()
);

-- Callback Requests
CREATE TABLE callback_requests (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id       UUID REFERENCES events(id) ON DELETE SET NULL,
    name           VARCHAR(255) NOT NULL,
    phone          VARCHAR(50) NOT NULL,
    email          VARCHAR(255),
    preferred_time VARCHAR(50),
    handled        BOOLEAN DEFAULT FALSE,
    created_at     TIMESTAMP DEFAULT NOW()
);
```

---

## 9. CORS Configuration

Add this to `backend/main.py` — required for the React frontend to communicate with FastAPI:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Serenity Rehab API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",        # Vite dev server
        "https://www.yourdomain.com",   # Production frontend
        "https://yourdomain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 10. Environment Variables

### Backend — `backend/.env`
```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/serenity_rehab
SECRET_KEY=your-secret-key-here
ENVIRONMENT=development

# Email notifications (booking confirmations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=your-smtp-password

# File storage (for doctor videos, gallery images)
S3_BUCKET=serenity-rehab-media
S3_REGION=eu-central-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
```

### Frontend — `rehab-frontend/.env`
```env
VITE_API_URL=http://localhost:8000
```

### Frontend — `rehab-frontend/.env.production`
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## 11. Authentication (Future)

When an admin dashboard or protected routes are needed, add JWT auth to FastAPI:

```python
# requirements: python-jose[cryptography], passlib[bcrypt]

from fastapi.security import OAuth2PasswordBearer
from jose import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    # decode and validate JWT
    ...
```

On the frontend, store the token in `localStorage` or a secure cookie and pass it via the `Authorization` header in `api.ts`:

```ts
export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  ...
}
```

---

## 12. File Uploads — Doctor Videos & Gallery

Doctor intro videos and facility gallery images should be stored in object storage (S3 or Cloudflare R2), not in the database.

**Flow:**
1. Admin uploads file → FastAPI receives it
2. FastAPI uploads to S3 → gets back a public URL
3. URL is saved to the database (`video_url`, `image_url` columns)
4. Frontend fetches the URL from the API and renders it directly

```python
# routers/doctors.py
@router.post("/{doctor_id}/video")
async def upload_doctor_video(
    doctor_id: str,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
):
    url = await upload_to_s3(file, folder="doctors/videos")
    await db.execute(
        update(Doctor).where(Doctor.id == doctor_id).values(video_url=url)
    )
    await db.commit()
    return {"video_url": url}
```

---

## 13. Recommended Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | React 18 + TypeScript + Vite | Already built |
| Routing | React Router v6 | Already configured |
| Styling | Tailwind CSS v3 | Already configured |
| Backend | Python 3.11+ + FastAPI | Async-first |
| ORM | SQLAlchemy 2.0 (async) | Works with PostgreSQL |
| Migrations | Alembic | Schema versioning |
| Database | PostgreSQL 15+ | Primary data store |
| Validation | Pydantic v2 | Request/response schemas |
| Auth (future) | python-jose + passlib | JWT-based |
| File Storage | AWS S3 / Cloudflare R2 | Doctor videos, gallery |
| Email | SMTP via `fastapi-mail` | Booking confirmations |
| Dev Tools | `uvicorn`, `pgAdmin`, Postman | Local development |

---

*Last updated: February 2026*
