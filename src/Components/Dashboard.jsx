import { db } from "../firebase/firebase";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  setDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
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

const ADMIN_EMAIL = "thetj4054@gmail.com";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();
  const { xp, levelInfo, badges: gamificationBadges } = useGamification();

  // Admin Check
  const isAdmin = useMemo(() => {
    return currentUser && currentUser.email && currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  }, [currentUser]);

  // Mode Switcher: true = Executive Admin Portal, false = Student App Preview
  const [adminViewMode, setAdminViewMode] = useState(true);
  const [adminActiveTab, setAdminActiveTab] = useState("students"); // "students" | "messages" | "bugs"

  // Student Dashboard State
  const [userDetails, setUserDetails] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [quizScores, setQuizScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [courseToUnenroll, setCourseToUnenroll] = useState(null);
  const [unenrollLoading, setUnenrollLoading] = useState(false);

  // Admin Backend Storage State
  const [allStudents, setAllStudents] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [bugReports, setBugReports] = useState([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [selectedStudentInfo, setSelectedStudentInfo] = useState(null);
  const [showBugModal, setShowBugModal] = useState(false);
  const [newBugData, setNewBugData] = useState({ title: "", description: "", priority: "Medium" });
  const [savingBug, setSavingBug] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setUserDetails(null);
      setEnrolledCourses([]);
      setQuizScores({});
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch student personal data
        const userRef = doc(db, "Users", currentUser.uid);
        const coursesRef = collection(db, "Users", currentUser.uid, "enrolledCourses");
        const quizRef = collection(db, "Users", currentUser.uid, "quizAttempts");

        const [userSnap, coursesSnap, quizSnap] = await Promise.all([
          getDoc(userRef),
          getDocs(coursesRef),
          getDocs(quizRef),
        ]);

        let calculatedTotalPoints = 0;
        const courses = [];
        coursesSnap.forEach((docSnap) => courses.push({ id: docSnap.id, ...docSnap.data() }));
        setEnrolledCourses(courses);

        const scores = {};
        quizSnap.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.score) calculatedTotalPoints += data.score * 10;
          if (data.quizTitle) scores[data.quizTitle] = Math.max(scores[data.quizTitle] || 0, data.score);
        });
        setQuizScores(scores);

        if (userSnap.exists()) {
          const uData = userSnap.data();
          if (uData.totalPoints === undefined || uData.totalPoints !== calculatedTotalPoints) {
            await updateDoc(userRef, { totalPoints: calculatedTotalPoints });
            setUserDetails({ ...uData, totalPoints: calculatedTotalPoints });
          } else {
            setUserDetails(uData);
          }
        } else {
          setUserDetails({ email: currentUser.email, fullName: currentUser.displayName, totalPoints: calculatedTotalPoints });
        }

        // Sync to PublicLeaderboard
        const publicRef = doc(db, "PublicLeaderboard", currentUser.uid);
        await setDoc(
          publicRef,
          {
            uid: currentUser.uid,
            fullName: (userSnap.exists() && userSnap.data()?.fullName) || currentUser.displayName || "Learner",
            email: currentUser.email,
            totalPoints: calculatedTotalPoints,
            streak: (userSnap.exists() && userSnap.data()?.streak) || 1,
            badges: (userSnap.exists() && userSnap.data()?.badges) || ["Newcomer"],
            updatedAt: new Date(),
          },
          { merge: true }
        ).catch(() => {});

        // ADMIN ONLY FETCH (thetj4054@gmail.com)
        if (currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          // 1. Fetch Students from PublicLeaderboard
          const pubLeaderSnap = await getDocs(collection(db, "PublicLeaderboard"));
          const studentList = [];
          pubLeaderSnap.forEach((dSnap) => {
            const data = dSnap.data();
            // EXCLUDE the Admin Email from the Student Directory
            if (data.email && data.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
              studentList.push({ id: dSnap.id, ...data });
            }
          });
          setAllStudents(studentList);

          // 2. Fetch Contact Messages
          try {
            const msgQuery = query(collection(db, "ContactMessages"), orderBy("submittedAt", "desc"));
            const msgSnap = await getDocs(msgQuery);
            const msgList = [];
            msgSnap.forEach((dSnap) => msgList.push({ id: dSnap.id, ...dSnap.data() }));
            setContactMessages(msgList);
          } catch {
            const msgSnap = await getDocs(collection(db, "ContactMessages"));
            const msgList = [];
            msgSnap.forEach((dSnap) => msgList.push({ id: dSnap.id, ...dSnap.data() }));
            setContactMessages(msgList);
          }

          // 3. Fetch Bug Reports
          try {
            const bugSnap = await getDocs(collection(db, "BugReports"));
            const bugList = [];
            bugSnap.forEach((dSnap) => bugList.push({ id: dSnap.id, ...dSnap.data() }));
            setBugReports(bugList);
          } catch (err) {
            console.warn("No BugReports collection yet:", err);
          }
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
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

  const handleCreateBug = async (e) => {
    e.preventDefault();
    if (!newBugData.title.trim() || !newBugData.description.trim()) {
      toast.error("Please provide both title and description.");
      return;
    }

    setSavingBug(true);
    try {
      const payload = {
        title: newBugData.title.trim(),
        description: newBugData.description.trim(),
        priority: newBugData.priority,
        status: "Open",
        createdAt: serverTimestamp(),
        createdBy: currentUser.email,
      };
      const docRef = await addDoc(collection(db, "BugReports"), payload);
      setBugReports((prev) => [{ id: docRef.id, ...payload, createdAt: new Date() }, ...prev]);
      setShowBugModal(false);
      setNewBugData({ title: "", description: "", priority: "Medium" });
      toast.success("System note logged!");
    } catch (err) {
      console.error("Error logging bug:", err);
      toast.error("Failed to log system report.");
    } finally {
      setSavingBug(false);
    }
  };

  // Student Search filter (Excludes Admin Email automatically)
  const filteredStudents = useMemo(() => {
    const list = allStudents.filter((s) => s.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase());
    if (!studentSearchQuery.trim()) return list;
    const q = studentSearchQuery.toLowerCase();
    return list.filter(
      (s) =>
        (s.fullName && s.fullName.toLowerCase().includes(q)) ||
        (s.email && s.email.toLowerCase().includes(q)) ||
        (s.uid && s.uid.toLowerCase().includes(q))
    );
  }, [allStudents, studentSearchQuery]);

  // CSV Export for Student List
  const exportStudentsCSV = () => {
    if (filteredStudents.length === 0) {
      toast.error("No student data available to export.");
      return;
    }
    const headers = "Name,Email,UID,Total Points,Streak,Badges Count\n";
    const rows = filteredStudents
      .map(
        (s) =>
          `"${s.fullName || "Learner"}","${s.email || "N/A"}","${s.uid || s.id}",${s.totalPoints || 0},${
            s.streak || 1
          },${(s.badges || []).length}`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Learntopia_Students_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV export downloaded!");
  };

  // Student metrics
  const activeCourses = useMemo(() => enrolledCourses.filter((c) => !c.completed), [enrolledCourses]);
  const completedCourses = useMemo(() => enrolledCourses.filter((c) => c.completed), [enrolledCourses]);
  const totalPoints = userDetails?.totalPoints || 0;

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

        {/* ========================================================================= */}
        {/* 👑 EXECUTIVE OWNER CONTROL CENTER                                         */}
        {/* ========================================================================= */}
        {isAdmin && adminViewMode ? (
          <div className="space-y-6 animate-fade-in">
            
            {/* Top Operational Command Bar */}
            <div className="rounded-2xl border border-white/[0.08] bg-ground-800/90 p-4 sm:p-5 shadow-xl backdrop-blur-xl space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  <Icon name="shield" size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">Owner Control Center</h1>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live System
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
                    Admin: <span className="font-mono text-slate-300">{ADMIN_EMAIL}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setAdminViewMode(false)}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.08] hover:text-white transition-colors"
                >
                  <Icon name="eye" size={14} /> Student View
                </button>
                <button
                  onClick={exportStudentsCSV}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.08] hover:text-white transition-colors"
                >
                  <Icon name="clipboard" size={14} /> Export CSV
                </button>
                <button
                  onClick={() => setShowBugModal(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 transition-colors shadow-md shadow-violet-600/20"
                >
                  <Icon name="alert-circle" size={14} /> + Log Note
                </button>
              </div>
            </div>

            {/* Metric KPI Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-white/[0.08] bg-ground-800/50 p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Registered Students</span>
                  <Icon name="users" size={16} className="text-violet-400" />
                </div>
                <p className="mt-2 text-2xl font-bold text-white tracking-tight">{filteredStudents.length}</p>
                <p className="mt-1 text-[11px] text-slate-500">Student accounts (Excludes Admin)</p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-ground-800/50 p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Contact Inquiries</span>
                  <Icon name="mail" size={16} className="text-sky" />
                </div>
                <p className="mt-2 text-2xl font-bold text-white tracking-tight">{contactMessages.length}</p>
                <p className="mt-1 text-[11px] text-slate-500">Form submissions</p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-ground-800/50 p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Platform XP</span>
                  <Icon name="zap" size={16} className="text-amber-400" />
                </div>
                <p className="mt-2 text-2xl font-bold text-white tracking-tight">
                  {filteredStudents.reduce((acc, curr) => acc + (curr.totalPoints || 0), 0)}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">Total student points logged</p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-ground-800/50 p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>System Logs</span>
                  <Icon name="alert-circle" size={16} className="text-emerald-400" />
                </div>
                <p className="mt-2 text-2xl font-bold text-white tracking-tight">{bugReports.length}</p>
                <p className="mt-1 text-[11px] text-slate-500">Documented reports</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-white/[0.08] gap-4 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setAdminActiveTab("students")}
                className={`pb-2.5 whitespace-nowrap transition-colors border-b-2 ${
                  adminActiveTab === "students"
                    ? "text-white border-violet-500"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Student Directory ({filteredStudents.length})
              </button>
              <button
                onClick={() => setAdminActiveTab("messages")}
                className={`pb-2.5 whitespace-nowrap transition-colors border-b-2 ${
                  adminActiveTab === "messages"
                    ? "text-white border-violet-500"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Contact Inbox ({contactMessages.length})
              </button>
              <button
                onClick={() => setAdminActiveTab("bugs")}
                className={`pb-2.5 whitespace-nowrap transition-colors border-b-2 ${
                  adminActiveTab === "bugs"
                    ? "text-white border-violet-500"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                System Maintenance ({bugReports.length})
              </button>
            </div>

            {/* TAB 1: Student Directory */}
            {adminActiveTab === "students" && (
              <div className="rounded-xl border border-white/[0.08] bg-ground-800/40 p-4 sm:p-5 shadow-lg space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white">Student Account Directory</h2>
                    <p className="text-xs text-slate-400">All registered student accounts (Excludes Admin email).</p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={studentSearchQuery}
                      onChange={(e) => setStudentSearchQuery(e.target.value)}
                      placeholder="Search name or email..."
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                {filteredStudents.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">No student records found.</div>
                ) : (
                  <>
                    {/* Mobile View: Cards */}
                    <div className="grid gap-2.5 sm:hidden">
                      {filteredStudents.map((s) => (
                        <div key={s.id} className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="grid h-7 w-7 place-items-center rounded-md bg-violet-500/20 text-violet-300 font-bold text-xs">
                                {s.fullName ? s.fullName.charAt(0).toUpperCase() : "S"}
                              </div>
                              <span className="font-bold text-white text-xs">{s.fullName || "Learner"}</span>
                            </div>
                            <span className="text-amber-300 font-bold text-xs">⚡ {s.totalPoints || 0} XP</span>
                          </div>

                          <p className="text-[11px] text-slate-400 font-mono truncate">{s.email || "N/A"}</p>

                          <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
                            <span className="text-[11px] text-orange-400 font-semibold">🔥 {s.streak || 1} day streak</span>
                            <button
                              onClick={() => setSelectedStudentInfo(s)}
                              className="rounded bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold text-slate-300 hover:text-white"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop View: Table */}
                    <div className="hidden sm:block overflow-x-auto rounded-lg border border-white/[0.08]">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-white/[0.03] uppercase tracking-wider text-slate-400 border-b border-white/[0.08] text-[10px] font-bold">
                          <tr>
                            <th className="px-4 py-3">Student Name</th>
                            <th className="px-4 py-3">Email Address</th>
                            <th className="px-4 py-3">Total XP</th>
                            <th className="px-4 py-3">Streak</th>
                            <th className="px-4 py-3">Badges</th>
                            <th className="px-4 py-3 text-right">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {filteredStudents.map((s) => (
                            <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-4 py-3 font-bold text-white flex items-center gap-2.5">
                                <div className="grid h-7 w-7 place-items-center rounded-md bg-violet-500/20 text-violet-300 font-bold text-xs">
                                  {s.fullName ? s.fullName.charAt(0).toUpperCase() : "S"}
                                </div>
                                <span className="whitespace-nowrap">{s.fullName || "Learner"}</span>
                              </td>
                              <td className="px-4 py-3 text-slate-300 font-mono text-xs whitespace-nowrap">{s.email || "N/A"}</td>
                              <td className="px-4 py-3 font-bold text-amber-300 whitespace-nowrap">⚡ {s.totalPoints || 0} XP</td>
                              <td className="px-4 py-3 text-orange-400 font-semibold whitespace-nowrap">🔥 {s.streak || 1} days</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1 rounded bg-sky/10 border border-sky/20 px-2 py-0.5 text-[10px] font-semibold text-sky">
                                  🏆 {(s.badges || []).length} Badges
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right whitespace-nowrap">
                                <button
                                  onClick={() => setSelectedStudentInfo(s)}
                                  className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:bg-white/[0.08] hover:text-white transition-colors"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* TAB 2: Contact Inbox */}
            {adminActiveTab === "messages" && (
              <div className="rounded-xl border border-white/[0.08] bg-ground-800/40 p-4 sm:p-5 shadow-lg space-y-3">
                <h2 className="text-sm font-bold text-white">Contact Inquiries Inbox</h2>

                {contactMessages.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">No contact messages received yet.</div>
                ) : (
                  <div className="space-y-2.5">
                    {contactMessages.map((msg) => (
                      <div key={msg.id} className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                          <span className="font-bold text-white">{msg.subject || "(No Subject)"}</span>
                          <span className="text-slate-500 font-mono text-[11px]">
                            {msg.submittedAt?.toDate ? msg.submittedAt.toDate().toLocaleString() : "Recently"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          From: <strong className="text-slate-200">{msg.name}</strong> (<a href={`mailto:${msg.email}`} className="text-sky underline">{msg.email}</a>)
                        </p>
                        <div className="rounded bg-black/40 p-2.5 text-xs text-slate-300 leading-relaxed border border-white/[0.04]">
                          "{msg.message}"
                        </div>
                        <div className="flex justify-end pt-1">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Learntopia Inquiry")}`}
                            className="inline-flex items-center gap-1.5 rounded bg-violet-600 px-3 py-1 text-xs font-semibold text-white hover:bg-violet-500 transition-colors"
                          >
                            <Icon name="mail" size={12} /> Reply via Email
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: System Maintenance */}
            {adminActiveTab === "bugs" && (
              <div className="rounded-xl border border-white/[0.08] bg-ground-800/40 p-4 sm:p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white">System Notes &amp; Technical Logs</h2>
                  <button
                    onClick={() => setShowBugModal(true)}
                    className="rounded bg-violet-600 px-3 py-1 text-xs font-semibold text-white hover:bg-violet-500 transition-colors"
                  >
                    + Add Log
                  </button>
                </div>

                {bugReports.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">No technical reports logged.</div>
                ) : (
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {bugReports.map((b) => (
                      <div key={b.id} className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-semibold">
                          <span className="text-amber-400">Priority: {b.priority || "Medium"}</span>
                          <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-400 border border-emerald-500/20">{b.status || "Open"}</span>
                        </div>
                        <h4 className="font-bold text-white text-xs">{b.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{b.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        ) : (
          /* ========================================================================= */
          /* 🎓 CLEAN STUDENT DASHBOARD                                               */
          /* ========================================================================= */
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
        )}

      </div>

      {/* Student Details Modal */}
      {selectedStudentInfo && (
        <Modal isOpen={!!selectedStudentInfo} onClose={() => setSelectedStudentInfo(null)} title={`Student Record: ${selectedStudentInfo.fullName || "Learner"}`}>
          <div className="space-y-2.5 text-xs text-slate-300">
            <p><span className="text-slate-400 font-semibold">Email:</span> {selectedStudentInfo.email || "N/A"}</p>
            <p><span className="text-slate-400 font-semibold">User ID:</span> <code className="font-mono text-violet-300">{selectedStudentInfo.uid || selectedStudentInfo.id}</code></p>
            <p><span className="text-slate-400 font-semibold">Total Points:</span> <strong className="text-amber-300">{selectedStudentInfo.totalPoints || 0} XP</strong></p>
            <p><span className="text-slate-400 font-semibold">Streak:</span> <strong className="text-orange-400">{selectedStudentInfo.streak || 1} Days</strong></p>
            <div className="pt-3 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => setSelectedStudentInfo(null)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* New Bug Modal */}
      {showBugModal && (
        <Modal isOpen={showBugModal} onClose={() => setShowBugModal(false)} title="Log System Note / Technical Report">
          <form onSubmit={handleCreateBug} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">Title / Subject</label>
              <input
                type="text"
                value={newBugData.title}
                onChange={(e) => setNewBugData((p) => ({ ...p, title: e.target.value }))}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-white outline-none focus:border-violet-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">Priority</label>
              <select
                value={newBugData.priority}
                onChange={(e) => setNewBugData((p) => ({ ...p, priority: e.target.value }))}
                className="w-full rounded-lg border border-white/[0.08] bg-ground-900 px-3 py-2 text-xs text-white outline-none focus:border-violet-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">Description</label>
              <textarea
                value={newBugData.description}
                onChange={(e) => setNewBugData((p) => ({ ...p, description: e.target.value }))}
                rows={3}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-white outline-none focus:border-violet-500"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" type="button" onClick={() => setShowBugModal(false)}>Cancel</Button>
              <Button size="sm" type="submit" loading={savingBug}>Save Note</Button>
            </div>
          </form>
        </Modal>
      )}

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
