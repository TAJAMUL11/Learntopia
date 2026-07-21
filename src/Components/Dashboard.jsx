import { db } from "../firebase/firebase";
import { getDoc, doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import EmptyState from "./ui/EmptyState";
import { Skeleton } from "./ui/Skeleton";
import Modal from "./ui/Modal";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();
  
  const [userDetails, setUserDetails] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [quizScores, setQuizScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [courseToUnenroll, setCourseToUnenroll] = useState(null);
  const [unenrollLoading, setUnenrollLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setUserDetails(null);
      setEnrolledCourses([]);
      setQuizScores({});
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const userRef = doc(db, "Users", currentUser.uid);
        const coursesRef = collection(db, "Users", currentUser.uid, "enrolledCourses");
        const quizRef = collection(db, "Users", currentUser.uid, "quizAttempts");

        const [userSnap, coursesSnap, quizSnap] = await Promise.all([
          getDoc(userRef),
          getDocs(coursesRef),
          getDocs(quizRef)
        ]);

        if (userSnap.exists()) {
          setUserDetails(userSnap.data());
        } else {
          setUserDetails({ email: currentUser.email, fullName: currentUser.displayName });
        }

        const courses = [];
        coursesSnap.forEach((docSnap) => courses.push({ id: docSnap.id, ...docSnap.data() }));
        setEnrolledCourses(courses);

        const scores = {};
        quizSnap.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.quizId) {
            scores[data.quizTitle] = Math.max(scores[data.quizTitle] || 0, data.score);
          }
        });
        setQuizScores(scores);
        
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUnenroll = async () => {
    if (!courseToUnenroll) return;
    setUnenrollLoading(true);
    try {
      await deleteDoc(doc(db, "Users", currentUser.uid, "enrolledCourses", courseToUnenroll.courseId.toString()));
      setEnrolledCourses(prev => prev.filter(c => c.courseId !== courseToUnenroll.courseId));
      toast.success(`Successfully unenrolled from ${courseToUnenroll.title}`);
      setCourseToUnenroll(null);
    } catch (err) {
      console.error("Error unenrolling:", err);
      toast.error("Failed to unenroll. Please try again.");
    } finally {
      setUnenrollLoading(false);
    }
  };

  // Derived Metrics
  const activeCourses = useMemo(() => enrolledCourses.filter(c => !c.completed), [enrolledCourses]);
  const completedCourses = useMemo(() => enrolledCourses.filter(c => c.completed), [enrolledCourses]);
  const totalQuizzes = Object.keys(quizScores).length;
  const totalPoints = Object.values(quizScores).reduce((sum, score) => sum + score, 0);

  return (
    <div className="container-page py-16 md:py-20 text-ink-hi">
      {loading ? (
        <Card className="mx-auto w-full max-w-2xl p-8 text-center">
          <Skeleton className="mx-auto mb-6 h-24 w-24 rounded-full" />
          <Skeleton className="mx-auto mb-2 h-6 w-40" />
          <Skeleton className="mx-auto mb-6 h-3 w-56" />
        </Card>
      ) : !currentUser ? (
        <Card className="mx-auto w-full max-w-md p-8">
          <EmptyState
            icon="user"
            title="No active profile"
            description="Please log in to view your student dashboard."
            action={<Button onClick={() => navigate("/login")}>Log in now</Button>}
          />
        </Card>
      ) : (
        <div className="mx-auto max-w-5xl space-y-8 animate-fade-up">
          
          {/* Profile Header */}
          <Card className="flex flex-col items-center justify-between gap-6 p-6 sm:flex-row md:p-8 border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent">
            <div className="flex items-center gap-6">
              {currentUser.photoURL ? (
                 <img src={currentUser.photoURL} referrerPolicy="no-referrer" alt="Profile" className="h-20 w-20 flex-none rounded-full border-4 border-white/10 shadow-lg" />
              ) : (
                <div className="grid h-20 w-20 flex-none place-items-center rounded-full bg-gradient-to-tr from-violet-600 to-sky text-3xl font-extrabold text-white shadow-glow">
                  {userDetails?.fullName ? userDetails.fullName.charAt(0).toUpperCase() : "S"}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl text-ink-hi">
                  {userDetails?.fullName || currentUser.displayName || "Student"}
                </h1>
                <p className="mt-1 text-sm font-medium text-ink-low">{userDetails?.email}</p>
              </div>
            </div>
            <Button variant="danger" onClick={handleLogout} className="flex-none">
              <Icon name="logout" size={16} /> Log out
            </Button>
          </Card>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-card transition-colors hover:bg-white/[0.04]">
              <div className="flex items-center gap-3 text-sky">
                <Icon name="book" size={20} />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-low">Enrolled</h3>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-ink-hi">{enrolledCourses.length}</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-card transition-colors hover:bg-white/[0.04]">
              <div className="flex items-center gap-3 text-green-400">
                <Icon name="check" size={20} />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-low">Completed</h3>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-ink-hi">{completedCourses.length}</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-card transition-colors hover:bg-white/[0.04]">
              <div className="flex items-center gap-3 text-violet-400">
                <Icon name="message-circle" size={20} />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-low">Quizzes</h3>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-ink-hi">{totalQuizzes}</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-card transition-colors hover:bg-white/[0.04]">
              <div className="flex items-center gap-3 text-yellow-400">
                <Icon name="star" size={20} />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-low">Total Pts</h3>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-ink-hi">{totalPoints}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            
            {/* Active Courses */}
            <Card className="p-6 md:p-8">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-ink-hi">
                <span className="text-sky"><Icon name="play" size={18} /></span> Active Courses
              </h2>
              {activeCourses.length > 0 ? (
                <ul className="space-y-3">
                  {activeCourses.map((c) => {
                    const doneCount = Array.isArray(c.completedModules) ? c.completedModules.length : 0;
                    const pct = c.totalModules ? Math.round((doneCount / c.totalModules) * 100) : null;
                    return (
                      <li key={c.courseId} className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-black/20 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/[0.04]">
                        <Link to={`/course/${c.courseId}`} className="block">
                          <p className="text-xs font-semibold uppercase tracking-wider text-sky">{c.category}</p>
                          <h3 className="mt-1 font-semibold text-ink-hi group-hover:text-white">{c.title}</h3>
                          {pct !== null && (
                            <div className="mt-3">
                              <div className="mb-1 flex justify-between text-[11px] text-ink-low">
                                <span>{doneCount} / {c.totalModules} modules</span>
                                <span className="tabular-nums">{pct}%</span>
                              </div>
                              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                                <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-sky transition-[width] duration-500" style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          )}
                        </Link>
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCourseToUnenroll(c); }}
                          className="absolute right-3 top-3 rounded-lg p-2 text-ink-low transition-all hover:bg-white/[0.08] hover:text-state-danger"
                          title="Unenroll"
                        >
                          <Icon name="trash-2" size={16} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <EmptyState
                  icon="book"
                  title="No active courses"
                  description="You are not actively taking any courses."
                  action={<Button variant="secondary" size="sm" onClick={() => navigate("/courses")}>Browse Catalog</Button>}
                />
              )}
            </Card>

            <div className="flex flex-col gap-6">
              
              {/* Completed Courses */}
              <Card className="p-6 md:p-8">
                <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-ink-hi">
                  <span className="text-green-400"><Icon name="check-circle" size={18} /></span> Completed Courses
                </h2>
                {completedCourses.length > 0 ? (
                  <ul className="space-y-3">
                    {completedCourses.map((c) => (
                      <li key={c.courseId} className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
                        <Link to={`/course/${c.courseId}`} className="block pr-4 flex-grow">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-low">{c.category}</p>
                          <h3 className="mt-1 text-sm font-semibold text-ink-hi group-hover:text-white line-clamp-1">{c.title}</h3>
                        </Link>
                        <div className="flex flex-none items-center gap-2">
                          <span className="flex-none rounded-full bg-green-500/20 px-2 py-1 text-[10px] font-bold text-green-400 uppercase tracking-widest">Done</span>
                          <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCourseToUnenroll(c); }}
                            className="rounded-lg p-2 text-ink-low transition-all hover:bg-white/[0.08] hover:text-state-danger"
                            title="Unenroll"
                          >
                            <Icon name="trash-2" size={16} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-ink-low text-center py-4">You haven&rsquo;t finished any courses yet.</p>
                )}
              </Card>

              {/* Quiz High Scores */}
              <Card className="p-6 md:p-8">
                <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-ink-hi">
                  <span className="text-violet-400"><Icon name="trophy" size={18} /></span> Quiz High Scores
                </h2>
                {totalQuizzes > 0 ? (
                  <ul className="space-y-3">
                    {Object.entries(quizScores).map(([title, score]) => (
                      <li key={title} className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-gradient-to-r from-black/20 to-violet-900/10 p-4 transition-colors hover:border-violet-500/30 hover:bg-violet-500/5">
                        <h3 className="font-semibold text-ink-hi leading-snug">{title}</h3>
                        <div className="flex-none whitespace-nowrap rounded-lg bg-violet-500/20 px-3 py-1.5 text-sm font-extrabold text-violet-300">
                          {score} <span className="text-xs font-semibold text-violet-400/80">pts</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-ink-low text-center py-4">You haven&rsquo;t taken any quizzes yet.</p>
                )}
              </Card>

            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={!!courseToUnenroll}
        onClose={() => setCourseToUnenroll(null)}
        title="Unenroll from course?"
        icon="alert-octagon"
        actionText="Yes, unenroll"
        actionVariant="danger"
        isDestructive={true}
        onAction={handleUnenroll}
        loading={unenrollLoading}
      >
        <p className="mb-4">
          Are you sure you want to unenroll from <strong className="text-white">{courseToUnenroll?.title}</strong>?
        </p>
        <div className="rounded-xl border border-state-danger/20 bg-state-danger/10 p-4 text-sm">
          <div className="flex items-start gap-3 text-state-danger">
            <Icon name="alert-triangle" size={18} className="mt-0.5 flex-none" />
            <div className="leading-relaxed">
              <span className="font-bold">Warning:</span> All progress, quiz scores, and completion history for this course will be permanently deleted. This cannot be undone.
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
