<div align="center">

<img src="public/favicon.png" alt="Learntopia" width="72" height="72" />

# Learntopia

**An interactive e-learning platform for children and teenagers.**  
Structured courses, timed quizzes, real-time progress tracking, and a global leaderboard — all in one place.

[![Live Demo](https://img.shields.io/badge/Live-learntopia--react.web.app-7c3aed?style=for-the-badge&logo=firebase&logoColor=white)](https://learntopia-react.web.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%2B%20Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Learntopia is a full-stack e-learning web application that allows students to enrol in topic-specific course tracks, complete structured modules, and test their knowledge with randomized timed quizzes. Progress, scores, and streaks are stored securely in Firestore and visualised on a personal dashboard and a public leaderboard.

The platform is designed to be fast, accessible, and mobile-friendly, with authentication via Firebase (email/password and Google OAuth) and continuous deployment to Firebase Hosting.

---

## Features

| Feature | Description |
|---|---|
| **Gamified Course Overhaul** | Step-by-step interactive courses designed for kids aged 7-14 with rich learning cards (Story, Concept, Fun Fact, Pro Tip, Example, Activity, Recap). |
| **Web Audio SFX System** | Native Web Audio API sound synthesizer ($0 cost, 0 dependencies) playing audio feedback for clicks, correct answers, module finishes, level-ups, and badge unlocks with persistent mute toggle. |
| **LessonPlayer Engine** | Paginated step-by-step lesson player with visual theme cards, progress dots, and code syntax blocks. |
| **Multi-Type Exercise Engine** | Comprehension challenges featuring Multiple Choice, True/False, Fill-in-the-Blank, and Tap-to-Connect Matching Pairs. |
| **XP, Levels & Badges** | Earn XP per module (+50 XP) and course (+100 XP). Level up from Rookie Coder to Grandmaster with animated celebration overlays and collectible course badges. |
| **Course Catalog** | Searchable catalog of multi-module course tracks with enrollment, per-module progress, and course completion tracking. |
| **Timed Quizzes** | 15-second per-question randomized quizzes with instant feedback, score logging, and per-quiz leaderboards. |
| **Quiz Completion Indicators** | Done badge and best score on completed quiz cards; Start button becomes Retake. Incomplete attempts are never logged. |
| **Personal Dashboard** | Consolidated view of enrolled courses, completion status, XP, Level progress, badges, total points, and daily streak. |
| **Daily Login Streaks** | Consecutive daily login counter tracked in local timezone using `Date.UTC` integer arithmetic — DST-safe, no floating-point rounding. Resets on a missed day. |
| **Global Leaderboard** | Public leaderboard ranking all users by total points. Per-quiz leaderboards available for each quiz topic. |
| **Guest Score Preservation** | Guest quiz scores are automatically saved to the user profile when signing in or registering from the results screen. |
| **AI Tutors** | Each course has a personality-driven AI tutor to guide learners through the subject matter. |
| **Strict Focus Mode** | Route-level navigation blocker prevents accidental loss of quiz or module progress. |
| **Course Controls** | Unenroll, resume, or reset completed courses directly from the dashboard. |
| **Google OAuth** | One-tap sign-in with Google alongside standard email/password authentication. |
| **Firestore Security Rules** | Server-side rules enforce per-user data isolation. Leaderboard exposes name and score only — never private data. |
| **SEO & Meta** | Canonical links, Open Graph, JSON-LD schema, geographic meta, and custom favicon/meta image on every page. |
| **Fully Responsive** | Mobile, tablet, and desktop layouts. Dynamic viewport height and custom overscroll colours for native-feel scrolling. |
| **Contact Form** | Redesigned contact page with Firestore-backed submissions (`ContactMessages` collection). No third-party form services — messages are owned entirely and reviewable in the Firebase Console. |
| **Thank You Page** | Dedicated `/thank-you` page after contact form submission with personalised greeting, animated check icon, and quick-nav cards to Courses and Quizzes. |
| **Toast Notifications** | Fully styled error/success/warning toasts — solid high-contrast colours, full-width on mobile with readable padding. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS + custom design tokens |
| Routing | React Router DOM v7 |
| Animation | GSAP + @gsap/react |
| Backend | Firebase Authentication + Cloud Firestore |
| Hosting | Firebase Hosting (CI/CD on push to `main`) |
| Project Tracking | Linear |
| Notifications | React Toastify |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A Firebase project with Authentication and Firestore enabled

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/TAJAMUL11/Learntopia.git
cd Learntopia

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Firebase config values in .env

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # Production build to /dist
npm run preview    # Preview production build locally
npm run lint       # ESLint check
```

---

## Project Structure

```
src/
├── Authentication/       # Login and SignUp pages with Firebase auth logic
├── Components/
│   ├── Dashboard.jsx     # Personal student dashboard
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── ui/               # Reusable design-system components (Button, Card, Icon, Badge, …)
├── context/
│   └── AuthContext.jsx   # Global auth state, streak tracking, Firestore profile sync
├── data/
│   ├── coursesData.js    # Course and module definitions
│   └── quizData.js       # Quiz topic and question pools
├── pages/
│   ├── Home.jsx
│   ├── Courses.jsx
│   ├── CourseDetails.jsx
│   ├── Quiz.jsx          # Quiz engine with timer, scoring, and leaderboard sync
│   ├── Leaderboard.jsx   # Global and per-quiz leaderboards
│   ├── Doc.jsx           # Platform documentation
│   ├── Privacy.jsx       # Privacy Policy
│   ├── Terms.jsx         # Terms of Service
│   ├── Contact.jsx       # Contact form → saves to Firestore ContactMessages
│   └── ThankYou.jsx      # Post-submission thank you page with animated check icon
├── App.jsx               # Route definitions
└── main.jsx
```

---

## Environment Variables

Create a `.env` file in the project root. **Never commit this file.** An `.env.example` template is provided.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

All Firebase config variables use the `VITE_` prefix to be exposed to the Vite build. The `.env` file is listed in `.gitignore` and is never committed.

---

## Deployment

Learntopia is deployed to **Firebase Hosting** with automatic continuous deployment triggered on every push to `main`.

```bash
# Manual deploy (if needed)
firebase deploy --only hosting
```

Firestore security rules are also managed in the repository:

```bash
# Deploy rules only
firebase deploy --only firestore:rules
```

---

## Security

- **Authentication**: Firebase Authentication handles all auth flows. Passwords are never stored in the application.
- **Firestore Rules**: All reads and writes are validated server-side. Users can only access their own profile, courses, and quiz attempts. Leaderboard data is public-readable but owner-write only.
- **No secrets in code**: All config lives in `.env` (excluded from git). Production secrets are configured in the Firebase and hosting panels directly.
- **No sensitive files committed**: Agent config, skill files, and internal planning documents are excluded via `.gitignore`.

---

## Contributing

This project is developed and maintained by **Tajamul Wani**

---

## License

All rights reserved. The content, code, and design of Learntopia are the intellectual property of the project owner. Unauthorised reproduction or redistribution is prohibited.
