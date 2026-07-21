import { useNavigate } from "react-router-dom";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Icon from "../Components/ui/Icon";
import SectionHeading from "../Components/ui/SectionHeading";

const FEATURES = [
  {
    icon: "book",
    title: "Interactive courses",
    text: "Enroll in kid-friendly course tracks. Each module has a short reading followed by a quick exercise to check what you learned.",
  },
  {
    icon: "trophy",
    title: "Real progress tracking",
    text: "Complete modules one at a time to fill your progress bar. A course can only be marked complete once you reach 100%.",
  },
  {
    icon: "clock",
    title: "Timed quizzes",
    text: "Test yourself against a 15-second-per-question timer with instant right/wrong feedback and saved high scores.",
  },
  {
    icon: "user",
    title: "Your dashboard",
    text: "See enrolled and completed courses, per-course progress, and quiz high scores — all in one place.",
  },
  {
    icon: "shield",
    title: "Private & secure",
    text: "Your profile, progress, and scores can be read and written only by you, enforced by database security rules.",
  },
  {
    icon: "search",
    title: "Searchable catalog",
    text: "Find courses fast by title or subject, with a friendly empty state when nothing matches your search.",
  },
];

const STEPS = [
  { title: "Create an account", text: "Sign up with your email or with Google to save your progress." },
  { title: "Enroll in a course", text: "Browse or search the catalog and click Enroll to open the course." },
  { title: "Read & answer", text: "Read each module, then answer its quick check to unlock the next one." },
  { title: "Finish & track", text: "Complete all modules to mark the course done and see it on your dashboard." },
];

const COMPLETION_FLOW = [
  { icon: "book", label: "Read the module" },
  { icon: "check-circle", label: "Answer the check" },
  { icon: "lock", label: "Unlock the next" },
  { icon: "trophy", label: "Complete at 100%" },
];

const FAQ = [
  {
    q: "How does completing a course work?",
    a: "Each course is made of modules. You read a short lesson, then answer one quick question correctly to complete that module and unlock the next. Once every module is done, the course reaches 100% and you can mark it complete — you can't mark it complete before then.",
  },
  {
    q: "Do I need an account to take quizzes?",
    a: "No — you can take any quiz as a guest. But you must be signed in for your scores and course progress to be saved to your profile.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Your profile, enrolled courses, progress, and quiz attempts can be read and written only by you. This is enforced by strict database security rules.",
  },
  {
    q: "What does it cost?",
    a: "Learntopia is completely free to use. Create an account and start learning right away.",
  },
];

const Doc = () => {
  const navigate = useNavigate();

  return (
    <div className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          centered
          eyebrow="Documentation"
          title="Using Learntopia"
          description="Everything the platform offers and how to use it — clear, simple, and to the point."
        />

        {/* What it is */}
        <Card className="mx-auto mt-10 max-w-3xl p-6 text-center md:p-8">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-violet-400">
            <Icon name="info" size={24} />
          </div>
          <h2 className="text-xl font-bold text-ink-hi">What Learntopia is</h2>
          <p className="mx-auto mt-2 max-w-2xl leading-relaxed text-ink-low">
            An interactive e-learning platform where kids and teens explore fun courses, complete
            hands-on modules, and test their knowledge — with progress, courses, and scores kept
            safely in one place.
          </p>
        </Card>

        {/* Feature grid */}
        <h2 className="mt-14 text-center text-2xl font-bold text-ink-hi">What you can do</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="flex h-full flex-col p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-violet-400">
                <Icon name={f.icon} size={22} />
              </div>
              <h3 className="text-base font-bold text-ink-hi">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-low">{f.text}</p>
            </Card>
          ))}
        </div>

        {/* How completion works — highlighted */}
        <Card className="mt-14 border-violet-500/25 bg-gradient-to-br from-violet-500/[0.06] to-transparent p-6 md:p-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">How completion works</p>
            <h2 className="mt-2 text-2xl font-bold text-ink-hi">You finish by doing, not skipping</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-ink-low">
              Progress is earned module by module. A course only counts as complete once every module is done.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {COMPLETION_FLOW.map((step, i) => (
              <div key={step.label} className="relative flex flex-col items-center rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 text-center">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-violet-500/20 text-violet-300">
                  <Icon name={step.icon} size={18} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-low">Step {i + 1}</span>
                <span className="mt-1 text-sm font-semibold text-ink-hi">{step.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Getting started steps */}
        <h2 className="mt-14 text-center text-2xl font-bold text-ink-hi">Getting started</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {STEPS.map((step, i) => (
            <Card key={step.title} className="flex items-start gap-4 p-6">
              <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-sky text-sm font-extrabold text-white">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-ink-hi">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-low">{step.text}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="mt-14 text-center text-2xl font-bold text-ink-hi">Frequently asked</h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-3">
          {FAQ.map((item) => (
            <Card key={item.q} className="p-5 md:p-6">
              <h3 className="flex items-start gap-2.5 font-semibold text-ink-hi">
                <span className="mt-0.5 flex-none text-sky"><Icon name="info" size={18} /></span>
                {item.q}
              </h3>
              <p className="mt-2 pl-[30px] text-sm leading-relaxed text-ink">{item.a}</p>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center sm:flex-row sm:text-left md:p-8">
          <div>
            <h4 className="text-lg font-bold text-ink-hi">Ready to start learning?</h4>
            <p className="mt-1 text-sm text-ink-low">Browse the catalog or create your free account.</p>
          </div>
          <div className="flex flex-none gap-3">
            <Button variant="secondary" onClick={() => navigate("/courses")}>Browse courses</Button>
            <Button onClick={() => navigate("/signUp")}>Create account</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doc;
