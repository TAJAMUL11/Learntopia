# Learntopia

Learntopia is a premium, interactive e-learning platform designed to help users build their skills online. The application features user authentication, a variety of courses to enroll in, interactive timed skills testing, and a personalized student dashboard to track learning progress.

---

## ✨ Features
* **Modern Design System**: High-fidelity glassmorphic panels (`backdrop-blur bg-white/5 border border-white/10`) with deep midnight purple gradients.
* **Responsive Layout Grid**: Constrained to a standard `1280px` layout boundary to keep margins and paddings uniform across screens.
* **Interactive Quiz Engine**: Multi-topic timed quiz self-assessments (15s limits, progress bars, firestore tracking).
* **Robust Authentication & Security**: Secure Firebase Authentication (including Google One-Tap Login) and global user session states, protected by strict, per-user Firestore security rules.
* **SEO, GEO, and AEO Optimized**: Configured with Canonical links, Open Graph cards, Geographical region properties, and JSON-LD graph schema markups for Answer Engine Optimization.
* **Global Footer**: A unified footer persistent across all routing pages.

---

## 🚀 Technologies Used
* **Frontend Core**: React (Vite)
* **Styling**: Vanilla CSS + Tailwind CSS
* **Animations**: GSAP (GreenSock Animation Platform) & `@gsap/react`
* **Routing**: React Router DOM (v7)
* **Backend & Database**: Firebase (Authentication & Firestore)
* **Task & Project Management**: Linear.app
* **Notifications**: React Toastify

---

## 🛠️ Getting Started

### Prerequisites
Ensure you have Node.js and npm installed on your system.

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd Learntopia
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   * Copy the template file:
     ```bash
     cp .env.example .env
     ```
   * Fill in your Firebase config keys inside the new `.env` file.

### Scripts
* **Start Development Server**: Runs the app locally at `http://localhost:5173`.
   ```bash
   npm run dev
   ```
* **Build Production Bundle**: Compiles assets for deployment.
   ```bash
   npm run build
   ```
* **Linting**: Performs ESLint checks.
   ```bash
   npm run lint
   ```

---

## 👨‍💻 Author
Built by **Tajamul Wani** (Email: [thetj4054@gmail.com](mailto:thetj4054@gmail.com)) in collaboration with **Antigravity AI**.
