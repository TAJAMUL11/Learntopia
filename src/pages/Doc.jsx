import { Link } from "react-router-dom";
import Icon from "../Components/ui/Icon";

const LAST_UPDATED = "July 24, 2026";

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "getting-started", label: "Getting Started" },
  { id: "courses", label: "Courses & Modules" },
  { id: "quizzes", label: "Quizzes" },
  { id: "dashboard", label: "Dashboard" },
  { id: "account", label: "Account & Security" },
  { id: "faq", label: "FAQ" },
];

const Doc = () => {

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navbarHeight = 72; // height of sticky navbar in px
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Page header */}
        <div className="border-b border-white/[0.08] pb-8 mb-10">
          <span className="inline-block rounded-md border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">Documentation</span>
          <h1 className="text-4xl font-bold tracking-tight text-ink-hi">Learntopia Documentation</h1>
          <p className="mt-3 max-w-2xl text-ink-low leading-relaxed">
            Complete reference for the Learntopia platform — features, workflows, and answers to common questions.
          </p>
          <p className="mt-2 text-xs text-ink-low/60">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="flex gap-12">

          {/* Left sidebar nav */}
          <aside className="hidden w-56 flex-none xl:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-ink-low/50">On this page</p>
              <nav className="space-y-0.5">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="block w-full rounded-md px-3 py-2 text-left text-sm text-ink-low transition-colors hover:bg-white/[0.04] hover:text-ink-hi"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1 space-y-14">

            {/* Overview */}
            <section id="overview">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">Overview</h2>
              <p className="text-ink-low leading-relaxed">
                Learntopia is an interactive e-learning platform built for children and teenagers. It provides structured course tracks, timed knowledge quizzes, and a personal dashboard to track learning progress — all backed by a secure, private cloud database.
              </p>
              <p className="mt-4 text-ink-low leading-relaxed">
                The platform is entirely free to use. You can explore courses and take quizzes as a guest, or create an account to save progress, earn points, and appear on the leaderboard.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "book", title: "Structured Courses", text: "Topic-specific learning tracks with module-by-module progression." },
                  { icon: "clock", title: "Timed Quizzes", text: "15-second per-question quizzes with instant right/wrong feedback." },
                  { icon: "bar-chart", title: "Progress Tracking", text: "Personal dashboard, streaks, points, and a global leaderboard." },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                      <Icon name={item.icon} size={18} />
                    </div>
                    <p className="font-semibold text-ink-hi text-sm">{item.title}</p>
                    <p className="mt-1 text-xs text-ink-low leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section id="features">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">Features</h2>
              <div className="space-y-4">
                {[
                  { title: "Interactive Courses", text: "Enroll in kid-friendly course tracks. Each module contains a short reading and a comprehension question. You must answer correctly to unlock the next module — progress cannot be faked." },
                  { title: "Dynamic Timed Quizzes", text: "Test your knowledge with a 15-second countdown per question. Questions are drawn from a large pool and randomized on every attempt. Instant feedback is shown after each answer." },
                  { title: "Personal Dashboard", text: "View your enrolled and completed courses, per-course progress bars, quiz high scores, total points earned, and your current daily streak — all consolidated in one place." },
                  { title: "Daily Login Streaks", text: "Your streak increments each calendar day you log in. If you miss a day, the streak resets. Streaks are calculated in your local timezone and displayed in the dashboard header and metrics grid." },
                  { title: "Global & Per-Quiz Leaderboards", text: "The Global Leaderboard ranks all users by total points. Per-quiz leaderboards show top scores for each individual quiz. Leaderboard data is publicly readable for authenticated users but is separate from your private profile." },
                  { title: "Quiz Completion Indicators", text: "Completed quiz cards display a green Done badge and your best score. The Start button becomes a Retake button. Abandoning a quiz mid-way does not count as an attempt — scores are logged only on the results screen." },
                  { title: "Guest Quiz Score Preservation", text: "Take a quiz as a guest and finish it, then use the Log In or Sign Up link on the results screen. Your score is automatically saved to your profile on authentication without any data loss." },
                  { title: "AI Tutors", text: "Each course is accompanied by a specialized AI tutor with a distinct persona designed to guide learners through the subject matter." },
                  { title: "Strict Focus Mode", text: "A custom route blocker detects navigation attempts during active quizzes or module challenges and presents a confirmation dialog to prevent accidental progress loss." },
                  { title: "Course Controls", text: "Unenroll from courses directly from your dashboard. Reset a 100%-completed course to start fresh. Resume in-progress courses exactly where you left off." },
                  { title: "Searchable Catalog", text: "Filter courses by title or subject using the live search field. An informative empty state is shown when no results match the query." },
                  { title: "Private & Secure", text: "All user data — profile, courses, progress, quiz attempts — is protected by strict Firestore security rules. Only you can read or write your own data. Leaderboard data exposes only name and score, never contact details." },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4 py-4 border-b border-white/[0.05] last:border-0">
                    <div className="mt-0.5 flex-none">
                      <div className="h-2 w-2 rounded-full bg-violet-500 mt-1.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink-hi">{f.title}</p>
                      <p className="mt-1 text-sm text-ink-low leading-relaxed">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Getting started */}
            <section id="getting-started">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">Getting Started</h2>
              <ol className="space-y-5">
                {[
                  { step: "01", title: "Create an account", text: "Click Sign Up in the navigation bar. Register with your email and a password, or continue with Google for a one-click setup. Email/password accounts require a display name." },
                  { step: "02", title: "Browse the course catalog", text: "Navigate to Courses to see all available learning tracks. Use the search bar to filter by subject or title. Click on any course card to view the full syllabus and module list." },
                  { step: "03", title: "Enroll and start learning", text: "Click Enroll on the course detail page. Modules unlock sequentially — read each lesson, then answer the comprehension question correctly to unlock the next module." },
                  { step: "04", title: "Take quizzes", text: "Visit the Quiz Center to test your knowledge. Select a topic, answer all questions within the time limit, and view your score on the results screen. Completed quizzes display a Done badge on the selection card." },
                  { step: "05", title: "Track your progress", text: "Open your Dashboard to see enrolled courses, completion percentages, quiz high scores, total points, and your current streak. Check the Leaderboard to compare your score with others." },
                ].map((item) => (
                  <li key={item.step} className="flex gap-5">
                    <span className="flex-none font-mono text-sm font-bold text-violet-400/70 pt-0.5">{item.step}</span>
                    <div className="border-l border-white/[0.06] pl-5">
                      <p className="font-semibold text-ink-hi">{item.title}</p>
                      <p className="mt-1.5 text-sm text-ink-low leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Courses & Modules */}
            <section id="courses">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">Courses &amp; Modules</h2>
              <p className="text-ink-low leading-relaxed">Each course is divided into a series of modules. Modules must be completed in order — there is no way to skip ahead.</p>

              <div className="mt-6 rounded-xl border border-white/[0.07] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                      <th className="px-5 py-3.5 text-left font-semibold text-ink-hi">Concept</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-ink-hi">Behaviour</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {[
                      { concept: "Module completion", behaviour: "Answer the module's comprehension question correctly. Incorrect answers can be retried immediately." },
                      { concept: "Course completion", behaviour: "All modules must be completed. The course is marked Done and moves to your Completed Courses list." },
                      { concept: "Progress bar", behaviour: "Reflects the percentage of modules completed. Updates in real time as you finish modules." },
                      { concept: "Course reset", behaviour: "Available for 100%-complete courses via the Start Again button in the course detail view. Resets all module progress." },
                      { concept: "Unenrollment", behaviour: "Use the trash icon on the dashboard. Removes the course and all associated progress from your profile." },
                      { concept: "Focus protection", behaviour: "Navigating away mid-module triggers a blocking dialog. Confirming exit does not save partial module attempts." },
                    ].map((row) => (
                      <tr key={row.concept}>
                        <td className="px-5 py-3.5 font-medium text-ink-hi whitespace-nowrap">{row.concept}</td>
                        <td className="px-5 py-3.5 text-ink-low">{row.behaviour}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Quizzes */}
            <section id="quizzes">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">Quizzes</h2>
              <p className="text-ink-low leading-relaxed">
                Quizzes are topic-specific assessments available to all users, including guests. Each quiz presents a set of randomized multiple-choice questions with a 15-second countdown per question.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { label: "Timer", value: "15 seconds per question. The timer resets on each new question." },
                  { label: "Question pool", value: "Questions are randomized from a large pool on every attempt, so retaking a quiz gives a fresh experience." },
                  { label: "Feedback", value: "After submitting an answer, the correct answer is revealed immediately before moving to the next question." },
                  { label: "Score logging", value: "Scores are saved only when you complete all questions and reach the results screen. Exiting early logs nothing." },
                  { label: "Points", value: "Each correct answer earns 10 points added to your cumulative total." },
                  { label: "Leaderboard sync", value: "Your score is synced to the per-quiz leaderboard and your total points are updated in the global leaderboard." },
                  { label: "Guest attempts", value: "Guests can take any quiz. On the results screen, links allow login or signup with automatic score transfer." },
                  { label: "Retake", value: "Completed quizzes show a Retake button. High scores are tracked — only your best score per quiz is displayed." },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 rounded-lg border border-white/[0.05] bg-white/[0.015] px-5 py-3.5">
                    <span className="w-36 flex-none text-xs font-semibold uppercase tracking-wider text-ink-low/60 pt-0.5">{item.label}</span>
                    <span className="text-sm text-ink-low leading-relaxed">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Dashboard */}
            <section id="dashboard">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">Dashboard</h2>
              <p className="text-ink-low leading-relaxed">The personal dashboard is available to authenticated users only. It consolidates all your learning activity into one view.</p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Profile header — displays your display name, avatar initial, total points, and current daily streak.",
                  "Metrics grid — shows total points, quiz attempts, courses enrolled, and streak in numeric cards.",
                  "Active courses — lists in-progress courses with a live progress bar and a Continue button.",
                  "Completed courses — lists all fully completed courses.",
                  "Quiz high scores — shows your best score per quiz across all attempts.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-low">
                    <Icon name="arrow-right" size={14} className="mt-1 flex-none text-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Account & Security */}
            <section id="account">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">Account &amp; Security</h2>
              <p className="text-ink-low leading-relaxed">
                Learntopia uses Firebase Authentication. Accounts can be created with an email/password or via Google OAuth. All user data stored in Firestore is protected by server-side security rules — not just client-side checks.
              </p>
              <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
                <p className="text-sm font-semibold text-amber-300 mb-1.5">Data isolation guarantee</p>
                <p className="text-sm text-ink-low leading-relaxed">
                  Every Firestore read and write is validated server-side. Your profile, enrolled courses, module progress, and quiz attempts are accessible only to your authenticated session. Leaderboard entries expose only your display name and score — never your email or any personal identifiers.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">FAQ</h2>
              <dl className="space-y-6">
                {[
                  { q: "Do I need an account to use Learntopia?", a: "No. Courses and quizzes can be browsed without an account. However, progress, scores, and streaks are only saved for authenticated users. Guest quiz scores can be retroactively saved by logging in from the results screen." },
                  { q: "How does the streak counter work?", a: "Your streak increments by one each calendar day you log in (calculated in your local timezone). Logging in multiple times on the same day counts as one day. Missing a day resets the streak to 1." },
                  { q: "Why did my quiz score not appear on the leaderboard?", a: "Scores are only logged when you complete all questions and reach the results screen. Quitting mid-quiz does not save any data. If you are logged in and complete a quiz, the score should appear on the leaderboard within seconds." },
                  { q: "What happens if I quit a quiz halfway?", a: "Nothing is saved. There is no partial credit. The quiz card will not show a Done badge. You can restart the quiz from scratch at any time." },
                  { q: "How does course completion work?", a: "You must complete every module in sequence. Each module requires a correct answer to the comprehension question before the next one unlocks. The course is marked complete only when every module is done." },
                  { q: "Can I reset a completed course?", a: "Yes. Open the course detail page for a 100%-complete course. A Start Again button will appear, allowing you to reset all module progress and begin from the first module." },
                  { q: "Is the platform free?", a: "Yes, completely free. No subscription, no paywalled courses, no advertising." },
                  { q: "Who can see my leaderboard score?", a: "Any authenticated Learntopia user can see the Global Leaderboard. It shows your display name and total points only. Your email, course progress, and quiz history are never visible to other users." },
                ].map((item) => (
                  <div key={item.q} className="border-b border-white/[0.05] pb-6 last:border-0 last:pb-0">
                    <dt className="font-semibold text-ink-hi">{item.q}</dt>
                    <dd className="mt-2 text-sm text-ink-low leading-relaxed">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Footer note */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-6">
              <p className="font-semibold text-ink-hi text-sm">Something missing or unclear?</p>
              <p className="text-xs text-ink-low mt-1">Reach out via the <Link to="/contact" className="text-violet-400 hover:underline">Contact page</Link> or review our <Link to="/terms" className="text-violet-400 hover:underline">Terms</Link> and <Link to="/privacy" className="text-violet-400 hover:underline">Privacy Policy</Link>.</p>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Doc;
