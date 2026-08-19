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
| **Custom Avatars & Profile Photos** | Custom display name and 16 pre-generated static SVG avatars (DiceBear "Adventurer", served as cached files — the library never ships to the client). Authenticated users can optionally toggle their Google account photo on private surfaces (Dashboard, Navbar) with automatic fallback to the avatar. Real photos are strictly excluded from the public leaderboard for COPPA/child-privacy safety (enforced in code, Firestore rules, and tests). |
| **Centered Glassmorphic Popups** | Native, zero-dependency centered notification system replacing corner toasts. Displays elegant modal popups with glowing status badges, clear titles, detailed text, action buttons, and hover-pausable countdown timers. |
| **Profile Setup & Editing** | First-time users complete a **required** full-screen profile step (display name + avatar). Editing later opens a **dedicated Edit Profile view** (not a popup) reached from the dashboard — a two-column layout with the account email shown read-only. Both flows share one component. |
| **Instant Branded Startup Splash** | Fast startup performance with an inline branded splash screen in `index.html` and `AppLoader` that paints on the very first frame to eliminate white/blank screens during initial script loading and auth resolution. |
| **Multi-Language (i18n)** | Global localization switcher. **English 🇺🇸 and Spanish 🇪🇸 are live and fully translated** (UI, all courses, quizzes, docs, legal pages). Additional languages are staged in the data and stay hidden from the switcher until each is complete end-to-end (a partial translation is worse UX than none). |
| **Gamified Course Overhaul** | Step-by-step interactive courses designed for kids aged 7-14 with rich learning cards (Story, Concept, Fun Fact, Pro Tip, Example, Activity, Recap). |
| **Web Audio SFX System** | Native Web Audio API sound synthesizer ($0 cost, 0 dependencies) playing audio feedback for clicks, correct answers, module finishes, level-ups, and badge unlocks with persistent mute toggle. |
| **LessonPlayer Engine** | Paginated step-by-step lesson player with visual theme cards, progress dots, and code syntax blocks. |
| **Multi-Type Exercise Engine** | Comprehension challenges featuring Multiple Choice, True/False, Fill-in-the-Blank, and Tap-to-Connect Matching Pairs. |
| **XP, Levels & Badges** | Earn XP per module (+50 XP) and course (+100 XP). Level up from Rookie Coder to Grandmaster with animated celebration overlays and collectible course badges. |
| **Course Catalog** | Searchable catalog of multi-module course tracks with enrollment, per-module progress, and course completion tracking. |
| **Timed Quizzes** | 15-second per-question randomized quizzes with instant feedback, score logging, and per-quiz leaderboards. |
| **Quiz Completion Indicators** | Done badge and best score on completed quiz cards; Start button becomes Retake. Incomplete attempts are never logged. |
| **Personal Dashboard** | Student hub with a clean profile header, 4 metric cards (XP, streak, enrolled, completed), 3-tier course cards, sub-navigation views (Overview, Enrolled Courses, Completed, Quiz History), a Continue-Learning spotlight, and a daily XP goal. Restrained core-color design (violet + sky; status colors only for status) and fully responsive. |
| **Daily Streaks & Milestone Rewards** | Consecutive daily login counter tracked with `Date.UTC` integer arithmetic (DST-safe), global and real-time across devices. Milestone popups at **7 / 15 / 30 days** grant bonus XP (**+20 / +40 / +80**), shown once per day from server-confirmed data. Resets on a missed day. |
| **Global Leaderboard** | Public leaderboard ranking all users by total points and quiz scores. Access restricted exclusively to authenticated users. |
| **Guest Score Preservation** | Guest quiz scores are automatically saved to the user profile when signing in or registering from the results screen. |
| **Google Gemini AI Tutor** | Interactive slide-out AI assistant powered by Google Gemini (`AIChatDrawer.jsx`). Each course features a persona-driven AI tutor (*Robo-Py, Count AI-Cula, CoinBot, PixelBot, MarketBot, ArtBot*) rendering stylized vector SVG robot avatars (`BotAvatar.jsx`), providing kid-friendly, course-contextual responses and hints in real-time. |
| **Strict Focus Mode** | Route-level navigation blocker prevents accidental loss of quiz or module progress. |
| **Course Controls** | Unenroll, resume, or reset completed courses directly from the dashboard. |
| **Google OAuth** | One-tap sign-in with Google alongside standard email/password authentication. |
| **Smart Auth Guidance** | Interactive account guidance modals and seamless email pre-filling when transitioning between `/login` and `/signUp`. |
| **Firestore Security Rules** | Server-side rules enforce per-user data isolation, anti-cheat (monotonic points/XP), and a PII-free public leaderboard. Covered by an automated **rules-test suite** run in the emulator on every PR (the **Firestore Rules Tests** GitHub Action). |
| **Bot Protection (App Check)** | Firebase App Check with **reCAPTCHA v3** attests that requests come from the real app, blocking bots/scripts that replay the public config against Firestore. Wired in dormant (activates via `VITE_RECAPTCHA_SITE_KEY`); live in production. |
| **Error Monitoring (Sentry)** | Production crashes are reported to Sentry with stack traces and breadcrumbs. Loaded via dynamic import and gated to production + a DSN, so it no-ops otherwise (activates via `VITE_SENTRY_DSN`). |
| **SEO & Meta** | Canonical links, Open Graph, JSON-LD schema, geographic meta, and custom favicon/meta image on every page. |
| **Fully Responsive** | Mobile, tablet, and desktop layouts. Dynamic viewport height and custom overscroll colours for native-feel scrolling. |
| **Contact Form** | Redesigned contact page with Firestore-backed submissions (`ContactMessages` collection). No third-party form services — messages are owned entirely and reviewable in the Firebase Console. |
| **Thank You Page** | Dedicated `/thank-you` page after contact form submission with personalised greeting, animated check icon, and quick-nav cards to Courses and Quizzes. |
| **Centered Glassmorphic Popups** | Custom, zero-dependency centered notification modal system featuring glowing status badges, contextual titles, detailed body copy, action buttons, audio SFX, and 5s auto-closing timers. |
| **Mobile Docs & Navigation** | Mobile jump pill bar on documentation page (`/doc`), responsive scrollable tables (`overflow-x-auto`), and flex-col layout conversions for seamless small-screen reading. |
| **Delete Profile Control** | Destructive profile deletion feature in Student Dashboard with a warning modal, confirmation safety check ("DELETE"), full Firestore record wiping, and Firebase Auth account deletion. |

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
| Notifications | Native Glassmorphic Popups (`ToastContext`) |

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
npm run test:rules:ci  # Firestore rules tests in the local emulator (needs Java)
```

### Firestore rules tests

The Firestore security rules are covered by an automated test suite
(`test/firestore.rules.test.js`) that runs against the real `firestore.rules`
file inside the local Firestore emulator — no Firebase login or secrets needed.
It verifies the anti-cheat, PII, privacy, and admin-only guarantees, and runs on
every pull request via the **Firestore Rules Tests** GitHub Action.

```bash
npm run test:rules:ci   # starts the emulator, runs the tests, shuts it down
```

Running locally requires a Java runtime (the emulator is a Java process); CI
installs it automatically.

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

Create a `.env` file in the project root. **Never commit this file** — it is listed in `.gitignore`. An `.env.example` template is provided.

```env
# Firebase — from Firebase Console → Project settings → SDK setup and configuration.
# (authDomain, projectId, and storageBucket are non-secret and set in src/firebase/firebase.js.)
VITE_API_KEY=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=

