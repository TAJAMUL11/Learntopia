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
import Avatar from "./Avatar";
import EditProfileView from "./EditProfileView";
import { parseProfileName } from "../utils/profileUtils";
import { COURSES } from "../data/coursesData";

const PREVIEW_LIMIT = 3;
const DAILY_XP_TARGET = 100;

// Helper to look up official course thumbnail image from coursesData
const getCourseImage = (courseId) => {
  const match = COURSES.find((c) => c.id === Number(courseId));
  return match?.image || null;
};

// Helper to get course category
const getCourseCategory = (courseId) => {
  const match = COURSES.find((c) => c.id === Number(courseId));
  return match?.category || "General";
};

// Smooth Animated Number Counter component
const AnimatedNumber = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    if (target === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * target);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [value]);

  return <span>{displayValue}{suffix}</span>;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isAdmin, logOut } = useAuth();
  const {
    xp, levelInfo, badges: gamificationBadges, streak,
    profile, photoURL, usePhoto,
  } = useGamification();
  const { playWarningAlert, playClick } = useSound();
  const { t } = useLanguage();

  // ── state ─────────────────────────────────────────────────────────────────
  const [userDetails, setUserDetails] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [quizScores, setQuizScores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active Sub-Tab: "overview" | "courses" | "completed" | "quizzes"
  const [activeTab, setActiveTab] = useState("overview");

  // Modals & Actions
  const [courseToUnenroll, setCourseToUnenroll] = useState(null);
  const [unenrollLoading, setUnenrollLoading] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  // Destructive profile deletion
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Sync userDetails with profile from GamificationContext
  useEffect(() => {
    if (profile) setUserDetails((prev) => ({ ...prev, ...profile }));
  }, [profile]);

  // Admin redirect
  useEffect(() => {
    if (isAdmin) navigate("/admin", { replace: true });
  }, [isAdmin, navigate]);

  // Fetch Firestore data
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
          getDoc(userRef), getDocs(coursesRef), getDocs(quizRef),
        ]);

        const courses = [];
        coursesSnap.forEach((d) => courses.push({ id: d.id, ...d.data() }));
        setEnrolledCourses(courses);

        const best = {};
        quizSnap.forEach((d) => {
          const data = d.data();
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

  // Handlers
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
      await deleteDoc(
        doc(db, "Users", currentUser.uid, "enrolledCourses", courseToUnenroll.courseId.toString())
      );
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

  // Derived datasets
  const activeCourses = useMemo(() => enrolledCourses.filter((c) => !c.completed), [enrolledCourses]);
  const completedCourses = useMemo(() => enrolledCourses.filter((c) => c.completed), [enrolledCourses]);
  const previewCourses = useMemo(() => activeCourses.slice(0, PREVIEW_LIMIT), [activeCourses]);
  const previewCompleted = useMemo(() => completedCourses.slice(0, PREVIEW_LIMIT), [completedCourses]);
  const previewQuizzes = useMemo(() => quizScores.slice(0, PREVIEW_LIMIT), [quizScores]);
  const spotlightCourse = useMemo(() => activeCourses[0] || null, [activeCourses]);

  const memberSince = useMemo(() => {
    if (userDetails?.createdAt?.toDate) {
      return userDetails.createdAt.toDate().toLocaleDateString(undefined, { month: "short", year: "numeric" });
    }
    if (currentUser?.metadata?.creationTime) {
      return new Date(currentUser.metadata.creationTime).toLocaleDateString(undefined, { month: "short", year: "numeric" });
    }
    return null;
  }, [userDetails, currentUser]);

  const { displayName: parsedDisplayName, avatarId: parsedAvatarId } = parseProfileName(
    userDetails || profile,
    currentUser?.displayName || "Learner"
  );

  const studentName = parsedDisplayName || userDetails?.fullName || currentUser?.displayName || "Learner";

  // Days of week for daily streak visual tracker
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const currentDayIndex = (new Date().getDay() + 6) % 7;

  // Daily XP target calculation
  const todayXp = Math.min(xp % DAILY_XP_TARGET, DAILY_XP_TARGET);
  const todayXpPct = Math.round((todayXp / DAILY_XP_TARGET) * 100);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="container-page py-10 md:py-14 space-y-6">
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-5">
            <Skeleton className="h-20 w-20 flex-none rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
              <Skeleton className="mt-2 h-2.5 w-full max-w-sm" />
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="lg:col-span-2 h-52 rounded-2xl" />
          <Skeleton className="h-52 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Unauthenticated
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

  // Dedicated Edit Profile view — opened from the "Edit Profile" button at the
  // top of the dashboard. It replaces the dashboard body (with a Back link) and
  // is NOT one of the content sub-tabs.
  if (editingProfile) {
    return (
      <EditProfileView
        onBack={() => setEditingProfile(false)}
        initialName={parsedDisplayName || ""}
        initialAvatar={parsedAvatarId || null}
        initialUsePhoto={usePhoto}
      />
    );
  }

  // Pro Metric Capsule Config — core palette only (violet primary, sky secondary).
  // Cooler icon chips use a soft gradient with an inner highlight for depth.
  const METRICS = [
    {
      iconName: "zap",
      label: t("dashboard.totalXp"),
      rawValue: xp,
      suffix: " XP",
      accent: "text-violet-400",
      iconBg: "bg-gradient-to-br from-violet-500/30 to-violet-500/[0.06] border-violet-500/30 text-violet-300",
    },
    {
      iconName: "flame",
      label: t("dashboard.dayStreak"),
      rawValue: streak,
      suffix: streak === 1 ? " Day" : " Days",
      accent: "text-violet-400",
      iconBg: "bg-gradient-to-br from-violet-500/30 to-violet-500/[0.06] border-violet-500/30 text-violet-300",
    },
    {
      iconName: "book-open",
      label: t("dashboard.enrolled"),
      rawValue: enrolledCourses.length,
      suffix: "",
      accent: "text-sky",
      iconBg: "bg-gradient-to-br from-sky/30 to-sky/[0.06] border-sky/30 text-sky",
      onClickTab: "courses",
    },
    {
      iconName: "award",
      label: t("dashboard.completed"),
      rawValue: completedCourses.length,
      suffix: "",
      accent: "text-sky",
      iconBg: "bg-gradient-to-br from-sky/30 to-sky/[0.06] border-sky/30 text-sky",
      onClickTab: "completed",
    },
  ];

  // Visual Course Card renderer (3-tier clean layout)
  const renderCourseCard = (c) => {
    const done = c.completedModules ? c.completedModules.length : 0;
    const total = c.totalModules || 4;
    const pct = Math.round((done / total) * 100);
    const localizedTitle = t(`courseData.${c.courseId}.title`, c.title);
    const img = getCourseImage(c.courseId);
    const category = getCourseCategory(c.courseId);

    return (
      <div
        key={c.courseId}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-500/35 hover:bg-white/[0.04] hover:shadow-card"
      >
        {/* Tier 1: Category Tag + Trash Icon */}
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-3">
          <span className="inline-block rounded-md bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-300 border border-violet-500/20">
            {category}
          </span>

          <button
            type="button"
            onClick={() => setCourseToUnenroll(c)}
            className="flex-none rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-rose-500/10 hover:text-rose-400"
            title={t("dashboard.unenroll")}
            aria-label={`Unenroll from ${localizedTitle}`}
          >
            <Icon name="trash-2" size={15} />
          </button>
        </div>

        {/* Tier 2: Thumbnail Image + Full 2-Line Title + Step Progress */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 mb-4 min-w-0">
          {img ? (
            <img
              src={img}
              alt=""
              className="h-14 w-14 sm:h-12 sm:w-12 flex-none rounded-xl border border-white/10 object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-14 w-14 sm:h-12 sm:w-12 flex-none items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500 to-violet-700 text-white font-black text-lg shadow-[0_6px_16px_rgba(109,66,190,0.30),inset_0_1px_0_rgba(255,255,255,0.15)]">
              {category.charAt(0)}
            </div>
          )}

          <div className="min-w-0 flex-1 w-full">
            <h3 className="line-clamp-2 text-balance text-sm font-bold leading-snug text-ink-hi group-hover:text-violet-300 transition-colors text-center sm:text-left">
              {localizedTitle}
            </h3>
            <p className="mt-1 text-xs text-ink-low font-medium text-center sm:text-left">
              {t("dashboard.stepCounter", { current: done, total })}
              <span className="mx-1.5 text-ink-faint">·</span>
              <span className="font-bold text-violet-400">{pct}%</span>
            </p>
          </div>
        </div>

        {/* Tier 3: Full-width Progress Bar + Full-width Continue Button */}
        <div className="space-y-3 border-t border-white/[0.06] pt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-sky transition-[width] duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <Button
            size="sm"
            fullWidth
            onClick={() => navigate(`/course/${c.courseId}`)}
            className="font-bold shadow-glow"
          >
            {t("courses.continueLearning")} ⚡
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container-page py-10 text-ink-hi md:py-14">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* ── Incomplete Profile Warning Banner ────────────────────────────── */}
        {(!parsedDisplayName || !parsedAvatarId) && (
          <div className="animate-fade-up flex flex-col gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:flex-row sm:items-center sm:justify-between shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <Icon name="sparkles" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-200">{t("profileSetup.setupBannerTitle")}</p>
                <p className="mt-0.5 text-xs text-amber-200/80">{t("profileSetup.setupBannerDesc")}</p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setEditingProfile(true)}
              className="flex-none bg-amber-400 text-slate-950 font-bold border-none hover:bg-amber-300"
            >
              {t("profileSetup.setupBannerBtn")}
            </Button>
          </div>
        )}

        {/* ── ROW 1 — Clean Profile Header Banner ──────────────────────────── */}
        <Card className="animate-fade-up relative overflow-hidden border-violet-500/25 bg-gradient-to-r from-violet-700/20 via-violet-600/10 to-sky/15 p-5 sm:p-8 shadow-card">
          <div className="relative z-10 flex flex-col gap-5 sm:gap-6 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">

            {/* Avatar & Identity */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 min-w-0">
              <div className="relative flex-none">
                <Avatar
                  avatarId={parsedAvatarId}
                  photoURL={usePhoto ? photoURL : null}
                  size={76}
                  name={studentName}
                  className="rounded-2xl border-2 border-violet-500/35 shadow-glow"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                {/* Title & Level Badge */}
                <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-3">
                  <h1 className="truncate text-2xl font-extrabold sm:text-3xl text-ink-hi tracking-tight">
                    {studentName}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-300 shadow-sm">
                    {levelInfo.icon} {t("dashboard.level")} {levelInfo.level} · {levelInfo.name}
                  </span>
                </div>

                {/* Details: Member since · Active status (email now lives in Edit Profile) */}
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-ink-low">
                  {memberSince && (
                    <span>{t("dashboard.memberSince", { date: memberSince })}</span>
                  )}
                  {memberSince && <span className="hidden sm:inline text-ink-faint">·</span>}
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold mt-0.5 sm:mt-0">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                    </span>
                    {t("dashboard.activeToday")}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: 2-column grid on mobile */}
            <div className="grid grid-cols-2 sm:flex items-center gap-2.5 w-full sm:w-auto flex-none">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingProfile(true)}
                className="text-xs border-white/10 hover:bg-white/10 w-full justify-center"
              >
                <Icon name="edit-3" size={14} /> {t("profileSetup.editBtn")}
              </Button>
              <Button variant="danger" size="sm" onClick={handleLogout} className="text-xs w-full justify-center">
                <Icon name="logout" size={14} /> {t("dashboard.logout")}
              </Button>
            </div>
          </div>

          {/* Trophy & Badge Shelf */}
          {gamificationBadges.length > 0 && (
            <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-2 border-t border-white/[0.08] pt-4">
              <span className="mr-2 text-xs font-bold uppercase tracking-wider text-ink-low/70 w-full sm:w-auto text-center sm:text-left mb-1 sm:mb-0">
                {t("dashboard.badges")}
              </span>
              {gamificationBadges.map((badge, idx) => {
                const bName = typeof badge === "string" ? badge : badge.name || "Badge";
                const bEmoji = typeof badge === "object" && badge.emoji ? badge.emoji : "🏆";
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-ink-hi shadow-sm"
                  >
                    <span>{bEmoji}</span>
                    <span>{bName}</span>
                  </span>
                );
              })}
            </div>
          )}
        </Card>

        {/* ── ROW 2 — Pro 4 Metric Capsules (Positioned directly under Header) ── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {METRICS.map((m, i) => (
            <Card
              key={m.label}
              onClick={() => {
                if (m.onClickTab) {
                  playClick();
                  setActiveTab(m.onClickTab);
                }
              }}
              className={`animate-fade-up border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5 text-center flex flex-col items-center justify-center transition-all duration-200 ${m.onClickTab ? "cursor-pointer hover:bg-white/[0.04] hover:border-violet-500/30 hover:-translate-y-0.5" : ""}`}
              style={{ animationDelay: `${0.04 + i * 0.04}s` }}
            >
              <div className={`mb-2 flex h-11 w-11 items-center justify-center rounded-xl border ${m.iconBg} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`}>
                <Icon name={m.iconName} size={20} />
              </div>
              <span className="text-xs font-bold text-ink-low">{m.label}</span>
              <p className={`mt-1.5 text-2xl sm:text-3xl font-black tabular-nums ${m.accent}`}>
                <AnimatedNumber value={m.rawValue} suffix={m.suffix} />
              </p>
            </Card>
          ))}
        </div>

        {/* ── DASHBOARD SUB-NAVIGATION BAR (Mobile 2-Col Grid) ─────────────────── */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center border-b border-white/[0.08] pb-3">
          {[
            { id: "overview", label: "Overview" },
            { id: "courses", label: `Enrolled Courses (${activeCourses.length})` },
            { id: "completed", label: `Completed (${completedCourses.length})` },
            { id: "quizzes", label: `Quiz History (${quizScores.length})` },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab(tab.id);
                }}
                className={`w-full sm:w-auto rounded-xl px-2.5 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs font-bold transition-all duration-200 text-center ${
                  isActive
                    ? "bg-violet-600 text-white shadow-glow border border-violet-400/30"
                    : "bg-white/[0.03] text-ink-low hover:bg-white/[0.07] hover:text-ink-hi border border-white/[0.06]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SUB-TAB CONTENT VIEWS
            ══════════════════════════════════════════════════════════════════ */}

        {/* ── TAB 1: OVERVIEW ────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* Spotlight & Daily Goal Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left 2 Cols: Continue Learning Spotlight */}
              <div className="lg:col-span-2">
                <Card className="h-full border-sky/25 bg-gradient-to-r from-sky/20 via-violet-700/15 to-transparent p-6 shadow-card flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 border-b border-white/[0.08] pb-3">
                      <h2 className="flex items-center gap-2.5 text-sm font-extrabold text-sky">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-sky/15 text-sky border border-sky/30">
                          <Icon name="zap" size={14} />
                        </span>
                        {t("dashboard.spotlightTitle")}
                      </h2>
                      <span className="flex-none rounded-full bg-sky/10 px-2.5 py-0.5 text-[11px] font-bold text-sky border border-sky/20">
                        Active Focus
                      </span>
                    </div>

                    {spotlightCourse ? (
                      <div className="mt-4 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                        {getCourseImage(spotlightCourse.courseId) ? (
                          <img
                            src={getCourseImage(spotlightCourse.courseId)}
                            alt=""
                            className="h-24 w-24 flex-none rounded-2xl border border-white/10 object-cover shadow-md"
                          />
                        ) : (
                          <div className="flex h-24 w-24 flex-none items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-sky to-violet-600 text-white text-3xl shadow-[0_8px_20px_rgba(109,66,190,0.30),inset_0_1px_0_rgba(255,255,255,0.15)]">
                            ⚡
                          </div>
                        )}

                        <div className="flex-1 space-y-1.5 w-full">
                          <span className="inline-block rounded-md bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-300 border border-violet-500/20">
                            {getCourseCategory(spotlightCourse.courseId)}
                          </span>
                          <h3 className="text-lg font-extrabold text-ink-hi leading-snug text-center sm:text-left">
                            {t(`courseData.${spotlightCourse.courseId}.title`, spotlightCourse.title)}
                          </h3>
                          <p className="text-xs text-ink-low font-medium text-center sm:text-left">
                            {t("dashboard.stepCounter", {
                              current: spotlightCourse.completedModules ? spotlightCourse.completedModules.length : 0,
                              total: spotlightCourse.totalModules || 4,
                            })}
                            <span className="mx-1.5 text-ink-faint">·</span>
                            <span className="font-bold text-sky">
                              {Math.round(
                                ((spotlightCourse.completedModules ? spotlightCourse.completedModules.length : 0) /
                                  (spotlightCourse.totalModules || 4)) *
                                  100
                              )}% Completed
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 text-center">
                        <p className="text-xs text-ink-low">{t("dashboard.noCoursesDesc")}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.06] pt-4 gap-3">
                    {spotlightCourse ? (
                      <>
                        <div className="flex-1 w-full sm:max-w-xs sm:mr-4">
                          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-sky to-violet-500 transition-[width] duration-700 ease-out"
                              style={{
                                width: `${Math.round(
                                  ((spotlightCourse.completedModules ? spotlightCourse.completedModules.length : 0) /
                                    (spotlightCourse.totalModules || 4)) *
                                    100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                        <Button
                          onClick={() => navigate(`/course/${spotlightCourse.courseId}`)}
                          className="w-full sm:w-auto font-bold shadow-glow text-sm px-6 py-2.5"
                        >
                          {t("dashboard.resumeModule")}
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => navigate("/courses")} className="w-full sm:w-auto font-bold shadow-glow">
                        {t("dashboard.exploreBtn")} →
                      </Button>
                    )}
                  </div>
                </Card>
              </div>

              {/* Right 1 Col: Daily XP Goal Widget */}
              <div>
                <Card className="h-full border-violet-500/25 bg-gradient-to-b from-violet-700/20 via-violet-700/10 to-transparent p-6 shadow-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <h2 className="flex items-center gap-2 text-sm font-extrabold text-violet-400">
                        <Icon name="flame" size={16} /> {t("dashboard.dailyGoalTitle")}
                      </h2>
                      <span className="font-bold text-xs text-violet-300">
                        🔥 {streak} {streak === 1 ? "Day" : "Days"}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-black text-ink-hi tabular-nums">
                          {t("dashboard.dailyGoalProgress", { current: todayXp, target: DAILY_XP_TARGET })}
                        </span>
                        <span className="text-xs font-bold text-violet-400">{todayXpPct}%</span>
                      </div>

                      <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 p-0.5 border border-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-[width] duration-700 ease-out"
                          style={{ width: `${todayXpPct}%` }}
                        />
                      </div>

                      <div className="pt-2">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-ink-low">
                          Weekly Activity Tracker
                        </p>
                        <div className="flex items-center justify-between gap-1">
                          {daysOfWeek.map((day, idx) => {
                            const isActive = idx <= currentDayIndex && streak > 0;
                            const isToday = idx === currentDayIndex;
                            return (
                              <div
                                key={idx}
                                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                                  isToday
                                    ? "border-2 border-violet-400 bg-violet-500/25 text-violet-300 shadow-sm scale-105"
                                    : isActive
                                    ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                                    : "bg-white/[0.03] text-ink-faint border border-white/[0.05]"
                                }`}
                              >
                                {day}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-[11px] text-ink-low italic border-t border-white/[0.06] pt-3">
                    💡 Tip: Complete 1 module or quiz daily to maintain your streak bonus!
                  </p>
                </Card>
              </div>
            </div>

            {/* Enrolled Courses Grid (Max 3 Preview) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3">
                <h2 className="flex items-center gap-2.5 text-base font-extrabold text-ink-hi">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300 border border-violet-500/30">
                    <Icon name="book-open" size={15} />
                  </span>
                  {t("dashboard.activeCourses")}
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-bold text-violet-300">
                    {activeCourses.length}
                  </span>
                </h2>

                {activeCourses.length > PREVIEW_LIMIT && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("courses")}
                    className="text-xs font-bold text-sky hover:text-sky/80 transition-colors"
                  >
                    {t("dashboard.viewAllCourses", { count: activeCourses.length })}
                  </button>
                )}
              </div>

              {activeCourses.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {previewCourses.map((c) => renderCourseCard(c))}
                </div>
              ) : (
                <Card className="p-8 text-center border-white/10">
                  <EmptyState
                    icon="book-open"
                    title={t("dashboard.noCoursesTitle")}
                    description={t("dashboard.noCoursesDesc")}
                    action={
                      <Button onClick={() => navigate("/courses")} className="mt-2 font-bold shadow-glow">
                        {t("dashboard.exploreBtn")} →
                      </Button>
                    }
                  />
                </Card>
              )}
            </div>

            {/* Completed Courses & Quiz History Split Grid (Max 3 Preview Each) */}
            <div className="grid gap-6 lg:grid-cols-2">

              {/* Completed Courses Showcase */}
              <Card className="p-5 sm:p-6 border-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3 border-b border-white/[0.08] pb-3.5">
                  <h2 className="flex items-center gap-2.5 text-base font-extrabold text-ink-hi">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky/10 text-sky border border-sky/20">
                      <Icon name="check-circle" size={15} />
                    </span>
                    {t("dashboard.completedCourses")}
                    <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-bold text-sky">
                      {completedCourses.length}
                    </span>
                  </h2>

                  {completedCourses.length > PREVIEW_LIMIT && (
                    <button
                      type="button"
                      onClick={() => setActiveTab("completed")}
                      className="text-xs font-bold text-sky hover:text-sky transition-colors"
                    >
                      {t("dashboard.viewAllCompletedCourses", { count: completedCourses.length })}
                    </button>
                  )}
                </div>

                <div className="mt-4">
                  {completedCourses.length > 0 ? (
                    <div className="space-y-3">
                      {previewCompleted.map((c) => {
                        const localizedTitle = t(`courseData.${c.courseId}.title`, c.title);
                        return (
                          <div
                            key={c.courseId}
                            className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3 rounded-xl border border-sky/25 bg-sky/[0.05] p-3.5"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-xl">🏆</span>
                              <p className="min-w-0 text-sm font-bold text-ink-hi text-center sm:text-left">{localizedTitle}</p>
                            </div>
                            <span className="flex-none rounded-full border border-sky/30 bg-sky/20 px-3 py-1 text-xs font-bold text-sky">
                              {t("courses.courseCompleted")}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-violet-500/[0.05] to-transparent p-6 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 shadow-glow">
                        <Icon name="trophy" size={24} className="text-violet-400" />
                      </div>
                      <h3 className="text-base font-extrabold text-ink-hi text-balance max-w-[340px] mx-auto leading-snug">
                        {t("dashboard.motivationalCompletedTitle")}
                      </h3>
                      <Button
                        size="sm"
                        onClick={() => navigate("/courses")}
                        className="mt-4 font-bold shadow-glow"
                      >
                        {t("dashboard.exploreBtn")} →
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Quiz High Scores Hub */}
              <Card className="p-5 sm:p-6 border-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3 border-b border-white/[0.08] pb-3.5">
                  <h2 className="flex items-center gap-2.5 text-base font-extrabold text-ink-hi">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      <Icon name="trophy" size={15} />
                    </span>
                    {t("dashboard.quizHistory")}
                  </h2>

                  {quizScores.length > PREVIEW_LIMIT ? (
                    <button
                      type="button"
                      onClick={() => setActiveTab("quizzes")}
                      className="text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      {t("dashboard.viewAllQuizzes", { count: quizScores.length })}
                    </button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate("/quiz")}
                      className="text-xs text-violet-400 hover:text-violet-300 font-bold"
                    >
                      {t("dashboard.takeNewQuizBtn")}
                    </Button>
                  )}
                </div>

                <div className="mt-4">
                  {quizScores.length > 0 ? (
                    <div className="space-y-2.5">
                      {previewQuizzes.map((q) => {
                        const localizedTitle = q.quizId
                          ? getLocalizedQuiz({ id: q.quizId, title: q.title }, t)?.title || q.title
                          : q.title;
                        return (
                          <div
                            key={q.quizId || q.title}
                            className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors hover:bg-white/[0.04]"
                          >
                            <span className="min-w-0 text-sm font-semibold text-ink-hi text-center sm:text-left">{localizedTitle}</span>
                            <span className="flex-none rounded-lg border border-violet-500/30 bg-violet-500/15 px-2.5 py-1 text-xs font-extrabold text-violet-300">
                              {q.score} <span className="text-[10px] font-normal text-violet-400/80">best</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-xs text-ink-low">{t("dashboard.noQuizDesc")}</p>
                      <Button
                        size="sm"
                        onClick={() => navigate("/quiz")}
                        className="mt-3 font-bold"
                      >
                        {t("dashboard.takeNewQuizBtn")}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ── TAB 2: ALL ENROLLED COURSES ─────────────────────────────────── */}
        {activeTab === "courses" && (
          <Card className="p-5 sm:p-8 animate-fade-in border-violet-500/20">
            <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 border-b border-white/[0.08] pb-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-ink-hi flex items-center justify-center sm:justify-start gap-2">
                  <Icon name="book-open" className="text-sky" size={20} />
                  {t("dashboard.allEnrolledTitle")} ({activeCourses.length})
                </h2>
                <p className="mt-1 text-xs text-ink-low">{t("dashboard.allEnrolledDesc")}</p>
              </div>
              <Button onClick={() => navigate("/courses")} size="sm" className="w-full sm:w-auto font-bold flex-none">
                {t("dashboard.exploreBtn")} →
              </Button>
            </div>

            {activeCourses.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activeCourses.map((c) => renderCourseCard(c))}
              </div>
            ) : (
              <EmptyState
                icon="book-open"
                title={t("dashboard.noCoursesTitle")}
                description={t("dashboard.noCoursesDesc")}
                action={
                  <Button onClick={() => navigate("/courses")} className="mt-2 font-bold shadow-glow">
                    {t("dashboard.exploreBtn")} →
                  </Button>
                }
              />
            )}
          </Card>
        )}

        {/* ── TAB 3: ALL COMPLETED COURSES & CERTIFICATES ────────────────── */}
        {activeTab === "completed" && (
          <Card className="p-5 sm:p-8 animate-fade-in border-sky/20">
            <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 border-b border-white/[0.08] pb-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-ink-hi flex items-center justify-center sm:justify-start gap-2">
                  <Icon name="check-circle" className="text-sky" size={20} />
                  {t("dashboard.allCompletedTitle")} ({completedCourses.length})
                </h2>
                <p className="mt-1 text-xs text-ink-low">{t("dashboard.allCompletedDesc")}</p>
              </div>
              <Button onClick={() => navigate("/courses")} size="sm" className="w-full sm:w-auto font-bold flex-none">
                {t("dashboard.exploreBtn")} →
              </Button>
            </div>

            {completedCourses.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {completedCourses.map((c) => {
                  const localizedTitle = t(`courseData.${c.courseId}.title`, c.title);
                  const img = getCourseImage(c.courseId);
                  return (
                    <div
                      key={c.courseId}
                      className="flex flex-col justify-between rounded-2xl border border-sky/25 bg-sky/[0.05] p-5 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                        {img ? (
                          <img src={img} alt="" className="h-14 w-14 rounded-xl object-cover border border-white/10 shadow-sm flex-none" />
                        ) : (
                          <div className="flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-sky/20 text-2xl">
                            🏆
                          </div>
                        )}
                        <div className="min-w-0 flex-1 w-full">
                          <span className="inline-block rounded-full bg-sky/20 px-2.5 py-0.5 text-[10px] font-bold text-sky border border-sky/30 uppercase tracking-wider">
                            100% Completed
                          </span>
                          <h3 className="mt-1.5 font-bold text-base text-ink-hi text-center sm:text-left">{localizedTitle}</h3>
                          <p className="text-xs text-ink-low mt-0.5 text-center sm:text-left">Certificate Unlocked · +100 Bonus XP</p>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-sky/20 pt-3 flex justify-center sm:justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/course/${c.courseId}`)}
                          className="w-full sm:w-auto text-xs border-sky/30 text-sky hover:bg-sky/20 font-bold"
                        >
                          Review Course →
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-violet-500/[0.05] to-transparent p-8 text-center max-w-lg mx-auto">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 shadow-glow">
                  <Icon name="trophy" size={28} className="text-violet-400" />
                </div>
                <h3 className="text-base font-extrabold text-ink-hi text-balance max-w-[340px] mx-auto leading-snug">
                  {t("dashboard.motivationalCompletedTitle")}
                </h3>
                <Button
                  onClick={() => navigate("/courses")}
                  className="mt-5 font-bold shadow-glow"
                >
                  {t("dashboard.exploreBtn")} →
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* ── TAB 4: ALL QUIZ ATTEMPTS & HIGH SCORES ──────────────────────── */}
        {activeTab === "quizzes" && (
          <Card className="p-5 sm:p-8 animate-fade-in border-violet-500/20">
            <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 border-b border-white/[0.08] pb-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-ink-hi flex items-center justify-center sm:justify-start gap-2">
                  <Icon name="trophy" className="text-violet-400" size={20} />
                  {t("dashboard.allQuizzesTitle")} ({quizScores.length})
                </h2>
                <p className="mt-1 text-xs text-ink-low">{t("dashboard.allQuizzesDesc")}</p>
              </div>
              <Button onClick={() => navigate("/quiz")} size="sm" className="w-full sm:w-auto font-bold flex-none">
                {t("dashboard.takeNewQuizBtn")}
              </Button>
            </div>

            {quizScores.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {quizScores.map((q) => {
                  const localizedTitle = q.quizId
                    ? getLocalizedQuiz({ id: q.quizId, title: q.title }, t)?.title || q.title
                    : q.title;
                  return (
                    <div
                      key={q.quizId || q.title}
                      className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-sm text-ink-hi">{localizedTitle}</h3>
                        <p className="text-xs text-ink-low mt-0.5">High Score Record</p>
                      </div>
                      <div className="flex items-center gap-3 flex-none w-full sm:w-auto justify-center">
                        <span className="rounded-lg border border-violet-500/30 bg-violet-500/20 px-3 py-1 text-sm font-extrabold text-violet-300">
                          {q.score} XP
                        </span>
                        <Button
                          size="sm"
                          onClick={() => navigate("/quiz")}
                          className="text-xs font-bold"
                        >
                          Retake Quiz
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center max-w-md mx-auto">
                <p className="text-sm text-ink-low mb-3">{t("dashboard.noQuizDesc")}</p>
                <Button
                  onClick={() => navigate("/quiz")}
                  className="font-bold shadow-glow"
                >
                  {t("dashboard.takeNewQuizBtn")}
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* ── ROW 6 — Account Control Danger Zone ─────────────────────────── */}
        <Card
          className="animate-fade-up border-rose-500/20 bg-rose-500/[0.02] p-6"
          style={{ animationDelay: "0.32s" }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-rose-400">
                <Icon name="alert-triangle" size={16} />
                {t("dashboard.dangerZoneTitle")}
              </h3>
              <p className="mt-1 max-w-xl text-xs text-ink-low leading-relaxed">
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
              className="flex-none self-start sm:self-center font-bold"
            >
              <Icon name="trash-2" size={14} />
              {t("dashboard.deleteProfileBtn")}
            </Button>
          </div>
        </Card>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          UNENROLL & DELETE MODALS
          ══════════════════════════════════════════════════════════════════ */}

      {/* Unenroll Modal */}
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

      {/* Delete Profile Modal */}
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
          isDestructive
          onAction={handleDeleteProfile}
          actionText={t("dashboard.deleteConfirmBtn")}
          actionVariant="danger"
          loading={deleteLoading}
          actionDisabled={deleteConfirmText.trim().toUpperCase() !== "DELETE"}
        >
          <div className="space-y-4">
            <div className="rounded-xl border border-red-500/25 bg-red-500/[0.08] p-4 text-xs leading-relaxed text-red-200">
              <p className="mb-1 font-bold text-red-300">{t("dashboard.deleteWarningTitle")}</p>
              <p>{t("dashboard.deleteWarningText")}</p>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-semibold uppercase tracking-wider text-ink-hi">
                {t("dashboard.deleteListHeading")}
              </p>
              <ul className="space-y-1.5 pl-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n} className="flex items-center gap-2 text-red-300">
                    <Icon name="x-circle" size={14} className="flex-none text-red-400" />
                    {t(`dashboard.deleteList${n}`)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/[0.06] pt-3">
              <label className="mb-1.5 block text-xs font-semibold text-ink-hi">
                {t("dashboard.deleteConfirmLabel", { keyword: "" })}
                {" "}
                <span className="font-mono font-bold text-red-400">DELETE</span>
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={t("dashboard.deleteConfirmPlaceholder")}
                disabled={deleteLoading}
                className="w-full rounded-lg border border-red-500/25 bg-white/[0.03] px-3 py-2 text-xs font-mono text-ink-hi placeholder:text-ink-faint focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Dashboard;
