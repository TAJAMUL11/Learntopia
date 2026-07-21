import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Card from "./ui/Card";
import Icon from "./ui/Icon";
import SectionHeading from "./ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Active learners", value: 2000, suffix: "+", icon: "user" },
  { label: "Expert courses", value: 6, icon: "book" },
  { label: "Quiz tracks", value: 3, icon: "clock" },
  { label: "Average rating", value: 4.8, decimals: 1, icon: "trophy" },
];

// Enrollments by subject — drives the animated bar chart.
const BARS = [
  { label: "Frontend", value: 540 },
  { label: "Finance", value: 480 },
  { label: "Python", value: 320 },
  { label: "Arts", value: 260 },
  { label: "Maths", value: 210 },
  { label: "Marketing", value: 190 },
];
// Round the axis ceiling up to a clean number so bars sit under a sensible max.
const MAX = 600;

const format = (n, decimals = 0) =>
  decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-US");

const StatsSection = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);
  const barRefs = useRef([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Count-up number tiles
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = STATS[i];
        if (reduced) {
          el.textContent = `${format(stat.value, stat.decimals)}${stat.suffix || ""}`;
          return;
        }
        const counter = { v: 0 };
        gsap.to(counter, {
          v: stat.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
          onUpdate: () => {
            el.textContent = `${format(counter.v, stat.decimals)}${stat.suffix || ""}`;
          },
        });
      });

      // Horizontal bars grow from the left
      if (reduced) {
        gsap.set(barRefs.current, { scaleX: 1 });
      } else {
        gsap.from(barRefs.current, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="mt-24 md:mt-32">
      <SectionHeading
        centered
        eyebrow="By the numbers"
        title="Learning that adds up"
        description="A growing community, real course depth, and progress you can measure — here's the platform at a glance."
      />

      {/* Metric tiles */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Card key={stat.label} className="p-6 text-center">
            <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-violet-400">
              <Icon name={stat.icon} size={20} />
            </div>
            <div
              ref={(el) => { numberRefs.current[i] = el; }}
              className="text-3xl font-extrabold tracking-tight text-ink-hi tabular-nums md:text-4xl"
            >
              0
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-ink-low">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Horizontal bar chart — no overflow on any width */}
      <Card className="mt-6 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-ink-hi sm:text-lg">Enrollments by subject</h3>
            <p className="mt-1 text-sm text-ink-low">Where our learners are focusing right now.</p>
          </div>
          <span className="flex items-center gap-2 text-xs text-ink-low">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-gradient-to-r from-violet-600 to-sky" />
            Students
          </span>
        </div>

        <div className="space-y-3.5">
          {BARS.map((bar, i) => (
            <div key={bar.label} className="flex items-center gap-3 sm:gap-4">
              <span className="w-[68px] flex-none truncate text-xs font-medium text-ink-low sm:w-24 sm:text-sm">
                {bar.label}
              </span>
              <div className="h-3.5 flex-grow overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  ref={(el) => { barRefs.current[i] = el; }}
                  style={{ width: `${(bar.value / MAX) * 100}%` }}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-violet-600 to-sky"
                />
              </div>
              <span className="w-9 flex-none text-right text-xs font-bold tabular-nums text-ink sm:text-sm">
                {bar.value}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
};

export default StatsSection;
