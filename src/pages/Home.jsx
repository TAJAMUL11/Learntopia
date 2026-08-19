import { useNavigate } from "react-router-dom";
import Button from "../Components/ui/Button";
import Badge from "../Components/ui/Badge";
import Icon from "../Components/ui/Icon";
import StatsSection from "../Components/StatsSection";
import { useLanguage } from "../context/LanguageContext";

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
    to: "/courses",
  },
  {
    icon: "clock",
    title: "Timed quiz challenges",
    text: "Test yourself against the clock with instant feedback and clear, honest scoring.",
    to: "/quiz",
  },
  {
    icon: "trophy",
    title: "Track your progress",
    text: "Sign in to save every attempt and watch your personal high scores climb over time.",
    to: "/dashboard",
  },
];

const SUBJECTS = [
  { label: "Science", emoji: "⚗️" },
  { label: "Technology", emoji: "💻" },
  { label: "Marketing", emoji: "📈" },
  { label: "Arts", emoji: "🎨" },
  { label: "Finance", emoji: "💰" },
  { label: "Languages", emoji: "🌐" },
  { label: "Media", emoji: "🎬" },
];

const ICON_GRADIENTS = [
  "from-violet-500/30 to-violet-600/20 border-violet-500/20",
  "from-sky-500/30 to-sky/20 border-sky-500/20",
  "from-amber-500/30 to-orange-600/20 border-amber-500/20",
];

const ICON_COLORS = ["text-violet-400", "text-sky-400", "text-amber-400"];
const GLOW_COLORS = ["via-violet-500/60", "via-sky-500/60", "via-amber-500/60"];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="container-page py-16 md:py-24">

      {/* ── HERO ── */}
      <section className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="animate-fade-up">
          <Badge variant="sky" className="text-[0.7rem] tracking-[0.08em]">{t("hero.badge")}</Badge>
        </div>

        <h1
          className="mt-6 animate-fade-up text-balance text-[2.5rem] font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="text-ink-hi">{t("hero.titleStart")} </span>
          <span className="text-gradient">{t("hero.titleAccent")}</span>
          <span className="text-ink-hi"> {t("hero.titleEnd")}</span>
        </h1>

        {/* Feature icon chips */}
        <div
          className="mt-8 flex animate-fade-up items-center justify-center gap-3.5"
          style={{ animationDelay: "0.1s" }}
        >
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
          className="mt-6 max-w-xl animate-fade-up text-pretty text-sm leading-relaxed text-ink sm:mt-8 sm:text-base md:text-lg"
          style={{ animationDelay: "0.15s" }}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTA buttons */}
        <div
          className="mt-10 flex w-full animate-fade-up flex-col items-center gap-3 sm:w-auto sm:flex-row"
          style={{ animationDelay: "0.2s" }}
        >
          <Button size="lg" onClick={() => navigate("/courses")} className="w-full sm:w-auto">
            {t("hero.exploreCourses")}
            <Icon name="arrow" size={18} />
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate("/quiz")} className="w-full sm:w-auto">
            {t("hero.takeQuiz")}
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
            <span>{t("home.lovedBy")}</span>
          </div>
        </div>
      </section>

      {/* ── ANIMATED METRICS + CHART ── */}
      <StatsSection />

      {/* ── VALUE PROPS ── */}
      <section className="mt-24 md:mt-32">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-low">{t("home.whyEyebrow")}</p>
          <h2 className="mt-2 text-2xl font-bold text-ink-hi sm:text-3xl">{t("home.whyTitle")}</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {VALUE_PROPS.map((v, i) => {
            const propKey = i === 0 ? "val1" : i === 1 ? "val2" : "val3";
            return (
              <div
                key={v.to}
                onClick={() => navigate(v.to)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.13] hover:shadow-[0_0_40px_-8px_rgba(139,99,227,0.25)]"
              >
                {/* Top glow line on hover */}
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${GLOW_COLORS[i]} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Number accent */}
                <span className="absolute right-6 top-5 select-none text-5xl font-black leading-none text-white/[0.04]">
                  0{i + 1}
                </span>

                {/* Icon */}
                <div className={`grid h-12 w-12 place-items-center rounded-xl border bg-gradient-to-br ${ICON_GRADIENTS[i]} ${ICON_COLORS[i]} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon name={v.icon} size={22} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-ink-hi">{t(`home.${propKey}Title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-low">{t(`home.${propKey}Text`)}</p>

                {/* Bottom CTA hint */}
                <div className={`mt-5 flex items-center gap-1.5 text-xs font-semibold ${ICON_COLORS[i]} opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100`}>
                  {t("home.learnMore")} <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SUBJECTS + QUOTE ── */}
      <section className="mt-6 grid gap-5 lg:grid-cols-2">

        {/* Subject fields card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-md">
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-low">{t("home.subjectEyebrow")}</p>
          <h3 className="mt-1.5 text-lg font-bold text-ink-hi">{t("home.subjectTitle")}</h3>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {SUBJECTS.map((s, i) => {
              const subKeys = ["Science", "Tech", "Marketing", "Arts", "Finance", "Languages", "Media"];
              return (
                <button
                  key={s.label}
                  onClick={() => navigate("/courses")}
                  className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-ink transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-ink-hi"
                >
                  <span>{s.emoji}</span>
                  {t(`home.subject${subKeys[i]}`)}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => navigate("/courses")}
            className="mt-6 flex items-center gap-2 text-sm font-semibold text-violet-400 transition-all duration-200 hover:gap-3 hover:text-violet-300"
          >
            {t("home.browseAll")} <span>→</span>
          </button>
        </div>

        {/* Quote card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-md">
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />

          {/* Decorative large quote mark */}
          <span className="pointer-events-none absolute right-7 top-4 select-none text-[7rem] font-black leading-none text-white/[0.04]">&ldquo;</span>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-low">{t("home.quoteEyebrow")}</p>

          <blockquote className="relative mt-5 text-xl font-semibold italic leading-relaxed text-ink-hi sm:text-2xl">
            &ldquo;{t("home.quoteText")}&rdquo;
          </blockquote>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-violet-500/30 to-transparent" />
            <p className="bg-gradient-to-r from-violet-400 to-sky bg-clip-text text-sm font-bold tracking-wide text-transparent">
              — {t("home.quoteAuthor")}
            </p>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-low">
            {t("home.quoteSubtext")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
