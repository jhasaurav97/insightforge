# InsightForge

InsightForge is a Dockerized, multi-service application built to demonstrate
industry-grade backend architecture using Node.js, PostgreSQL, Prisma, and a
Python-based AI service.

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL (Database)
- Prisma ORM
- JWT Auth
- Python (AI Service)
- Docker & Docker Compose

### Frontend

- React (Vite)
- Axios
- Basic auth UI (login, register, dashboard)

# HIGH-LEVEL ARCHITECTURE

```
client (React)
   |
   |  HTTP (Axios)
   v
server (Node + Express)
   |
   | Prisma ORM
   v
PostgreSQL DB
```

## PHASE 1: Backend Foundation (TODAY – CORE)

- Backend folder structure
- Express server setup
- Environment variables
- PostgreSQL connection via Prisma
- Basic health API
- Dockerfile for backend
- Docker Compose service for backend + DB

👉 Goal: Backend + DB should start with
**docker compose up**

## PHASE 2: Authentication System

- User model (Prisma)
- Register API
- Login API
- Password hashing (bcrypt)
- JWT token generation
- Protected route middleware

👉 Goal: Secure auth working via Postman

## PHASE 3: Core Business Logic

- (You can extend later based on idea)

**Example:**
- Create resource (posts / services / products)
- Read list
- Update
- Delete
- Role-based access (admin/user)

👉 Goal: Real CRUD with auth

## PHASE 4: Frontend Integration

- React app structure
- Auth pages
- Token handling
- API integration
- Protected routes

👉 Goal: Full app usable in browser

## PHASE 5: Production Readiness

- Proper env handling
- Docker networking
- Volumes for DB
- README documentation
- Clean GitHub repo

👉 Goal: Recruiter-ready project

## Status
🚧 Project under active development. Built incrementally with clean commits.