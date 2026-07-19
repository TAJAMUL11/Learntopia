import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import SearchInput from "../Components/ui/SearchInput";
import SectionHeading from "../Components/ui/SectionHeading";
import EmptyState from "../Components/ui/EmptyState";

import math from "../assets/CourseImg/math.png";
import paint from "../assets/CourseImg/paint.png";
import finance from "../assets/CourseImg/finance.png";
import Dmarket from "../assets/CourseImg/Dmarket.png";
import coding from "../assets/CourseImg/coding.png";
import python from "../assets/CourseImg/python.png";
import star from "../assets/CourseImg/star.png";
import one from "../assets/Icons/one.jpg";
import two from "../assets/Icons/two.jpg";
import three from "../assets/Icons/three.jpg";
import four from "../assets/Icons/four.jpg";

const COURSES = [
  { id: 1, category: "IT Software", title: "Python: Programming for Beginners", rating: "4.8", image: python, students: "320", desc: "Core syntax, data types, and the fundamentals every developer needs.", avatars: [one, two, three, four] },
  { id: 2, category: "Mathematics", title: "Algebra & Calculus: Beginner Friendly", rating: "4.2", image: math, students: "210", desc: "Build confident foundations in algebra and introductory calculus.", avatars: [one, two, three] },
  { id: 3, category: "Finance", title: "Invest Early & Secure Your Future", rating: "4.9", image: finance, students: "480", desc: "Saving, compounding, and long-term investing made approachable.", avatars: [one, two, three, four] },
  { id: 4, category: "Marketing", title: "Digital Marketing: Complete Guide", rating: "5.0", image: Dmarket, students: "190", desc: "SEO, campaigns, and conversion funnels from the ground up.", avatars: [one, two, three] },
  { id: 5, category: "IT Software", title: "Frontend Development: Advanced Topics", rating: "4.8", image: coding, students: "540", desc: "Modern layout, state, and asynchronous JavaScript patterns.", avatars: [one, two, three] },
  { id: 6, category: "Arts", title: "Interior Design: A Complete Guide", rating: "4.5", image: paint, students: "260", desc: "Composition, color, and space for beautiful, livable rooms.", avatars: [one, two, three, four] },
];

const Courses = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COURSES;
    return COURSES.filter(
      (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="container-page py-16 md:py-20">
      <SectionHeading
        centered
        eyebrow="Course catalog"
        title="Invest in your education"
        description="Learn from focused, beginner-friendly tracks across six subjects and earn verified high scores."
      />

      {/* Search */}
      <div className="mx-auto mt-8 max-w-xl">
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery("")}
          placeholder="Search by course or subject…"
        />
        {query && (
          <p className="mt-3 text-center text-sm text-ink-low">
            {filtered.length} {filtered.length === 1 ? "result" : "results"} for “{query}”
          </p>
        )}
      </div>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <Card key={course.id} hoverable className="group flex flex-col p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-low">
                  {course.category}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/[0.13] bg-white/[0.06] px-3 py-1 text-xs font-bold text-ink-hi">
                  <img src={star} alt="" className="h-3.5 w-3.5" />
                  {course.rating}
                </span>
              </div>

              <div className="relative mb-4 flex justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] py-8">
                {/* soft colored glow so the artwork reads bright, not dull */}
                <div className="pointer-events-none absolute left-1/2 top-3 h-20 w-32 -translate-x-1/2 rounded-full bg-violet-500/30 blur-2xl transition-opacity duration-500 group-hover:bg-sky/30" />
                <img
                  src={course.image}
                  alt={course.title}
                  className="relative h-24 w-auto object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.07]"
                />
              </div>

              <h3 className="text-lg font-bold leading-snug text-ink-hi">{course.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-low">{course.desc}</p>

              <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-4">
                <div>
                  <div className="flex -space-x-2">
                    {course.avatars.map((a, i) => (
                      <img key={i} src={a} alt="" className="h-6 w-6 rounded-full border-2 border-ground-800 object-cover" />
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-ink-low">{course.students} students</p>
                </div>
                <Button size="sm" onClick={() => navigate("/signUp")}>
                  Enroll
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <EmptyState
            icon="search"
            title={`No courses match “${query}”`}
            description="Try a broader term, or browse the full catalog of six subjects."
            action={
              <Button variant="secondary" size="sm" onClick={() => setQuery("")}>
                Clear search
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default Courses;
