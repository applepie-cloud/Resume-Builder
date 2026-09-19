# 🚀 AI Resume Builder Dashboard

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)

An intelligent, full-stack web application that enables job seekers to generate, optimize, and export ATS-compliant resumes using AI-driven feedback, real-time live preview, and high-performance asynchronous background processing.

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Key Engineering Highlights](#-key-engineering-highlights)
- [Tech Stack](#-tech-stack)
- [Repository Structure](#-repository-structure)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [Usage Guide](#-usage-guide)
- [API Reference](#-api-reference)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Project Overview

Building an ATS-compliant resume often comes with painful formatting issues and uncertainty around bullet-point impact. The **AI Resume Builder** automates this workflow:
- Transforms unstructured user input and draft bullet points into strong, metrics-driven professional descriptions.
- Formats resumes to conform directly to modern Applicant Tracking System (ATS) parsers.
- Renders real-time visual previews alongside the editing workflow.
- Generates pixel-perfect, downloadable vector PDF files.

---

## ⚡ Key Engineering Highlights

- **Asynchronous Task Queuing:** Decouples long-running AI API calls and compute-heavy PDF builds using **Redis** and **BullMQ**, preventing HTTP connection timeouts and keeping the main event loop non-blocking.
- **State Synchronization & Performance:** Real-time updates utilize localized state caching to limit unnecessary re-renders while typing in multi-nested form inputs.
- **Stateless Authentication & Rate Limiting:** JWT-based user authentication secured with bcrypt password hashing and token validation middleware.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand / Redux Toolkit
- **PDF Engine:** `@react-pdf/renderer`
- **HTTP Client:** Axios

### Backend
- **Environment:** Node.js & Express.js
- **Language:** TypeScript
- **Database:** Mongo DB
- **AI Integrations:** OpenAI API / Google Gemini API

### DevOps & Infrastructure
- **Version Control:** Git & GitHub

---

## 📁 Repository Structure

```text
AI-Resume-Builder/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, Redis, and AI client setups
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # JWT authentication & rate limiters
│   │   ├── routes/          # Express API route declarations
│   │   ├── services/        # AI orchestration & PDF generation logic
│   │   └── server.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static icons and assets
│   │   ├── components/      # Shared UI primitives (Buttons, Inputs, Modals)
│   │   ├── features/        # Editor panels, live resume canvas, AI assistants
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # Axios API instances
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## 🔐 Environment Variables

Before running the application, create `.env` files in both the `backend/` and `frontend/` directories.

### Backend Setup (`backend/.env`)
```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# AI Model Provider
AI_API_KEY=your_ai_service_api_key_here
```

### Frontend Setup (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 🚀 Installation & Setup 

#### Prerequisites
- Node.js (v18+)

#### 1. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Start development server and background workers
npm run dev
```

#### 2. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

---

## 💻 Usage Guide

1. **Create an Account:** Register via `/register` to persist templates, saved data, and revisions.
2. **Fill Resume Sections:** Add personal details, education, experience, and projects through the structured editor.
3. **AI Enhancement:**
   - Write a draft bullet point (e.g., *"fixed bug in payment gateway"*).
   - Click **Enhance with AI**.
   - The BullMQ worker processes the text and suggests an action-driven bullet point (e.g., *"Resolved race condition in payment checkout pipeline, reducing drop-off rates by 14%"*).
4. **Inspect Live Preview:** Review spacing, typography, and section alignment dynamically on the right-hand panel.
5. **Download:** Click **Export PDF** to generate the document.

---

## 📡 API Reference

Base URL: `/api/v1`

### Authentication Endpoints

#### Register
```http
POST /auth/register
```
**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "StrongPassword123"
}
```
**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOi..."
}
```

#### Login
```http
POST /auth/login
```
**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "StrongPassword123"
}
```
**Response (200 OK):**
```json
{
  "token": "eyJhbGciOi...",
  "user": { "id": "uuid", "name": "Jane Doe", "email": "jane@example.com" }
}
```

---

### Resume Management Endpoints

All endpoints below require header: `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/resumes` | Fetch all resumes created by the authenticated user |
| `POST` | `/resumes` | Create a new resume record |
| `GET` | `/resumes/:id` | Fetch specific resume details by ID |
| `PUT` | `/resumes/:id` | Update resume sections and data |
| `DELETE` | `/resumes/:id` | Remove a resume entry |

---
## 🔮 Future Enhancements

- [ ] **Job Description Match Score:** Add ATS keyword analysis comparing resume content directly against uploaded job descriptions.
- [ ] **One-Click LinkedIn Import:** Enable profile extraction via OAuth to populate resume templates automatically.
- [ ] **Multi-Template Selector:** Provide modern, executive, and technical academic layouts with customizable color accents.
- [ ] **Integrated Cover Letter Generator:** Generate matching tailored cover letters with a shared visual theme.
- [ ] **Webhooks for Async Notifications:** Add browser-based WebSockets or SSE for instant task completion notifications without polling.

---


## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
