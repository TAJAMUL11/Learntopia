import { useNavigate } from "react-router-dom";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Icon from "../Components/ui/Icon";
import SectionHeading from "../Components/ui/SectionHeading";

const FAQ = [
  {
    q: "Do I need an account to take quizzes?",
    a: "No — you can take any quiz as a guest. But you must be signed in for your scores to be saved to your profile.",
  },
  {
    q: "How do I enroll in a course?",
    a: "Navigate to the Courses tab, browse or search for a subject, and click the Enroll button. The course will instantly be added to your Student Dashboard.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Your profile, enrolled courses, and quiz attempts can be read and written only by you. This is enforced by strict database security rules.",
  },
  {
    q: "What does it cost?",
    a: "Learntopia is completely free to use. Create an account and start learning right away.",
  },
  {
    q: "How do I change my profile picture?",
    a: "Currently, your profile picture is linked directly to your Google account if you used 'Sign in with Google'. Native picture uploads are coming in a future update.",
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
          description="Everything you need to know about the platform, clearly and simply."
        />

        <div className="mt-8 grid gap-8">
          
          {/* What it is */}
          <Card className="p-6 md:p-8">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-ink-hi">
              <span className="text-violet-400"><Icon name="info" size={22} /></span>
              What this application is
            </h2>
            <p className="leading-relaxed text-ink-low">
              Learntopia is a modern, interactive e-learning platform designed to help you discover new subjects and test your knowledge. It serves as a unified digital classroom where your progress, courses, and quiz scores are securely managed in one place.
            </p>
          </Card>

          {/* What it does */}
          <Card className="p-6 md:p-8">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-ink-hi">
              <span className="text-sky"><Icon name="star" size={22} /></span>
              What it does
            </h2>
            <ul className="ml-5 list-disc space-y-2 leading-relaxed text-ink-low marker:text-white/20">
              <li>Provides a searchable catalog of beginner-friendly courses across six distinct subjects.</li>
              <li>Offers an interactive, timed Quiz Engine to test your skills with instant right/wrong feedback.</li>
              <li>Manages a secure, personalized Student Dashboard that tracks your enrolled courses and high scores.</li>
              <li>Keeps you globally signed in across all tabs using Google Authentication or secure email login.</li>
            </ul>
          </Card>

          {/* How to use it */}
          <Card className="p-6 md:p-8">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-ink-hi">
              <span className="text-violet-400"><Icon name="book" size={22} /></span>
              How to use it
            </h2>
            <div className="space-y-4 text-ink-low">
              <div className="flex gap-4">
                <div className="grid h-8 w-8 flex-none place-items-center rounded-lg border border-white/[0.08] bg-white/[0.05] font-bold text-ink-hi">1</div>
                <p className="mt-1"><strong className="text-ink-hi">Create an account:</strong> Click &quot;Sign up&quot; to create a secure account with your email or via Google.</p>
              </div>
              <div className="flex gap-4">
                <div className="grid h-8 w-8 flex-none place-items-center rounded-lg border border-white/[0.08] bg-white/[0.05] font-bold text-ink-hi">2</div>
                <p className="mt-1"><strong className="text-ink-hi">Enroll in courses:</strong> Visit the &quot;Courses&quot; tab, search for topics you like, and click &quot;Enroll&quot;.</p>
              </div>
              <div className="flex gap-4">
                <div className="grid h-8 w-8 flex-none place-items-center rounded-lg border border-white/[0.08] bg-white/[0.05] font-bold text-ink-hi">3</div>
                <p className="mt-1"><strong className="text-ink-hi">Take quizzes:</strong> Visit the &quot;Quiz&quot; tab and test yourself. Answer before the 15-second timer runs out!</p>
              </div>
              <div className="flex gap-4">
                <div className="grid h-8 w-8 flex-none place-items-center rounded-lg border border-white/[0.08] bg-white/[0.05] font-bold text-ink-hi">4</div>
                <p className="mt-1"><strong className="text-ink-hi">Track your progress:</strong> Click on your profile picture in the top right to visit your Dashboard and see your data.</p>
              </div>
            </div>
          </Card>

          {/* Why to use it */}
          <Card className="p-6 md:p-8">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-ink-hi">
              <span className="text-sky"><Icon name="shield" size={22} /></span>
              Why use it
            </h2>
            <p className="leading-relaxed text-ink-low">
              Unlike passive video tutorials, Learntopia forces active recall through timed assessments. Combined with a premium, distraction-free dark UI and strict database security that guarantees your data is isolated, it is the safest and most engaging way to build new skills online.
            </p>
          </Card>

        </div>

        {/* FAQ */}
        <h2 className="mt-12 text-xl font-bold text-ink-hi">Frequently asked questions</h2>
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
