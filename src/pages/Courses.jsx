import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import ImageWithSkeleton from "../Components/ui/ImageWithSkeleton";
import SearchInput from "../Components/ui/SearchInput";
import SectionHeading from "../Components/ui/SectionHeading";
import EmptyState from "../Components/ui/EmptyState";
import Icon from "../Components/ui/Icon";
import { COURSES } from "../data/coursesData";
import star from "../assets/CourseImg/star.png";

const Courses = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [enrollingId, setEnrollingId] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchEnrolled = async () => {
        try {
          const snap = await getDocs(collection(db, "Users", currentUser.uid, "enrolledCourses"));
          const ids = snap.docs.map((d) => d.id);
          setEnrolledIds(ids);
        } catch (e) {
          console.error("Error fetching enrolled courses", e);
        }
      };
      fetchEnrolled();
    }
  }, [currentUser]);

  const handleEnroll = async (course) => {
    if (!currentUser) {
      toast.info("Please log in to enroll and view course details.");
      navigate("/login", { state: { returnTo: `/course/${course.id}` } });
      return;
    }

    const isEnrolled = enrolledIds.includes(course.id.toString());
    if (isEnrolled) {
      navigate(`/course/${course.id}`);
      return;
    }

    try {
      await setDoc(
        doc(db, "Users", currentUser.uid, "enrolledCourses", course.id.toString()),
        {
          courseId: course.id,
          title: course.title,
          category: course.category,
          enrolledAt: new Date(),
          completed: false,
          completedModules: [],
          totalModules: course.syllabus ? course.syllabus.length : 0,
        },
        { merge: true }
      );
      
      setEnrolledIds((prev) => [...prev, course.id.toString()]);
      setEnrollingId(course.id);
      
      // 3.5 second fun loader
      setTimeout(() => {
        setEnrollingId(null);
        navigate(`/course/${course.id}`);
      }, 3500);
    } catch (err) {
      console.error("Enrollment error:", err);
      toast.error("Failed to enroll. Please try again.");
    }
  };

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
        eyebrow="Kids Course Catalog"
        title="Start Your Learning Adventure!"
        description="Explore fun, interactive courses designed specifically for kids. Learn to code, draw, and solve puzzles!"
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
          {filtered.map((course) => {
            const isEnrolled = enrolledIds.includes(course.id.toString());

            return (
              <Card key={course.id} hoverable className="group flex flex-col p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-low">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {isEnrolled && (
                      <span className="flex items-center gap-1 text-xs font-bold text-state-success bg-state-success/10 px-2 py-0.5 rounded-md border border-state-success/20">
                        <Icon name="check-circle" size={12} />
                        Enrolled
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 rounded-full border border-white/[0.13] bg-white/[0.06] px-3 py-1 text-xs font-bold text-ink-hi">
                      <img src={star} alt="" className="h-3.5 w-3.5" />
                      {course.rating}
                    </span>
                  </div>
                </div>

                <div className="relative mb-4 flex justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] py-8">
                  <div className="pointer-events-none absolute left-1/2 top-3 h-20 w-32 -translate-x-1/2 rounded-full bg-violet-500/30 blur-2xl transition-opacity duration-500 group-hover:bg-sky/30" />
                  <ImageWithSkeleton
                    src={course.image}
                    alt={course.title}
                    imgClassName="relative h-24 w-auto object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.5)] transition-[opacity,transform] duration-500 group-hover:scale-[1.07]"
                  />
                </div>

                <h3 className="text-lg font-bold leading-snug text-ink-hi">{course.title}</h3>
                <p className="mt-2 mb-6 text-xs leading-relaxed text-ink-low line-clamp-2">{course.desc}</p>

                <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-5">
                  <div>
                    <div className="flex -space-x-2">
                      {course.avatars.map((a, i) => (
                        <img key={i} src={a} alt="" className="h-6 w-6 rounded-full border-2 border-ground-800 object-cover" />
                      ))}
                    </div>
                    <p className="mt-1.5 text-xs text-ink-low">{course.students} students</p>
                  </div>
                  {isEnrolled ? (
                    <Button 
                      variant="ghost"
                      size="sm" 
                      onClick={() => handleEnroll(course)}
                      className="border-state-success/30 bg-state-success/[0.08] text-state-success hover:bg-state-success/[0.15]"
                    >
                      Resume Course
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => handleEnroll(course)}>
                      Enroll
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="mt-12">
          <EmptyState
            icon="search"
            title={`No courses match “${query}”`}
            description="Try a broader term, or browse the full catalog."
            action={
              <Button variant="secondary" size="sm" onClick={() => setQuery("")}>
                Clear search
              </Button>
            }
          />
        </div>
      )}

      {/* Fun Enrollment Loader */}
      {enrollingId && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ground-900/90 backdrop-blur-md animate-fade-in">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <div className="absolute h-full w-full animate-[spin_3s_linear_infinite] rounded-full border-b-4 border-t-4 border-sky opacity-80" />
            <div className="absolute h-24 w-24 animate-[spin_2s_linear_infinite_reverse] rounded-full border-l-4 border-r-4 border-violet-500 opacity-80" />
            <div className="animate-pulse">
              <Icon name="star" size={40} className="text-white fill-white" />
            </div>
          </div>
          <h2 className="mt-8 text-3xl font-extrabold text-white tracking-tight animate-pulse">Powering up your course...</h2>
          <p className="mt-2 text-sky font-medium text-lg">Getting the AI tutors ready!</p>
        </div>
      )}

    </div>
  );
};

export default Courses;
