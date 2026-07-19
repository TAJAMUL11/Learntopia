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

      // Bars grow from the baseline
      if (reduced) {
        gsap.set(barRefs.current, { scaleY: 1 });
      } else {
        gsap.from(barRefs.current, {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 1,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true },
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

      {/* Bar chart */}
      <Card className="mt-6 p-6 md:p-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-ink-hi">Enrollments by subject</h3>
            <p className="mt-1 text-sm text-ink-low">Where our learners are focusing right now.</p>
          </div>
          <span className="flex items-center gap-2 text-xs text-ink-low">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-violet-500" />
            Students enrolled
          </span>
        </div>

        {/* plot area with y-axis gridlines */}
        <div className="relative h-56 pl-8">
          <div className="absolute inset-0 flex flex-col-reverse justify-between pl-8">
            {[0, 200, 400, 600].map((tick) => (
              <div key={tick} className="relative border-t border-white/[0.05]">
                <span className="absolute -top-2 left-0 -translate-x-full pr-2 text-[0.65rem] tabular-nums text-ink-faint">
                  {tick}
                </span>
              </div>
            ))}
          </div>

          {/* bars */}
          <div className="relative flex h-full items-end justify-between gap-4 sm:gap-6">
            {BARS.map((bar, i) => (
              <div key={bar.label} className="flex h-full flex-1 flex-col items-center justify-end">
                <span className="mb-1.5 text-xs font-semibold tabular-nums text-ink">{bar.value}</span>
                <div
                  ref={(el) => { barRefs.current[i] = el; }}
                  style={{ height: `${(bar.value / MAX) * 100}%` }}
                  className="w-full max-w-[38px] rounded-t-md bg-gradient-to-t from-violet-700 to-violet-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* x-axis labels */}
        <div className="mt-3 flex justify-between gap-4 pl-8 sm:gap-6">
          {BARS.map((bar) => (
            <span key={bar.label} className="flex-1 text-center text-[0.7rem] font-medium text-ink-low sm:text-xs">
              {bar.label}
            </span>
          ))}
        </div>
      </Card>
    </section>
  );
};

export default StatsSection;
