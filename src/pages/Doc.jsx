import { useNavigate } from "react-router-dom";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Badge from "../Components/ui/Badge";
import Icon from "../Components/ui/Icon";
import SectionHeading from "../Components/ui/SectionHeading";

// Getting-started is a genuine ordered sequence, so numbering is meaningful here.
const STEPS = [
  { title: "Create your account", text: "Sign up with your email so your progress can be saved to your profile." },
  { title: "Explore the courses", text: "Browse the catalog and use search to find a subject you want to learn." },
  { title: "Test your skills", text: "Take a timed quiz and get instant feedback on every answer." },
  { title: "Track your progress", text: "See your best scores and manage your account from the dashboard." },
];

const FEATURES = [
  {
    icon: "book",
    title: "Courses & search",
    tag: "Learn",
    what: "A catalog of beginner-friendly course tracks across six subjects, each showing its rating and how many learners are enrolled.",
    how: "Open the Courses tab, type in the search box to filter by course or subject, then click Enroll to get started.",
  },
  {
    icon: "clock",
    title: "Quiz engine",
    tag: "Practice",
    what: "Multi-topic, timed self-assessments — 15 seconds per question, instant right/wrong feedback, and a final score out of the total questions.",
    how: "Open the Quiz tab, pick a topic, and answer each question before the timer runs out. Review your result at the end.",
  },
  {
    icon: "user",
    title: "Accounts & sign-in",
    tag: "Account",
    what: "Secure email sign-up and login with session persistence, so you stay signed in between visits.",
    how: "Use Sign up to create an account, or Log in if you already have one. Your password is never stored by the app.",
  },
  {
    icon: "trophy",
    title: "Progress & high scores",
    tag: "Account",
    what: "When you're signed in, every quiz attempt is saved privately to your profile and your best score appears on each quiz.",
    how: "Log in before taking a quiz so your scores are recorded. Your best result then shows on the quiz card.",
  },
  {
    icon: "book",
    title: "Student dashboard",
    tag: "Account",
    what: "A personal space showing your name and email, with a quick way to log out.",
    how: "After logging in, open the dashboard to review your profile details.",
  },
  {
    icon: "mail",
    title: "Support",
    tag: "Help",
    what: "A direct line to the team for questions, feedback, or anything that isn't working.",
    how: "Use the Contact tab to send a message — we usually reply within 1–2 business days.",
  },
  {
    icon: "shield",
    title: "Security & design",
    tag: "Platform",
    what: "A premium dark UI design system with fully locked-down Firestore security rules protecting all user data.",
    how: "Browse the app to experience the sleek design, knowing your data is securely isolated.",
  },
];

const FAQ = [
  {
    q: "Do I need an account to take quizzes?",
    a: "No — you can take any quiz as a guest. But you must be signed in for your scores to be saved to your profile.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Your profile and quiz attempts can be read and written only by you — enforced by database security rules.",
  },
  {
    q: "What does it cost?",
    a: "Learntopia is free to use. Create an account and start learning right away.",
  },
];

const Doc = () => {
  const navigate = useNavigate();

  return (
    <div className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Documentation"
          title="Using Learntopia"
          description="Learntopia is an interactive e-learning platform for building skills online. This guide explains what the platform offers and how to use each feature."
        />

        {/* Getting started */}
        <Card className="mt-8 p-6 md:p-8">
          <h2 className="text-lg font-bold text-ink-hi">Getting started</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <div className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-white/[0.08] bg-white/[0.05] text-sm font-bold text-violet-400">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-ink-hi">{step.title}</h3>
                  <p className="mt-0.5 text-sm text-ink-low">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Feature guide */}
        <h2 className="mt-12 text-xl font-bold text-ink-hi">Feature guide</h2>
        <p className="mt-1.5 text-sm text-ink-low">What each part of the app does, and how to use it.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {FEATURES.map((f) => (
            <Card key={f.title} className="p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-violet-400">
                  <Icon name={f.icon} size={20} />
                </div>
                <h3 className="text-base font-bold text-ink-hi">{f.title}</h3>
                <Badge variant="sky" className="ml-auto">{f.tag}</Badge>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-low">What it does</dt>
                  <dd className="mt-1 leading-relaxed text-ink">{f.what}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-low">How to use it</dt>
                  <dd className="mt-1 leading-relaxed text-ink">{f.how}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="mt-12 text-xl font-bold text-ink-hi">Frequently asked</h2>
        <div className="mt-5 space-y-3">
          {FAQ.map((item) => (
            <Card key={item.q} className="p-5">
              <h3 className="flex items-start gap-2 font-semibold text-ink-hi">
                <span className="mt-0.5 text-sky"><Icon name="info" size={17} /></span>
                {item.q}
              </h3>
              <p className="mt-2 pl-6 text-sm leading-relaxed text-ink">{item.a}</p>
            </Card>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-6 sm:flex-row">
          <p className="text-sm text-ink-low">Ready to start learning?</p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate("/courses")}>Browse courses</Button>
            <Button onClick={() => navigate("/signUp")}>Create account</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doc;
