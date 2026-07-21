import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { COURSES } from "../data/coursesData";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Icon from "../Components/ui/Icon";
import ImageWithSkeleton from "../Components/ui/ImageWithSkeleton";
import { Skeleton } from "../Components/ui/Skeleton";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();

  const [course, setCourse] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  // Per-attempt exercise UI state for the currently active module.
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) {
      toast.info("Please log in to view course details.");
      navigate("/login", { state: { returnTo: `/course/${id}` }, replace: true });
      return;
    }

    const c = COURSES.find((c) => c.id.toString() === id);
    if (!c) {
      navigate("/courses", { replace: true });
      return;
    }
    setCourse(c);

    const load = async () => {
      const total = c.syllabus.length;
      try {
        const docRef = doc(db, "Users", currentUser.uid, "enrolledCourses", c.id.toString());
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          const done = Array.isArray(data.completedModules) ? data.completedModules : [];
          setCompletedModules(done);
          setIsCompleted(!!data.completed);
          setExpandedIndex(done.length < total ? done.length : total - 1);
        } else {
          // Auto-enroll (arrived via a deep link). completed:false passes rules.
          await setDoc(docRef, {
            courseId: c.id,
            title: c.title,
            category: c.category,
            enrolledAt: new Date(),
            completed: false,
            completedModules: [],
            totalModules: total,
          });
          setExpandedIndex(0);
        }
      } catch (err) {
        console.error("Error loading course progress:", err);
      } finally {
        setLoadingData(false);
      }
    };
    load();
  }, [authLoading, currentUser, id, navigate]);

  const total = course ? course.syllabus.length : 0;
  const currentIndex = completedModules.length; // next module to complete
  const allDone = total > 0 && currentIndex >= total;
  const progressPct = total ? Math.round((completedModules.length / total) * 100) : 0;

  const courseRef = () =>
    doc(db, "Users", currentUser.uid, "enrolledCourses", course.id.toString());

  // Mark a module done once its exercise is answered correctly.
  const completeModule = async (index) => {
    if (saving) return;
    setSaving(true);
    const newCompleted = [...completedModules, index];
    try {
      await setDoc(
        courseRef(),
        { completedModules: newCompleted, totalModules: total, progressUpdatedAt: new Date() },
        { merge: true }
      );
      setCompletedModules(newCompleted);
      setSelected(null);
      setWrong(false);
      setExpandedIndex(newCompleted.length < total ? newCompleted.length : index);
      toast.success("Module complete! 🎉");
    } catch (err) {
      console.error("Error saving progress:", err);
      toast.error("Couldn't save your progress. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleAnswer = (option, module, index) => {
    if (saving) return;
    setSelected(option);
    if (option === module.exercise.answer) {
      completeModule(index);
    } else {
      setWrong(true);
    }
  };

  // Only allowed at 100% — the button is also disabled until then.
  const markCourseComplete = async () => {
    if (!allDone || saving) return;
    setSaving(true);
    try {
      await setDoc(
        courseRef(),
        {
          completed: true,
          completedAt: new Date(),
          completedModules: course.syllabus.map((_, i) => i),
          totalModules: total,
        },
        { merge: true }
      );
      setIsCompleted(true);
      toast.success("Course completed! Amazing work! 🏆");
    } catch (err) {
      console.error("Error completing course:", err);
      toast.error("Couldn't mark the course complete. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loadingData || !course) {
    return (
      <div className="container-page py-16 text-ink-hi md:py-20">
        <Card className="mx-auto w-full max-w-3xl p-8">
          <Skeleton className="mb-6 h-32 w-full rounded-2xl" />
          <Skeleton className="mb-3 h-6 w-1/2" />
          <Skeleton className="mb-6 h-3 w-3/4" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </Card>
      </div>
    );
  }

  return (
    <div className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-3xl animate-fade-up">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <div className="relative flex h-28 w-40 flex-none items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4">
            <ImageWithSkeleton
              src={course.image}
              alt=""
              imgClassName="max-h-full max-w-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.5)] transition-opacity duration-500"
            />
          </div>
          <div>
            <span className="inline-block rounded-full border border-white/[0.13] bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky">
              {course.category}
            </span>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-hi md:text-3xl">{course.title}</h1>
            <p className="mt-2 leading-relaxed text-ink-low">{course.desc}</p>
          </div>
        </div>

        {/* Progress bar */}
        <Card className="mb-8 p-5 md:p-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-ink-hi">Your progress</span>
            <span className="font-bold tabular-nums text-sky">
              {completedModules.length} / {total} modules · {progressPct}%
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-sky transition-[width] duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </Card>

        {/* Modules */}
        <div className="space-y-4">
          {course.syllabus.map((module, index) => {
            const done = index < currentIndex || isCompleted;
            const active = index === currentIndex && !isCompleted;
            const locked = index > currentIndex && !isCompleted;
            const open = expandedIndex === index && !locked;

            return (
              <Card
                key={index}
                className={`overflow-hidden p-0 ${active ? "border-violet-500/40" : ""} ${locked ? "opacity-60" : ""}`}
              >
                {/* Row header */}
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => setExpandedIndex(open ? -1 : index)}
                  className={`flex w-full items-center gap-4 p-5 text-left transition-colors md:p-6 ${
                    locked ? "cursor-not-allowed" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <div
                    className={`grid h-10 w-10 flex-none place-items-center rounded-xl text-sm font-extrabold ${
                      done
                        ? "bg-state-success/20 text-state-success"
                        : active
                        ? "bg-violet-500/20 text-violet-400"
                        : "bg-white/[0.05] text-ink-low"
                    }`}
                  >
                    {done ? <Icon name="check" size={18} /> : locked ? <Icon name="lock" size={16} /> : index + 1}
                  </div>
                  <div className="min-w-0 flex-grow">
                    <h3 className="font-bold text-ink-hi">{module.title}</h3>
                    <p className="truncate text-sm text-ink-low">
                      {locked ? "Complete the previous module to unlock" : module.desc}
                    </p>
                  </div>
                  {!locked && (
                    <Icon
                      name="chevron-down"
                      size={20}
                      className={`flex-none text-ink-low transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* Expanded body */}
                {open && (
                  <div className="border-t border-white/[0.07] p-5 md:p-6">
                    <p className="leading-relaxed text-ink">{module.content}</p>

                    {/* Exercise */}
                    <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 md:p-5">
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-hi">
                        <span className="text-violet-400"><Icon name="info" size={16} /></span>
                        Quick check: {module.exercise.question}
                      </p>
                      <div className="grid gap-2.5">
                        {module.exercise.options.map((option) => {
                          const isCorrect = option === module.exercise.answer;
                          let style = "border-white/[0.08] bg-white/[0.03] hover:border-violet-500 hover:bg-white/[0.06]";
                          if (done) {
                            if (isCorrect) style = "border-state-success bg-state-success/15 text-emerald-200";
                            else style = "border-white/[0.05] opacity-50";
                          } else if (active && selected === option) {
                            style = isCorrect
                              ? "border-state-success bg-state-success/15 text-emerald-200"
                              : "border-state-danger bg-state-danger/15 text-rose-200";
                          }
                          return (
                            <button
                              key={option}
                              type="button"
                              disabled={done || saving}
                              onClick={() => handleAnswer(option, module, index)}
                              className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${style}`}
                            >
                              <span>{option}</span>
                              {(done && isCorrect) || (active && selected === option && isCorrect) ? (
                                <span className="text-xs font-bold uppercase text-state-success">✓</span>
                              ) : active && selected === option ? (
                                <span className="text-xs font-bold uppercase text-state-danger">✗</span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                      {active && wrong && (
                        <p className="mt-3 text-sm font-medium text-state-warning">Not quite — read again and pick another answer.</p>
                      )}
                      {done && (
                        <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-state-success">
                          <Icon name="check-circle" size={15} /> Module completed
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Completion */}
        <Card className={`mt-8 p-6 md:p-8 ${isCompleted ? "border-state-success/30 bg-state-success/[0.04]" : ""}`}>
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <h4 className="flex items-center justify-center gap-2 text-xl font-bold text-ink-hi sm:justify-start">
                {isCompleted ? (
                  <>
                    <span className="text-state-success"><Icon name="trophy" size={22} /></span>
                    You&rsquo;ve finished this course!
                  </>
                ) : allDone ? (
                  "All modules done — claim your completion!"
                ) : (
                  "Keep going!"
                )}
              </h4>
              <p className="mt-1 text-sm text-ink-low">
                {isCompleted
                  ? "This course is marked as completed on your dashboard."
                  : allDone
                  ? "You finished every module. Mark the course complete to save it."
                  : `Finish all ${total} modules to unlock course completion (${completedModules.length}/${total} done).`}
              </p>
            </div>
            <div className="flex flex-none gap-3">
              <Button variant="secondary" onClick={() => navigate("/dashboard")}>Dashboard</Button>
              {!isCompleted && (
                <Button onClick={markCourseComplete} disabled={!allDone} loading={saving && allDone}>
                  Mark as complete
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetails;
