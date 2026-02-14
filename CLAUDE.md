# CLAUDE.md — Travel Planner Project

## Project Overview
A full-stack travel planning web app. Users browse destinations, create travel plans, book trips, process payments via Stripe, and leave reviews.

## Repository Structure
```
travel-planner/
├── backend/          # Express.js REST API
│   ├── controllers/  # Route logic
│   ├── middleware/   # Auth, rate limiting
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API route definitions
│   └── server.js     # Entry point — PORT 5001
├── frontend/         # React + Vite SPA
│   └── src/
│       ├── components/  # Shared UI components
│       ├── context/     # React context (auth, etc.)
│       ├── pages/       # Route-level page components
│       ├── services/    # API call functions (axios)
│       ├── lib/         # Utility functions
│       └── data/        # Static/seed data
└── CLAUDE.md
```

## Tech Stack

### Backend
| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Node.js | >=20 |
| Framework | Express | ^5.2.1 |
| Database | MongoDB + Mongoose | ^9.3.3 |
| Auth | JWT (jsonwebtoken) | ^9.0.3 |
| Passwords | bcryptjs | ^3.0.3 |
| Payments | Stripe | ^21.0.1 |
| Rate Limiting | express-rate-limit | ^8.3.2 |
| Dev Server | nodemon | ^3.1.14 |

### Frontend
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | ^19.2.4 |
| Build | Vite | ^8.0.1 |
| Routing | react-router-dom | ^7.13.2 |
| Styling | Tailwind CSS | ^3.4.19 |
| UI Components | Radix UI | various |
| Animations | Framer Motion | ^12.38.0 |
| Icons | lucide-react + react-icons | latest |
| HTTP Client | axios | ^1.14.0 |
| Payments | @stripe/react-stripe-js | ^6.1.0 |
| Toasts | sonner | ^2.0.7 |
| Date Picker | react-day-picker | ^9.14.0 |

## Models
- **User** — auth, profile
- **Plan** — travel plan/itinerary
- **Review** — destination reviews

## API Routes
- `/api/auth` — register, login, forgot password
- `/api/destinations` — browse destinations
- `/api/booking` — create and manage bookings
- `/api/payment` — Stripe payment intent
- `/api/plans` — travel plans CRUD
- `/api/reviews` — destination reviews

## Environment Variables

### Backend (`backend/.env`)
```
MONGO_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
ALLOWED_ORIGINS=
PORT=5001
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5001
VITE_STRIPE_PUBLIC_KEY=
```

## Coding Conventions
- Backend: CommonJS (`require`/`module.exports`)
- Frontend: ES Modules (`import`/`export`), JSX
- Components: PascalCase filenames, functional components with hooks
- API services: centralised in `frontend/src/services/`
- Styling: Tailwind utility classes; Radix UI for accessible primitives
- No inline styles unless absolutely necessary

## Restricted Files — Do NOT modify without explicit instruction
- `backend/.env`
- `frontend/.env`
- `backend/middleware/` (auth/rate-limit — security critical)
- `package-lock.json` files

## Run Commands
```bash
# Backend
cd backend && npm run dev      # http://localhost:5001

# Frontend
cd frontend && npm run dev     # http://localhost:5173
```

## Deployment
- Frontend: Vercel (`frontend/vercel.json` present)
- Backend: Render (PORT set by environment)

## Author
[@manny2341](https://github.com/manny2341)
