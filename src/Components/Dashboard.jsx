import { db } from "../firebase/firebase";
import { getDoc, doc, collection, getDocs, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useGamification } from "../context/GamificationContext";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import EmptyState from "./ui/EmptyState";
import { Skeleton } from "./ui/Skeleton";
import Modal from "./ui/Modal";

// Student dashboard only. The owner/admin has a SEPARATE, hidden portal at
// /admin (Admin.jsx) — admins are redirected there and never see this view.
const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isAdmin, logOut } = useAuth();
  const { xp, levelInfo, badges: gamificationBadges } = useGamification();

  const [userDetails, setUserDetails] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseToUnenroll, setCourseToUnenroll] = useState(null);
  const [unenrollLoading, setUnenrollLoading] = useState(false);

  // The owner is not a student — send them to the dedicated hidden admin portal.
  useEffect(() => {
    if (isAdmin) navigate("/admin", { replace: true });
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!currentUser) {
      setUserDetails(null);
      setEnrolledCourses([]);
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
          getDocs(quizRef),
        ]);

        const courses = [];
        coursesSnap.forEach((docSnap) => courses.push({ id: docSnap.id, ...docSnap.data() }));
        setEnrolledCourses(courses);

        let calculatedTotalPoints = 0;
        quizSnap.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.score) calculatedTotalPoints += data.score * 10;
        });

        if (userSnap.exists()) {
          const uData = userSnap.data();
          if (uData.totalPoints === undefined || uData.totalPoints !== calculatedTotalPoints) {
            await updateDoc(userRef, { totalPoints: calculatedTotalPoints });
            setUserDetails({ ...uData, totalPoints: calculatedTotalPoints });
          } else {
            setUserDetails(uData);
          }
        } else {
          setUserDetails({
            email: currentUser.email,
            fullName: currentUser.displayName,
            totalPoints: calculatedTotalPoints,
          });
        }

        // Public leaderboard mirror — DISPLAY data only (NO email). Never for admin.
        if (!isAdmin) {
          const publicRef = doc(db, "PublicLeaderboard", currentUser.uid);
          await setDoc(
            publicRef,
            {
              uid: currentUser.uid,
              fullName: (userSnap.exists() && userSnap.data()?.fullName) || currentUser.displayName || "Learner",
              totalPoints: calculatedTotalPoints,
              streak: (userSnap.exists() && userSnap.data()?.streak) || 1,
              badges: (userSnap.exists() && userSnap.data()?.badges) || ["Newcomer"],
              updatedAt: new Date(),
            },
            { merge: true }
          ).catch(() => {});
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, isAdmin]);

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
      setEnrolledCourses((prev) => prev.filter((c) => c.courseId !== courseToUnenroll.courseId));
      toast.success(`Successfully unenrolled from ${courseToUnenroll.title}`);
      setCourseToUnenroll(null);
    } catch (err) {
      console.error("Error unenrolling:", err);
      toast.error("Failed to unenroll. Please try again.");
    } finally {
      setUnenrollLoading(false);
    }
  };

  const activeCourses = useMemo(() => enrolledCourses.filter((c) => !c.completed), [enrolledCourses]);
  const completedCourses = useMemo(() => enrolledCourses.filter((c) => c.completed), [enrolledCourses]);

  if (loading) {
    return (
      <div className="container-page py-12 text-center">
        <Card className="mx-auto w-full max-w-xl p-6 text-center">
          <Skeleton className="mx-auto mb-4 h-16 w-16 rounded-full" />
          <Skeleton className="mx-auto mb-2 h-5 w-32" />
          <Skeleton className="mx-auto mb-4 h-3 w-48" />
        </Card>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container-page py-12">
        <Card className="mx-auto w-full max-w-md p-6">
          <EmptyState
            icon="user"
            title="No active profile"
            description="Please log in to view your dashboard."
            action={<Button onClick={() => navigate("/login")}>Log in now</Button>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="container-page py-6 md:py-10 text-ink-hi font-sans">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-6 animate-fade-in">
          {/* Student Profile Header */}
          <Card className="p-4 sm:p-6 border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-ground-900">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} referrerPolicy="no-referrer" alt="Profile" className="h-14 w-14 sm:h-16 sm:w-16 flex-none rounded-full border-2 border-white/20 shadow-md" />
                ) : (
                  <div className="grid h-14 w-14 sm:h-16 sm:w-16 flex-none place-items-center rounded-full bg-gradient-to-tr from-violet-600 to-sky text-xl sm:text-2xl font-bold text-white">
                    {userDetails?.fullName ? userDetails.fullName.charAt(0).toUpperCase() : "S"}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-lg sm:text-xl font-bold text-white">
                      {userDetails?.fullName || currentUser.displayName || "Student"}
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/20 px-2.5 py-0.5 text-xs font-semibold text-violet-300">
                      <span>{levelInfo.icon}</span> Lvl {levelInfo.level}: {levelInfo.name}
                    </span>
                  </div>
                  <p className="text-xs text-ink-low mt-0.5">{userDetails?.email}</p>

                  {/* Progress Bar */}
                  <div className="mt-2 w-full max-w-xs sm:max-w-sm">
                    <div className="flex justify-between text-[10px] font-semibold text-ink-low mb-1">
                      <span>{xp} XP</span>
                      <span>{levelInfo.nextLevel ? `${levelInfo.nextLevel.minXP} XP (Lvl ${levelInfo.nextLevel.level})` : "Max Level!"}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky transition-[width] duration-500"
                        style={{ width: `${levelInfo.progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="danger" size="sm" onClick={handleLogout} className="self-start sm:self-center">
                <Icon name="logout" size={14} /> Log out
              </Button>
            </div>

            {/* Badges Row */}
            {gamificationBadges.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-ink-low">Badges:</span>
                {gamificationBadges.map((badge, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-300">
                    <span>{badge.emoji || "🏆"}</span> {badge.name}
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-3.5">
              <div className="flex items-center gap-2 text-violet-300 text-xs font-semibold">
                <Icon name="zap" size={16} /> Total XP
              </div>
              <p className="mt-1.5 text-2xl font-bold text-white">{xp} <span className="text-xs font-normal text-violet-300">XP</span></p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2 text-sky text-xs font-semibold">
                <Icon name="book" size={16} /> Enrolled
              </div>
              <p className="mt-1.5 text-2xl font-bold text-white">{enrolledCourses.length}</p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <Icon name="check" size={16} /> Completed
              </div>
              <p className="mt-1.5 text-2xl font-bold text-white">{completedCourses.length}</p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <Icon name="award" size={16} /> Badges
              </div>
              <p className="mt-1.5 text-2xl font-bold text-white">{gamificationBadges.length}</p>
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <Card className="p-5">
              <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
                <Icon name="play" size={16} className="text-sky" /> Active Courses
              </h2>
              {activeCourses.length > 0 ? (
                <ul className="space-y-2.5">
                  {activeCourses.map((c) => {
                    const completedCount = c.completedModules ? c.completedModules.length : 0;
                    const pct = c.totalModules ? Math.round((completedCount / c.totalModules) * 100) : 0;
                    return (
                      <li key={c.courseId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-white">{c.title}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                              <div className="h-full bg-sky" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-[11px] text-ink-low">{pct}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <Button size="sm" onClick={() => navigate(`/course/${c.courseId}`)}>
                            Resume
                          </Button>
                          <button
                            type="button"
                            onClick={() => setCourseToUnenroll(c)}
                            className="p-1.5 text-ink-low hover:text-rose-400 transition-colors"
                            title="Unenroll course"
                          >
                            <Icon name="trash-2" size={14} />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="py-3 text-xs text-ink-low">No active courses. Explore catalog to start learning!</p>
              )}
            </Card>

            <Card className="p-5">
              <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
                <Icon name="check-circle" size={16} className="text-emerald-400" /> Completed Courses
              </h2>
              {completedCourses.length > 0 ? (
                <ul className="space-y-2.5">
                  {completedCourses.map((c) => (
                    <li key={c.courseId} className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-white">{c.title}</p>
                        <p className="text-[11px] text-emerald-400 font-medium">Completed 🏆</p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => navigate(`/course/${c.courseId}`)}>
                        Review
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-3 text-xs text-ink-low">No completed courses yet.</p>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Unenroll Modal */}
      {courseToUnenroll && (
        <Modal isOpen={!!courseToUnenroll} onClose={() => setCourseToUnenroll(null)} title="Unenroll Course">
          <p className="text-xs text-ink-low">Are you sure you want to unenroll from {courseToUnenroll.title}? Progress will be reset.</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setCourseToUnenroll(null)}>Cancel</Button>
            <Button variant="danger" size="sm" loading={unenrollLoading} onClick={handleUnenroll}>Unenroll</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
