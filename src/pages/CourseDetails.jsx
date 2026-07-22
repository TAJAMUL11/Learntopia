import { useEffect, useState } from "react";
import { useParams, useNavigate, useBlocker } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc, deleteField } from "firebase/firestore";
import { toast } from "react-toastify";
import { COURSES } from "../data/coursesData";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Icon from "../Components/ui/Icon";
import ImageWithSkeleton from "../Components/ui/ImageWithSkeleton";
import { Skeleton } from "../Components/ui/Skeleton";
import Modal from "../Components/ui/Modal";

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
  const [showResetModal, setShowResetModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  
  const [activeTab, setActiveTab] = useState("overview");

  // Track answers for the current active module's exercises: { exerciseIndex: selectedOption }
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      activeTab === "syllabus" && currentLocation.pathname !== nextLocation.pathname
  );

  const handleTabSwitch = (tab) => {
    if (activeTab === "syllabus" && tab !== "syllabus") {
      setPendingTab(tab);
      setShowLeaveModal(true);
    } else {
      setActiveTab(tab);
    }
  };

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
  const currentIndex = completedModules.length;
  const allDone = total > 0 && currentIndex >= total;
  const progressPct = total ? Math.round((completedModules.length / total) * 100) : 0;

  const courseRef = () =>
    doc(db, "Users", currentUser.uid, "enrolledCourses", course.id.toString());

  const handleSelectAnswer = (exerciseIndex, option) => {
    if (saving) return;
    setShowErrors(false);
    setCurrentAnswers(prev => ({ ...prev, [exerciseIndex]: option }));
  };

  const checkAnswersAndComplete = async (moduleIndex) => {
    if (saving) return;
    
    const module = course.syllabus[moduleIndex];
    let allCorrect = true;
    
    for (let i = 0; i < module.exercises.length; i++) {
      if (currentAnswers[i] !== module.exercises[i].answer) {
        allCorrect = false;
        break;
      }
    }

    if (!allCorrect) {
      setShowErrors(true);
      return;
    }

    // All correct! Complete the module
    setSaving(true);
    const newCompleted = [...completedModules, moduleIndex];
    try {
      await setDoc(
        courseRef(),
        { completedModules: newCompleted, totalModules: total, progressUpdatedAt: new Date() },
        { merge: true }
      );
      setCompletedModules(newCompleted);
      setCurrentAnswers({});
      setShowErrors(false);
      setExpandedIndex(newCompleted.length < total ? newCompleted.length : moduleIndex);
      toast.success("Module complete! 🎉 You unlocked the next one!");
    } catch (err) {
      console.error("Error saving progress:", err);
      toast.error("Couldn't save your progress. Please try again.");
    } finally {
      setSaving(false);
    }
  };

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

  const resetCourse = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await setDoc(
        courseRef(),
        {
          completed: false,
          completedAt: deleteField(),
          completedModules: [],
          totalModules: total,
          progressUpdatedAt: new Date(),
        },
        { merge: true }
      );
      setCompletedModules([]);
      setIsCompleted(false);
      setExpandedIndex(0);
      setCurrentAnswers({});
      setShowErrors(false);
      setShowResetModal(false);
      toast.success("Course reset! Good luck on your fresh start. 🌱");
    } catch (err) {
      console.error("Error resetting course:", err);
      toast.error("Couldn't reset the course. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loadingData || !course) {
    return (
      <div className="container-page py-16 text-ink-hi md:py-20">
        <Card className="mx-auto w-full max-w-4xl p-8">
          <Skeleton className="mb-6 h-32 w-full rounded-2xl" />
          <Skeleton className="mb-3 h-6 w-1/2" />
          <Skeleton className="mb-6 h-3 w-3/4" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </Card>
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-4xl animate-fade-up">
        
        {/* Back Navigation */}
        <button 
          onClick={() => navigate("/courses")}
          className="group mb-8 flex items-center gap-2 text-sm font-bold text-ink-low transition-colors hover:text-sky"
        >
          <Icon name="arrow-left" size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Courses
        </button>

        {/* Header Revamp */}
        <div className="mb-10 flex flex-col items-center gap-8 md:flex-row md:items-start md:text-left text-center">
          <div className="relative flex h-48 w-64 flex-none items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 shadow-2xl">
            <div className="pointer-events-none absolute left-1/2 top-4 h-24 w-32 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl transition-all duration-700 hover:scale-150" />
            <ImageWithSkeleton
              src={course.image}
              alt=""
              imgClassName="max-h-full max-w-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.05]"
            />
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <span className="inline-block rounded-full border border-white/[0.13] bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky">
                {course.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-state-warning">
                <Icon name="star" size={14} className="fill-state-warning" /> {course.rating}
              </span>
            </div>
            
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-hi md:text-4xl lg:text-5xl">{course.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-low">{course.desc}</p>
            
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-ink-hi border border-white/[0.05]">
                <Icon name="clock" size={16} className="text-violet-400" />
                {course.duration || "N/A"}
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-ink-hi border border-white/[0.05]">
                <Icon name="book" size={16} className="text-violet-400" />
                {course.difficulty || "All Levels"}
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-ink-hi border border-white/[0.05]">
                <Icon name="users" size={16} className="text-violet-400" />
                {course.students} enrolled
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <Card className="mb-10 p-5 md:p-6 shadow-xl">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-ink-hi">Your progress</span>
            <span className="font-bold tabular-nums text-sky">
              {completedModules.length} / {total} modules · {progressPct}%
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/[0.06] border border-white/[0.05]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-sky transition-[width] duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${progressPct}%` }}
            >
               {progressPct > 0 && (
                 <div className="absolute inset-0 w-full h-full bg-white/20 animate-pulse" />
               )}
            </div>
          </div>
        </Card>

        {/* Tabs Navigation */}
        <div className="mb-8 flex gap-2 border-b border-white/[0.08] pb-[1px]">
          <button 
            onClick={() => handleTabSwitch("overview")}
            className={`px-5 py-3 text-sm font-bold transition-all relative ${
              activeTab === "overview" 
                ? "text-ink-hi" 
                : "text-ink-low hover:text-ink-hi hover:bg-white/[0.02] rounded-t-lg"
            }`}
          >
            Overview
            {activeTab === "overview" && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-violet-500 rounded-t-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            )}
          </button>
          <button 
            onClick={() => handleTabSwitch("syllabus")}
            className={`px-5 py-3 text-sm font-bold transition-all relative flex items-center gap-2 ${
              activeTab === "syllabus" 
                ? "text-ink-hi" 
                : "text-ink-low hover:text-ink-hi hover:bg-white/[0.02] rounded-t-lg"
            }`}
          >
            Syllabus & Exercises
            {activeTab === "syllabus" && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-violet-500 rounded-t-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            )}
            {completedModules.length > 0 && !isCompleted && activeTab !== "syllabus" && (
               <span className="flex h-2 w-2 rounded-full bg-sky animate-pulse" />
            )}
          </button>
        </div>

        {/* Tab Content: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid gap-10 md:grid-cols-3 animate-fade-in">
            <div className="space-y-10 md:col-span-2">
              <section>
                <h3 className="mb-5 text-2xl font-bold text-ink-hi">What you'll learn</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {course.learningObjectives?.map((obj, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04]">
                      <Icon name="check-circle" size={20} className="mt-0.5 flex-none text-sky" />
                      <span className="text-sm font-medium leading-relaxed text-ink-low">{obj}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-5 text-2xl font-bold text-ink-hi">Prerequisites</h3>
                <ul className="space-y-3 rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6">
                  {course.prerequisites?.map((req, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-ink-low">
                      <div className="h-1.5 w-1.5 flex-none rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-6">
              {/* AI Tutor Card */}
              <Card className="p-6 sticky top-24 border-violet-500/30 bg-gradient-to-b from-violet-500/10 to-transparent">
                <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/20">
                  <Icon name="cpu" size={14} className="text-violet-400" />
                </div>
                <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.1em] text-violet-300">Your AI Tutor</h4>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-violet-500 to-sky opacity-60 blur-md animate-pulse" />
                    <img 
                      src={course.aiTutor?.avatar} 
                      alt={course.aiTutor?.name} 
                      className="relative h-24 w-24 rounded-full border-2 border-violet-500 object-cover" 
                    />
                  </div>
                  <div>
                    <h5 className="text-xl font-extrabold text-ink-hi">{course.aiTutor?.name || "AI Tutor"}</h5>
                    <p className="mt-1 text-sm font-semibold text-sky">{course.aiTutor?.role}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-low">
                    I am powered by AI and I'm here to help you master this course!
                  </p>
                  <Button variant="primary" className="mt-4 w-full gap-2 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]" onClick={() => setShowAIModal(true)}>
                    <Icon name="message-circle" size={16} /> Ask {course.aiTutor?.name}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Tab Content: SYLLABUS */}
        {activeTab === "syllabus" && (
          <div className="space-y-5 animate-fade-in">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-ink-hi">Course Modules</h3>
                <p className="mt-1 text-sm text-ink-low">Complete all exercises in a module to unlock the next one.</p>
              </div>
              <Button variant="secondary" size="sm" className="gap-2 shrink-0 border-violet-500/30 text-violet-300 hover:bg-violet-500/10" onClick={() => setShowAIModal(true)}>
                <Icon name="help-circle" size={16} /> Need help? Ask AI
              </Button>
            </div>
            
            {course.syllabus.map((module, moduleIndex) => {
              const done = moduleIndex < currentIndex || isCompleted;
              const active = moduleIndex === currentIndex && !isCompleted;
              const locked = moduleIndex > currentIndex && !isCompleted;
              const open = expandedIndex === moduleIndex && !locked;

              return (
                <Card
                  key={moduleIndex}
                  className={`overflow-hidden p-0 transition-all duration-300 ${active ? "border-violet-500/40 shadow-[0_0_25px_rgba(139,92,246,0.15)]" : ""} ${locked ? "opacity-60" : ""}`}
                >
                  {/* Row header */}
                  <button
                    type="button"
                    disabled={locked}
                    onClick={() => {
                      if (open) setExpandedIndex(-1);
                      else {
                        setExpandedIndex(moduleIndex);
                        if (active) {
                          setCurrentAnswers({});
                          setShowErrors(false);
                        }
                      }
                    }}
                    className={`flex w-full items-center gap-4 p-5 text-left transition-colors md:p-6 ${
                      locked ? "cursor-not-allowed" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <div
                      className={`grid h-12 w-12 flex-none place-items-center rounded-2xl text-sm font-extrabold transition-colors ${
                        done
                          ? "bg-state-success/20 text-state-success shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                          : active
                          ? "bg-violet-500/20 text-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                          : "bg-white/[0.05] text-ink-low"
                      }`}
                    >
                      {done ? <Icon name="check" size={20} /> : locked ? <Icon name="lock" size={16} /> : moduleIndex + 1}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <h3 className="text-lg font-bold text-ink-hi">{module.title}</h3>
                      <p className="mt-1 truncate text-sm text-ink-low">
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
                    <div className="border-t border-white/[0.07] bg-white/[0.01] p-5 md:p-8">
                      
                      {/* Rich Content Sections */}
                      <div className="space-y-6 mb-10">
                        {module.contentSections?.map((section, idx) => {
                          if (section.type === 'fact') {
                            return (
                              <div key={idx} className="rounded-2xl border border-sky/30 bg-sky/10 p-5 shadow-inner">
                                <h4 className="mb-2 flex items-center gap-2 text-lg font-bold text-sky">
                                  <Icon name="star" size={20} className="fill-sky text-sky" />
                                  {section.title}
                                </h4>
                                <p className="text-sm font-medium leading-relaxed text-sky-100/90">{section.content}</p>
                              </div>
                            );
                          }
                          return (
                            <div key={idx} className="rounded-2xl border border-white/[0.03] bg-white/[0.02] p-5">
                              <h4 className="mb-3 text-lg font-bold text-violet-300">{section.title}</h4>
                              <p className="text-base leading-relaxed text-ink-low">{section.content}</p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Exercises */}
                      <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent p-5 shadow-inner md:p-8">
                        <div className="mb-6 border-b border-white/[0.08] pb-4">
                          <h4 className="flex items-center gap-3 text-xl font-extrabold text-ink-hi">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                              <Icon name="edit-3" size={16} />
                            </span>
                            Module Challenge
                          </h4>
                          <p className="mt-2 text-sm text-ink-low">Answer all questions correctly to unlock the next module.</p>
                        </div>
                        
                        <div className="space-y-8">
                          {module.exercises?.map((exercise, exIndex) => {
                            const isExDone = done;
                            const currentSel = isExDone ? exercise.answer : (active ? currentAnswers[exIndex] : null);
                            
                            return (
                              <div key={exIndex} className="animate-fade-up" style={{ animationDelay: `${exIndex * 100}ms`}}>
                                <p className="mb-4 text-sm font-bold text-ink-hi">
                                  <span className="text-violet-400 mr-2">Q{exIndex + 1}.</span> 
                                  {exercise.question}
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {exercise.options.map((option) => {
                                    const isCorrect = option === exercise.answer;
                                    const isSelected = currentSel === option;
                                    
                                    let style = "border-white/[0.08] bg-white/[0.02] hover:border-violet-500/50 hover:bg-white/[0.05]";
                                    
                                    if (isExDone) {
                                      if (isCorrect) style = "border-state-success bg-state-success/15 text-emerald-200 shadow-[0_0_10px_rgba(34,197,94,0.1)]";
                                      else style = "border-white/[0.03] opacity-40";
                                    } else if (active) {
                                      if (isSelected) {
                                        style = "border-violet-500 bg-violet-500/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]";
                                        if (showErrors && isCorrect) style = "border-state-success bg-state-success/20 text-emerald-200 shadow-[0_0_10px_rgba(34,197,94,0.2)]";
                                        if (showErrors && !isCorrect) style = "border-state-danger bg-state-danger/20 text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.2)]";
                                      } else if (showErrors && isCorrect) {
                                         style = "border-state-success/50 bg-state-success/10 text-emerald-200";
                                      }
                                    }

                                    return (
                                      <button
                                        key={option}
                                        type="button"
                                        disabled={isExDone || saving || showErrors}
                                        onClick={() => handleSelectAnswer(exIndex, option)}
                                        className={`flex min-h-[64px] items-center justify-between rounded-xl border px-5 py-3 text-left text-sm font-medium transition-all duration-300 ${style}`}
                                      >
                                        <span>{option}</span>
                                        {((isExDone && isCorrect) || (active && showErrors && isSelected && isCorrect)) && (
                                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-state-success/20 text-xs font-bold text-state-success"><Icon name="check" size={14} /></span>
                                        )}
                                        {(active && showErrors && isSelected && !isCorrect) && (
                                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-state-danger/20 text-xs font-bold text-state-danger"><Icon name="x" size={14} /></span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {active && (
                           <div className="mt-8 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                              {showErrors ? (
                                <p className="text-sm font-bold text-state-danger flex items-center gap-2 animate-bounce">
                                  <Icon name="alert-circle" size={18} /> Review your answers and try again!
                                </p>
                              ) : (
                                <p className="text-sm text-ink-low">Answer all questions to proceed.</p>
                              )}
                              
                              {showErrors ? (
                                <Button onClick={() => setShowErrors(false)} variant="secondary">
                                  Try Again
                                </Button>
                              ) : (
                                <Button 
                                  onClick={() => checkAnswersAndComplete(moduleIndex)} 
                                  disabled={Object.keys(currentAnswers).length < module.exercises.length || saving}
                                  loading={saving}
                                  className="w-full sm:w-auto px-8"
                                >
                                  Submit Answers
                                </Button>
                              )}
                           </div>
                        )}
                        
                        {done && (
                          <div className="mt-8 rounded-xl bg-state-success/10 p-4 border border-state-success/20 text-center animate-fade-in">
                            <p className="flex items-center justify-center gap-2 text-lg font-bold text-state-success">
                              <Icon name="check-circle" size={24} /> Module Mastered!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}

            {/* Completion Card now placed at the bottom of the Syllabus tab */}
            <Card className={`mt-10 p-6 shadow-2xl md:p-8 transition-colors duration-500 ${isCompleted ? "border-state-success/40 bg-state-success/[0.05]" : "border-violet-500/20 bg-violet-500/[0.02]"}`}>
              <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
                <div>
                  <h4 className="flex items-center justify-center gap-2 text-xl font-bold text-ink-hi sm:justify-start md:text-2xl">
                    {isCompleted ? (
                      <>
                        <span className="text-state-success animate-bounce"><Icon name="trophy" size={24} /></span>
                        You&rsquo;ve finished this course!
                      </>
                    ) : allDone ? (
                      "All modules done — claim your completion!"
                    ) : (
                      "Keep going!"
                    )}
                  </h4>
                  <p className="mt-2 text-sm text-ink-low md:text-base">
                    {isCompleted
                      ? "This course is marked as completed on your dashboard."
                      : allDone
                      ? "You finished every module. Mark the course complete to save it."
                      : `Finish all ${total} modules to unlock course completion (${completedModules.length}/${total} done).`}
                  </p>
                </div>
                <div className="flex flex-none gap-3">
                  <Button variant="secondary" onClick={() => navigate("/dashboard")}>Dashboard</Button>
                  {isCompleted ? (
                    <Button variant="secondary" onClick={() => setShowResetModal(true)} className="gap-2">
                      <Icon name="refresh-cw" size={16} /> Start Again
                    </Button>
                  ) : (
                    <Button onClick={markCourseComplete} disabled={!allDone} loading={saving && allDone} className="shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                      Mark as complete
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            <p className="mt-8 text-center text-xs font-medium text-ink-low/70">
              Need to manage your enrollments? You can drop or restart courses anytime from your <span className="cursor-pointer text-sky hover:underline" onClick={() => navigate("/dashboard")}>Student Dashboard</span>.
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={showLeaveModal || blocker.state === "blocked"}
        onClose={() => {
          if (blocker.state === "blocked") blocker.reset();
          setShowLeaveModal(false);
          setPendingTab(null);
        }}
        title="Leave Syllabus?"
        icon="alert-triangle"
        actionText="Leave"
        actionVariant="danger"
        isDestructive={true}
        onAction={() => {
          if (blocker.state === "blocked") {
            blocker.proceed();
          } else if (pendingTab) {
            setActiveTab(pendingTab);
            setCurrentAnswers({});
            setShowErrors(false);
          }
          setShowLeaveModal(false);
          setPendingTab(null);
        }}
      >
        <p className="mb-4 text-ink-hi">Are you sure you want to leave the syllabus?</p>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm">
          <ul className="list-disc pl-5 space-y-1 text-ink-low">
            <li>Any <strong className="text-white">unsubmitted answers</strong> for your current module will be reset.</li>
            <li>Modules you have <strong className="text-state-success">already completed</strong> are securely saved and will not be lost.</li>
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Start Again?"
        icon="refresh-cw"
        actionText="Yes, reset course"
        actionVariant="primary"
        onAction={resetCourse}
        loading={saving}
      >
        <p className="mb-4 text-ink-hi">Are you sure you want to reset your progress and start this course from the beginning?</p>
        <div className="rounded-xl border border-state-warning/20 bg-state-warning/10 p-4 text-sm">
          <div className="flex items-start gap-3 text-state-warning">
            <Icon name="alert-triangle" size={18} className="mt-0.5 flex-none" />
            <div className="leading-relaxed">
              <span className="font-bold">Warning:</span> All your current checkmarks and completion timestamps will be permanently wiped out. This action cannot be undone.
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        title={`Chat with ${course.aiTutor?.name}`}
        icon="cpu"
        actionText="Got it!"
        actionVariant="primary"
        onAction={() => setShowAIModal(false)}
      >
        <div className="flex flex-col items-center text-center p-4">
          <div className="relative mb-6">
            <div className="absolute -inset-4 rounded-full bg-violet-500/20 blur-xl animate-pulse" />
            <img src={course.aiTutor?.avatar} alt="AI" className="relative h-32 w-32 rounded-full border-4 border-violet-500 object-cover shadow-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-ink-hi mb-2">I'm booting up!</h3>
          <p className="text-base text-ink-low leading-relaxed">
            I am currently configuring my neural networks to become the best AI tutor for you. 
            The interactive chat feature is coming very soon!
          </p>
        </div>
      </Modal>

    </div>
  );
};

export default CourseDetails;
