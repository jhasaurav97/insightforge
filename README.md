# InsightForge

InsightForge is a production-ready, full-stack AI-powered journaling and insight platform designed to help users analyze thoughts, emotions, and career concerns using structured AI analysis.


## Live Demo

- Frontend: https://insightforge-nine.vercel.app
- Backend API: https://insightforge-backend-550x.onrender.com
- AI Service: https://insightforge-ai.onrender.com

## Source Code
- GitHub Repository: https://github.com/jhasaurav97/insightforge

## Why InsightForge?

Many people struggle to process career stress, burnout, and emotional overload.
InsightForge provides structured AI-generated insights instead of generic chatbot responses, helping users:

- Reflect on thoughts more clearly
- Identify emotional patterns
- Receive actionable suggestions
- Track insights over time

## Key Features

- Secure user authentication (JWT-based)
- AI-powered text analysis using Gemini
- Structured insights (summary, sentiment, keywords, action items)
- Insight history with pagination
- Delete and manage insights
- Dark / Light mode UI
- Fully deployed production setup

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Context API
- Axios

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL (Neon)

### AI Service
- Python
- FastAPI
- Google Gemini API

### Infrastructure
- Docker & Docker Compose
- Render (Backend & AI Service)
- Vercel (Frontend)

## Architecture Overview

InsightForge uses a decoupled service-based architecture:

- React frontend communicates with a Node.js backend
- Backend handles authentication, persistence, and authorization
- AI processing is delegated to a separate Python service
- AI service is fully decoupled and can be swapped (Gemini, OpenAI, local LLM) without backend changes


## Screenshots

<img src="./screenshots/image-1.png" width="800" alt="Dashboard Dark Mode" />

<img src="./screenshots/image-2.png" width="800" alt="Dashboard Light Mode" />

## Roadmap

- Insight tagging and categories
- Mood trend visualization
- Weekly insight summaries
- Export insights as PDF
- OAuth login (Google)

## Author

Built and maintained by Saurav Jha.

This project represents a production-ready AI product MVP built with scalability and real-world usage in mind.