# Google Gemini — required for the AI Tutor chat.
VITE_GEMINI_API_KEY=

# Optional hardening — leave blank to disable. Each feature no-ops when unset,
# so the app runs identically with or without these.
VITE_SENTRY_DSN=              # Sentry error monitoring (public-safe DSN)
VITE_RECAPTCHA_SITE_KEY=      # Firebase App Check reCAPTCHA v3 site key
```

All variables use the `VITE_` prefix so Vite exposes them to the client build.

The two optional keys are **public-safe**, unlike the Gemini secret: the Sentry
DSN can only send crash events, and the reCAPTCHA site key is designed to be
embedded in the page. When either is blank the corresponding feature stays
completely dormant (the code is only loaded when its key is present).

> ⚠️ **Security note:** any `VITE_`-prefixed value is embedded in the public JavaScript bundle and is therefore visible to anyone. The Firebase web API key is safe to expose (it is protected by Firestore security rules and authorized domains, not by secrecy). A **Gemini API key is a billable secret** — before shipping it in the client, restrict it in Google Cloud (limit to the Generative Language API, set a hard quota/budget cap, and add an HTTP-referrer restriction), or proxy the calls through a serverless function.

---

## Deployment

Learntopia is deployed to **Firebase Hosting** with automatic continuous deployment triggered on every push to `main`.

```bash
# Manual deploy (if needed)
firebase deploy --only hosting
```
---

## Contributing

This project is developed and maintained by **Tajamul Wani**

---

## License

All rights reserved. The content, code, and design of Learntopia are the intellectual property of the project owner. Unauthorised reproduction or redistribution is prohibited.
