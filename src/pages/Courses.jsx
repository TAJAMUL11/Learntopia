import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSound } from "../context/SoundContext";
import { useLanguage } from "../context/LanguageContext";
import { db } from "../firebase/firebase";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import ImageWithSkeleton from "../Components/ui/ImageWithSkeleton";
import SearchInput from "../Components/ui/SearchInput";
import SectionHeading from "../Components/ui/SectionHeading";
import EmptyState from "../Components/ui/EmptyState";
import Icon from "../Components/ui/Icon";
import { COURSES } from "../data/coursesData";
import { getLocalizedCourse } from "../utils/localizationUtils";
import star from "../assets/CourseImg/star.png";

const Courses = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { playBadgeUnlock, playClick } = useSound();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [enrolledIds, setEnrolledIds] = useState([]);
  // Courses the user left but can rejoin — their saved progress still exists.
  const [unenrolledIds, setUnenrolledIds] = useState([]);
  const [enrollingId, setEnrollingId] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchEnrolled = async () => {
        try {
          const snap = await getDocs(collection(db, "Users", currentUser.uid, "enrolledCourses"));
          const active = [];
          const left = [];
          snap.docs.forEach((d) => (d.data().unenrolled ? left.push(d.id) : active.push(d.id)));
          setEnrolledIds(active);
          setUnenrolledIds(left);
        } catch (e) {
          console.error("Error fetching enrolled courses", e);
        }
      };
      fetchEnrolled();
    }
  }, [currentUser]);

  const handleEnroll = async (course) => {
    if (!currentUser) {
      playClick();
      navigate("/login", { state: { returnTo: `/course/${course.id}` } });
      return;
    }

    const idStr = course.id.toString();
    const isEnrolled = enrolledIds.includes(idStr);
    if (isEnrolled) {
      playClick();
      navigate(`/course/${course.id}`);
      return;
    }

    // Rejoin path: the user unenrolled earlier, so their progress is still on
    // file — only clear the flag, never reset completedModules.
    const isRejoin = unenrolledIds.includes(idStr);

    try {
      playBadgeUnlock();
      if (isRejoin) {
        await setDoc(
          doc(db, "Users", currentUser.uid, "enrolledCourses", idStr),
          { unenrolled: false },
          { merge: true }
        );
        setUnenrolledIds((prev) => prev.filter((x) => x !== idStr));
      } else {
        await setDoc(
          doc(db, "Users", currentUser.uid, "enrolledCourses", idStr),
          {
            courseId: course.id,
            title: course.title,
            category: course.category,
            enrolledAt: new Date(),
            unenrolled: false,
            completed: false,
            completedModules: [],
            totalModules: course.syllabus ? course.syllabus.length : 0,
          },
          { merge: true }
        );
      }

      setEnrolledIds((prev) => [...prev, idStr]);
      setEnrollingId(course.id);
      
      // 3.5 second fun loader
      setTimeout(() => {
        setEnrollingId(null);
        navigate(`/course/${course.id}`);
      }, 3500);
    } catch (err) {
      console.error("Enrollment error:", err);
    }
  };

  const localizedCourses = useMemo(() => {
    return COURSES.map((c) => getLocalizedCourse(c, t));
  }, [t]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return localizedCourses;
    return localizedCourses.filter(
      (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [query, localizedCourses]);

  return (
    <div className="container-page py-16 md:py-20">
      <SectionHeading
        centered
        eyebrow={t("nav.courses")}
        title={t("courses.title")}
        description={t("courses.subtitle")}
      />

      {/* Search */}
      <div className="mx-auto mt-8 max-w-xl">
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery("")}
          placeholder={t("courses.searchPlaceholder")}
        />
        {query && (
          <p className="mt-3 text-center text-sm text-ink-low">
            {filtered.length === 1
              ? t("courses.searchResultsSingle", { count: filtered.length, query })
              : t("courses.searchResultsPlural", { count: filtered.length, query })}
          </p>
        )}
      </div>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => {
            const isEnrolled = enrolledIds.includes(course.id.toString());
            const isRejoin = !isEnrolled && unenrolledIds.includes(course.id.toString());

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
                        {t("courses.enrolledBadge")}
                      </span>
                    )}
                    {isRejoin && (
                      <span className="flex items-center gap-1 text-xs font-bold text-state-warning bg-state-warning/10 px-2 py-0.5 rounded-md border border-state-warning/20">
                        <Icon name="refresh-cw" size={12} />
                        {t("courses.rejoinBadge")}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-surface-2 px-3 py-1 text-xs font-bold text-ink-hi shadow-clay-sm">
                      <img src={star} alt="" className="h-3.5 w-3.5" />
                      {course.rating}
                    </span>
                  </div>
                </div>

                <div className="relative mb-4 flex justify-center overflow-hidden rounded-2xl clay-inset py-8">
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
                    <p className="mt-1.5 text-xs text-ink-low">{course.students} {String(t("stats.studentsLegend") || "").toLowerCase()}</p>
                  </div>
                  {isEnrolled ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEnroll(course)}
                      className="border-state-success/30 bg-state-success/[0.08] text-state-success hover:bg-state-success/[0.15]"
                    >
                      {t("courses.continueLearning")}
                    </Button>
                  ) : isRejoin ? (
                    <Button
                      size="sm"
                      onClick={() => handleEnroll(course)}
                      className="border-state-warning/30 bg-state-warning/[0.10] text-state-warning hover:bg-state-warning/[0.18]"
                    >
                      <Icon name="refresh-cw" size={14} />
                      {t("courses.rejoin")}
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => handleEnroll(course)}>
                      {t("courses.startLearning")}
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
            title={t("courses.noResults", { query })}
            description={t("courses.noResultsDesc")}
            action={
              <Button variant="secondary" size="sm" onClick={() => setQuery("")}>
                {t("courses.clearSearch")}
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
          <h2 className="mt-8 text-3xl font-extrabold text-white tracking-tight animate-pulse">{t("courses.enrolling")}</h2>
        </div>
      )}

    </div>
  );
};

export default Courses;
