import { useNavigate } from "react-router-dom";
import Button from "../Components/ui/Button";
import Card from "../Components/ui/Card";
import Badge from "../Components/ui/Badge";
import Icon from "../Components/ui/Icon";
import StatsSection from "../Components/StatsSection";

import solution from "../assets/Icons/solution.png";
import atoms from "../assets/Icons/atoms.png";
import circles from "../assets/Icons/circles.png";
import arts from "../assets/Icons/arts.png";
import star from "../assets/CourseImg/star.png";
import one from "../assets/Icons/one.jpg";
import two from "../assets/Icons/two.jpg";
import three from "../assets/Icons/three.jpg";
import four from "../assets/Icons/four.jpg";

const FEATURE_ICONS = [solution, atoms, circles, arts];
const AVATARS = [one, two, three, four];

const VALUE_PROPS = [
  {
    icon: "book",
    title: "Interactive courses",
    text: "Learn practical, industry-relevant skills through focused, beginner-friendly course tracks.",
  },
  {
    icon: "clock",
    title: "Timed quiz challenges",
    text: "Test yourself against the clock with instant feedback and clear, honest scoring.",
  },
  {
    icon: "trophy",
    title: "Track your progress",
    text: "Sign in to save every attempt and watch your personal high scores climb over time.",
  },
];

const SUBJECTS = [
  { label: "Science", variant: "solid" },
  { label: "Technology", variant: "sky" },
  { label: "Marketing", variant: "default" },
  { label: "Arts", variant: "default" },
  { label: "Finance", variant: "success" },
  { label: "Languages", variant: "default" },
  { label: "Media", variant: "default" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container-page py-16 md:py-24">
      {/* HERO */}
      <section className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="animate-fade-up">
          <Badge variant="sky">Interactive e-learning platform</Badge>
        </div>

        <h1
          className="mt-6 animate-fade-up text-balance text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="text-ink-hi">Build your </span>
          <span className="text-gradient">skills</span>
          <span className="text-ink-hi"> online</span>
        </h1>

        {/* Feature icon chips */}
        <div className="mt-8 flex animate-fade-up items-center justify-center gap-3.5" style={{ animationDelay: "0.1s" }}>
          {FEATURE_ICONS.map((src, i) => (
            <div
              key={i}
              className="glass-2 grid h-14 w-14 place-items-center rounded-2xl p-3 transition-transform duration-300 hover:scale-105 md:h-16 md:w-16"
            >
              <img src={src} alt="" className="h-full w-full object-contain" />
            </div>
          ))}
        </div>

        <p
          className="mt-8 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink md:text-xl"
          style={{ animationDelay: "0.15s" }}
        >
          Learn and sharpen your skills with interactive courses and real-time skill tests, built for
          people serious about growing into future professionals.
        </p>

        <div
          className="mt-10 flex animate-fade-up flex-col items-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.2s" }}
        >
          <Button size="lg" onClick={() => navigate("/courses")}>
            Explore courses
            <Icon name="arrow" size={18} />
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate("/quiz")}>
            Take a quiz
          </Button>
        </div>

        {/* Trust row */}
        <div
          className="mt-12 flex animate-fade-up flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="flex -space-x-3">
            {AVATARS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-10 w-10 rounded-full border-2 border-ground-800 object-cover"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-ink">
            <span className="flex items-center gap-1 font-bold text-ink-hi">
              <img src={star} alt="" className="h-4 w-4" /> 4.8
            </span>
            <span className="text-ink-low">·</span>
            <span>Loved by 2,000+ learners</span>
          </div>
        </div>
      </section>

      {/* ANIMATED METRICS + CHART (GSAP) */}
      <StatsSection />

      {/* VALUE PROPS */}
      <section className="mt-24 md:mt-32">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUE_PROPS.map((v) => (
            <Card key={v.title} className="p-7" hoverable>
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-violet-400">
                <Icon name={v.icon} size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink-hi">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-low">{v.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* SUBJECTS + QUOTE */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col justify-center p-8">
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink">Subject fields</h4>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {SUBJECTS.map((s) => (
              <Badge key={s.label} variant={s.variant} className="px-4 py-2 text-sm">
                {s.label}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col justify-center p-8">
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink">Why keep learning</h4>
          <blockquote className="mt-5 text-lg font-medium italic leading-relaxed text-ink-hi md:text-xl">
            “Continuous learning is the minimum requirement for success in any field.”
          </blockquote>
          <p className="mt-4 text-sm font-bold tracking-wide text-sky">— Brian Tracy</p>
        </Card>
      </section>
    </div>
  );
};

export default Home;
