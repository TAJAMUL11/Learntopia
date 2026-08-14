import { db } from "../firebase/firebase";
import { getDoc, doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useGamification } from "../context/GamificationContext";
import { useSound } from "../context/SoundContext";
import { useLanguage } from "../context/LanguageContext";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import Modal from "./ui/Modal";
import EmptyState from "./ui/EmptyState";
import { Skeleton } from "./ui/Skeleton";
import { getLocalizedQuiz } from "../utils/localizationUtils";

// Student dashboard only. The owner/admin has a SEPARATE, hidden portal at
// /admin (Admin.jsx) — admins are redirected there and never see this view.
const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isAdmin, logOut } = useAuth();
  const { xp, levelInfo, badges: gamificationBadges, streak } = useGamification();
  const { playWarningAlert } = useSound();
  const { t } = useLanguage();

  const [userDetails, setUserDetails] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [quizScores, setQuizScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseToUnenroll, setCourseToUnenroll] = useState(null);
  const [unenrollLoading, setUnenrollLoading] = useState(false);

  // Destructive profile deletion states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // The owner is not a student — send them to the dedicated hidden admin portal.
  useEffect(() => {
    if (isAdmin) navigate("/admin", { replace: true });
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!currentUser) {
      setUserDetails(null);
      setEnrolledCourses([]);
      setQuizScores([]);
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

        // Best score per quiz (display only — read, never written from here).
        const best = {};
        quizSnap.forEach((docSnap) => {
          const data = docSnap.data();
          const key = data.quizId || data.quizTitle;
          if (key && (!best[key] || (data.score || 0) > best[key].score)) {
            best[key] = {
              quizId: data.quizId || null,
              title: data.quizTitle || data.title || key,
              score: data.score || 0,
            };
          }
        });
        setQuizScores(Object.values(best));

        // Profile (name / email) for display. XP, total points, streak and badges
        // update LIVE via GamificationContext's real-time listener — the dashboard
        // never writes points here, so there are no races or rejected writes.
        setUserDetails(
          userSnap.exists()
            ? userSnap.data()
            : { email: currentUser.email, fullName: currentUser.displayName }
        );
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
      toast.success(t("toasts.logoutSafe"));
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error(t("toasts.logoutFailed"));
    }
  };

  const handleUnenrollConfirm = async () => {
    if (!courseToUnenroll || !currentUser) return;
    setUnenrollLoading(true);
    try {
      await deleteDoc(doc(db, "Users", currentUser.uid, "enrolledCourses", courseToUnenroll.courseId.toString()));
      setEnrolledCourses((prev) => prev.filter((c) => c.courseId !== courseToUnenroll.courseId));
      toast.success(t("toasts.unenrolledFrom", { title: courseToUnenroll.title }));
      setCourseToUnenroll(null);
    } catch (err) {
      console.error("Error unenrolling:", err);
      toast.error(t("toasts.unenrollFailed"));
    } finally {
      setUnenrollLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (deleteConfirmText.trim().toUpperCase() !== "DELETE") {
      playWarningAlert();
      toast.error(t("toasts.deleteConfirmType"));
      return;
    }

    setDeleteLoading(true);
    try {
      const uid = currentUser.uid;
      await Promise.all([
        deleteDoc(doc(db, "Users", uid)).catch(() => {}),
        deleteDoc(doc(db, "PublicLeaderboard", uid)).catch(() => {}),
      ]);
      await deleteUser(currentUser);
      toast.success(t("toasts.profileDeleted"));
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Profile deletion error:", err);
      toast.error(err.message || "Failed to delete profile. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const activeCourses = useMemo(() => enrolledCourses.filter((c) => !c.completed), [enrolledCourses]);
  const completedCourses = useMemo(() => enrolledCourses.filter((c) => c.completed), [enrolledCourses]);

  if (loading) {
    return (
      <div className="container-page py-8 md:py-12">
        <Card className="p-5 md:p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 flex-none rounded-full" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-5 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
          </div>
        </Card>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container-page py-12">
        <Card className="mx-auto w-full max-w-md p-8">
          <EmptyState
            icon="user"
            title={t("modals.dashNoProfileTitle")}
            description={t("modals.dashNoProfileDesc")}
            action={<Button onClick={() => navigate("/login")}>{t("nav.login")}</Button>}
          />
        </Card>
      </div>
    );
  }

  const METRICS = [
    { icon: "zap", emoji: null, label: t("dashboard.totalXp"), value: xp, tint: "text-violet-300", ring: "border-violet-500/20 bg-violet-500/[0.07]" },
    { icon: null, emoji: "🔥", label: t("dashboard.dayStreak"), value: streak, tint: "text-orange-300", ring: "border-orange-500/20 bg-orange-500/[0.06]" },
    { icon: "book", emoji: null, label: t("dashboard.enrolled"), value: enrolledCourses.length, tint: "text-sky", ring: "border-white/[0.08] bg-white/[0.02]" },
    { icon: "check-circle", emoji: null, label: t("dashboard.completed"), value: completedCourses.length, tint: "text-emerald-400", ring: "border-white/[0.08] bg-white/[0.02]" },
  ];

  return (
    <div className="container-page py-8 text-ink-hi md:py-12">
      <div className="mx-auto max-w-6xl animate-fade-in space-y-6">

        {/* ── Profile header ── */}
        <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent p-5 md:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} referrerPolicy="no-referrer" alt="" className="h-16 w-16 flex-none rounded-full border-2 border-white/20 object-cover shadow-md" />
              ) : (
                <div className="grid h-16 w-16 flex-none place-items-center rounded-full bg-gradient-to-tr from-violet-600 to-sky text-2xl font-bold text-white shadow-glow">
                  {userDetails?.fullName ? userDetails.fullName.charAt(0).toUpperCase() : "S"}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-xl font-bold text-white sm:text-2xl">
                    {userDetails?.fullName || currentUser.displayName || t("dashboard.profile")}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/20 px-2.5 py-0.5 text-xs font-semibold text-violet-300">
                    <span>{levelInfo.icon}</span> {t("dashboard.level")} {levelInfo.level} · {levelInfo.name}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-ink-low">{userDetails?.email}</p>

                {/* XP progress toward next level */}
                <div className="mt-3 max-w-sm">
                  <div className="mb-1 flex justify-between text-[10px] font-semibold text-ink-low">
                    <span>{xp} XP</span>
                    <span>{levelInfo.nextLevel ? `${levelInfo.nextLevel.minXP} XP → ${t("dashboard.level")} ${levelInfo.nextLevel.level}` : t("dashboard.maxLevel")}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky transition-[width] duration-700" style={{ width: `${levelInfo.progressPct}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <Button variant="danger" size="sm" onClick={handleLogout} className="flex-none self-start">
              <Icon name="logout" size={14} /> {t("dashboard.logout")}
            </Button>
          </div>

          {/* Badges */}
          {gamificationBadges.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
              <span className="text-xs font-semibold text-ink-low">{t("dashboard.badges")}</span>
              {gamificationBadges.map((badge, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-300">
                  <span>{badge.emoji || "🏆"}</span> {badge.name}
                </span>
              ))}
            </div>
          )}
        </Card>

        {/* ── Metrics ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} className={`rounded-xl border p-4 ${m.ring}`}>
              <div className={`flex items-center gap-2 text-xs font-semibold ${m.tint}`}>
                {m.emoji ? <span className="text-sm leading-none">{m.emoji}</span> : <Icon name={m.icon} size={16} />}
                {m.label}
              </div>
              <p className="mt-2 text-2xl font-extrabold tabular-nums text-white sm:text-3xl">{m.value}</p>
            </div>
          ))}
        </div>

        {/* ── Content grid ── */}
        <div className="grid items-start gap-6 lg:grid-cols-2">

          {/* Active courses */}
          <Card className="p-5 md:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
              <Icon name="play" size={16} className="text-sky" /> {t("dashboard.activeCourses")}
            </h2>
            {activeCourses.length > 0 ? (
              <ul className="space-y-3">
                {activeCourses.map((c) => {
                  const done = c.completedModules ? c.completedModules.length : 0;
                  const pct = c.totalModules ? Math.round((done / c.totalModules) * 100) : 0;
                  const localizedTitle = t(`courseData.${c.courseId}.title`, c.title);
                  return (
                    <li key={c.courseId} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
                      <div className="flex items-start justify-between gap-3">
                        <p className="min-w-0 font-semibold text-sm text-white">{localizedTitle}</p>
                        <button
                          type="button"
                          onClick={() => setCourseToUnenroll(c)}
                          className="flex-none p-1 text-ink-low transition-colors hover:text-rose-400"
                          title={t("dashboard.unenroll")}
                          aria-label={`Unenroll from ${localizedTitle}`}
                        >
                          <Icon name="trash-2" size={15} />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-9 flex-none text-right text-[11px] font-semibold tabular-nums text-ink-low">{pct}%</span>
                        <Button size="sm" onClick={() => navigate(`/course/${c.courseId}`)}>{t("courses.continueLearning")}</Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <EmptyState
                icon="book"
                title={t("dashboard.noCoursesTitle")}
                description={t("dashboard.noCoursesDesc")}
                action={<Button size="sm" onClick={() => navigate("/courses")}>{t("dashboard.exploreBtn")}</Button>}
                className="py-8"
              />
            )}
          </Card>

          {/* Right column: completed + quiz scores */}
          <div className="space-y-6">
            <Card className="p-5 md:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
                <Icon name="check-circle" size={16} className="text-emerald-400" /> {t("dashboard.completedCourses")}
              </h2>
              {completedCourses.length > 0 ? (
                <ul className="space-y-2.5">
                  {completedCourses.map((c) => {
                    const localizedTitle = t(`courseData.${c.courseId}.title`, c.title);
                    return (
                      <li key={c.courseId} className="flex items-center justify-between gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-white">{localizedTitle}</p>
                        </div>
                        <span className="flex-none rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                          {t("courses.courseCompleted")}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="py-3 text-sm text-ink-low">{t("dashboard.noCoursesTitle")}</p>
              )}
            </Card>

            <Card className="p-5 md:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
                <Icon name="trophy" size={16} className="text-amber-400" /> {t("dashboard.quizHistory")}
              </h2>
              {quizScores.length > 0 ? (
                <ul className="space-y-2.5">
                  {quizScores.map((q) => {
                    const localizedTitle = q.quizId
                      ? getLocalizedQuiz({ id: q.quizId, title: q.title }, t)?.title || q.title
                      : q.title;
                    return (
                      <li key={q.quizId || q.title} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                        <span className="min-w-0 truncate text-sm text-ink">{localizedTitle}</span>
                        <span className="flex-none rounded-lg bg-violet-500/15 px-2.5 py-1 text-xs font-bold tabular-nums text-violet-300">
                          {q.score} <span className="font-medium text-violet-400/80">best</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="py-3 text-sm text-ink-low">{t("dashboard.noQuizTitle")}</p>
              )}
            </Card>
          </div>
        </div>

        {/* ── Danger Zone / Profile Deletion ── */}
        <Card className="border-red-500/20 bg-red-500/[0.02] p-5 md:p-6 mt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
                <Icon name="alert-triangle" size={16} className="text-red-400" />
                {t("dashboard.dangerZoneTitle")}
              </h3>
              <p className="text-xs text-ink-low mt-1 leading-relaxed max-w-xl">
                {t("dashboard.dangerZoneDesc")}
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                playWarningAlert();
                setShowDeleteModal(true);
              }}
              className="flex-none self-start sm:self-center border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-300"
            >
              <Icon name="trash-2" size={14} />
              {t("dashboard.deleteProfileBtn")}
            </Button>
          </div>
        </Card>
      </div>

      {/* Unenroll confirmation */}
      {courseToUnenroll && (
        <Modal 
          isOpen={!!courseToUnenroll} 
          onClose={() => setCourseToUnenroll(null)} 
          title={t("dashboard.unenrollModalTitle")}
          onAction={handleUnenrollConfirm}
          actionText={t("dashboard.unenrollBtn")}
          actionVariant="danger"
          loading={unenrollLoading}
        >
          <p className="text-sm text-ink-low">
            {t("dashboard.unenrollModalText", { title: courseToUnenroll.title })}
          </p>
        </Modal>
      )}

      {/* Delete Profile Destructive Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            if (!deleteLoading) {
              setShowDeleteModal(false);
              setDeleteConfirmText("");
            }
          }}
          title={t("dashboard.deleteModalTitle")}
          icon="alert-octagon"
          isDestructive={true}
          onAction={handleDeleteProfile}
          actionText={t("dashboard.deleteConfirmBtn")}
          actionVariant="danger"
          loading={deleteLoading}
          actionDisabled={deleteConfirmText.trim().toUpperCase() !== "DELETE"}
        >
          <div className="space-y-4">
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs leading-relaxed text-red-200">
              <p className="font-bold text-red-300 mb-1 flex items-center gap-1.5">
                {t("dashboard.deleteWarningTitle")}
              </p>
              <p>
                {t("dashboard.deleteWarningText")}
              </p>
            </div>

            <div className="space-y-2 text-xs text-ink-low">
              <p className="font-semibold text-ink-hi text-xs uppercase tracking-wider">{t("dashboard.deleteListHeading")}</p>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-center gap-2 text-red-300">
                  <Icon name="x-circle" size={14} className="text-red-400 flex-none" /> {t("dashboard.deleteList1")}
                </li>
                <li className="flex items-center gap-2 text-red-300">
                  <Icon name="x-circle" size={14} className="text-red-400 flex-none" /> {t("dashboard.deleteList2")}
                </li>
                <li className="flex items-center gap-2 text-red-300">
                  <Icon name="x-circle" size={14} className="text-red-400 flex-none" /> {t("dashboard.deleteList3")}
                </li>
                <li className="flex items-center gap-2 text-red-300">
                  <Icon name="x-circle" size={14} className="text-red-400 flex-none" /> {t("dashboard.deleteList4")}
                </li>
                <li className="flex items-center gap-2 text-red-300">
                  <Icon name="x-circle" size={14} className="text-red-400 flex-none" /> {t("dashboard.deleteList5")}
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-white/10">
              <label className="block text-xs font-semibold text-ink-hi mb-1.5">
                {t("dashboard.deleteConfirmLabel", { keyword: "" })} <span className="text-red-400 font-mono font-bold">DELETE</span>
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={t("dashboard.deleteConfirmPlaceholder")}
                disabled={deleteLoading}
                className="w-full rounded-lg border border-red-500/30 bg-white/5 px-3 py-2 text-xs font-mono text-white placeholder-ink-low/40 focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;

