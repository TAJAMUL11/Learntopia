import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, getDocs, doc, setDoc, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Icon from "../Components/ui/Icon";
import { Skeleton } from "../Components/ui/Skeleton";
import Modal from "../Components/ui/Modal";
import NotFound from "./NotFound";
import { toast } from "react-toastify";

const ADMIN_EMAIL = "thetj4054@gmail.com";

const Admin = () => {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState("students"); // "students" | "messages" | "bugs" | "analytics"
  const [loading, setLoading] = useState(true);

  // Data states
  const [students, setStudents] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [bugReports, setBugReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showNewBugModal, setShowNewBugModal] = useState(false);
  const [newBug, setNewBug] = useState({ title: "", description: "", priority: "Medium" });
  const [submittingBug, setSubmittingBug] = useState(false);

  const isAdmin = useMemo(() => {
    return currentUser && currentUser.email && currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  }, [currentUser]);

  useEffect(() => {
    if (authLoading) return;
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Students from PublicLeaderboard & Users
        const usersSnap = await getDocs(collection(db, "PublicLeaderboard"));
        const studentList = [];
        usersSnap.forEach((docSnap) => {
          studentList.push({ id: docSnap.id, ...docSnap.data() });
        });
        setStudents(studentList);

        // 2. Fetch Contact Messages
        try {
          const messagesQuery = query(collection(db, "ContactMessages"), orderBy("submittedAt", "desc"));
          const msgSnap = await getDocs(messagesQuery);
          const msgList = [];
          msgSnap.forEach((docSnap) => {
            msgList.push({ id: docSnap.id, ...docSnap.data() });
          });
          setContactMessages(msgList);
        } catch {
          // Fallback without ordering if index not present
          const msgSnap = await getDocs(collection(db, "ContactMessages"));
          const msgList = [];
          msgSnap.forEach((docSnap) => {
            msgList.push({ id: docSnap.id, ...docSnap.data() });
          });
          setContactMessages(msgList);
        }

        // 3. Fetch Bug Reports / System Notes
        try {
          const bugSnap = await getDocs(collection(db, "BugReports"));
          const bugList = [];
          bugSnap.forEach((docSnap) => {
            bugList.push({ id: docSnap.id, ...docSnap.data() });
          });
          setBugReports(bugList);
        } catch (err) {
          console.warn("No BugReports collection yet:", err);
        }
      } catch (err) {
        console.error("Error fetching admin data:", err);
        toast.error("Failed to load some admin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [isAdmin, authLoading]);

  const handleCreateBugReport = async (e) => {
    e.preventDefault();
    if (!newBug.title.trim() || !newBug.description.trim()) {
      toast.error("Please provide both title and description.");
      return;
    }

    setSubmittingBug(true);
    try {
      const bugData = {
        title: newBug.title.trim(),
        description: newBug.description.trim(),
        priority: newBug.priority,
        status: "Open",
        createdAt: serverTimestamp(),
        createdBy: currentUser.email,
      };

      const docRef = await addDoc(collection(db, "BugReports"), bugData);
      setBugReports((prev) => [{ id: docRef.id, ...bugData, createdAt: new Date() }, ...prev]);
      setShowNewBugModal(false);
      setNewBug({ title: "", description: "", priority: "Medium" });
      toast.success("Bug report logged successfully!");
    } catch (err) {
      console.error("Error logging bug report:", err);
      toast.error("Failed to log bug report.");
    } finally {
      setSubmittingBug(false);
    }
  };

  // Search filtering for students
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        (s.fullName && s.fullName.toLowerCase().includes(q)) ||
        (s.email && s.email.toLowerCase().includes(q)) ||
        (s.uid && s.uid.toLowerCase().includes(q))
    );
  }, [students, searchQuery]);

  // Export JSON/CSV helper
  const exportStudentsCSV = () => {
    if (students.length === 0) {
      toast.error("No student data to export.");
      return;
    }

    const headers = "Name,Email,UID,Total Points,Streak,Badges Count\n";
    const rows = students
      .map(
        (s) =>
          `"${s.fullName || "N/A"}","${s.email || "N/A"}","${s.uid || s.id}",${s.totalPoints || 0},${
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
    toast.success("Exported student list CSV!");
  };

  if (authLoading) {
    return (
      <div className="container-page py-16 text-center">
        <Skeleton className="mx-auto h-12 w-48 rounded-xl mb-4" />
        <Skeleton className="mx-auto h-64 w-full max-w-4xl rounded-3xl" />
      </div>
    );
  }

  // Stealth protection for non-admin users: render 404 NotFound page with zero redirection
  if (!isAdmin) {
    return <NotFound />;
  }

  return (
    <div className="container-page py-12 md:py-16 text-ink-hi">
      <div className="mx-auto max-w-6xl space-y-8 animate-fade-up">

        {/* Admin Header Banner */}
        <Card className="flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center md:p-8 border-violet-500/30 bg-gradient-to-br from-violet-600/20 via-violet-900/10 to-ground-900 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Icon name="star" size={14} /> Owner Portal
              </span>
              <span className="text-xs font-bold text-ink-low">{ADMIN_EMAIL}</span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Learntopia Control Center
            </h1>
            <p className="mt-1 text-sm text-ink-low">
              Manage registered students, review contact inquiries, track bug reports, and inspect platform analytics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={exportStudentsCSV} className="gap-2">
              <Icon name="clipboard" size={16} /> Export CSV
            </Button>
            <Button size="sm" onClick={() => setShowNewBugModal(true)} className="gap-2">
              <Icon name="alert-circle" size={16} /> Log Bug / Note
            </Button>
          </div>
        </Card>

        {/* Quick Analytics Summary Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-violet-500/20 bg-white/[0.02] p-5 shadow-card">
            <div className="flex items-center gap-3 text-violet-400">
              <Icon name="users" size={20} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-low">Signed Up Students</h3>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{students.length}</p>
          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-white/[0.02] p-5 shadow-card">
            <div className="flex items-center gap-3 text-sky">
              <Icon name="mail" size={20} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-low">Contact Inquiries</h3>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{contactMessages.length}</p>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-white/[0.02] p-5 shadow-card">
            <div className="flex items-center gap-3 text-amber-400">
              <Icon name="alert-circle" size={20} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-low">Bug / System Logs</h3>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{bugReports.length}</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-white/[0.02] p-5 shadow-card">
            <div className="flex items-center gap-3 text-emerald-400">
              <Icon name="trophy" size={20} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-low">Total Points Logged</h3>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">
              {students.reduce((acc, curr) => acc + (curr.totalPoints || 0), 0)}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.08] gap-2 overflow-x-auto pb-1">
          {[
            { id: "students", label: `Registered Students (${students.length})`, icon: "users" },
            { id: "messages", label: `Contact Inquiries (${contactMessages.length})`, icon: "mail" },
            { id: "bugs", label: `Bug & System Notes (${bugReports.length})`, icon: "alert-circle" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "border-violet-500 text-violet-400 bg-violet-500/10 rounded-t-xl"
                  : "border-transparent text-ink-low hover:text-ink-hi hover:bg-white/[0.02]"
              }`}
            >
              <Icon name={tab.icon} size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Registered Students */}
        {activeTab === "students" && (
          <Card className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Icon name="users" size={20} className="text-violet-400" />
                Signed Up Students & Learners
              </h3>

              {/* Search bar */}
              <div className="relative w-full sm:w-72">
                <Icon name="search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-low" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student by name or email..."
                  className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] pl-10 pr-4 py-2 text-sm text-ink-hi placeholder-ink-low/50 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="py-12 text-center text-ink-low">
                <Icon name="users" size={40} className="mx-auto mb-3 text-ink-low/30" />
                <p className="font-semibold text-lg">No students found</p>
                <p className="text-sm">Try broadening your search term.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.03] text-xs font-bold uppercase tracking-wider text-ink-low border-b border-white/[0.08]">
                    <tr>
                      <th className="px-5 py-4">Student</th>
                      <th className="px-5 py-4">Email</th>
                      <th className="px-5 py-4">Total Points</th>
                      <th className="px-5 py-4">Streak</th>
                      <th className="px-5 py-4">Badges</th>
                      <th className="px-5 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-violet-600 to-sky text-sm font-bold text-white">
                              {student.fullName ? student.fullName.charAt(0).toUpperCase() : "S"}
                            </div>
                            <span className="font-bold text-white">{student.fullName || "Learner"}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-ink-low font-mono text-xs">{student.email || "N/A"}</td>
                        <td className="px-5 py-4 font-extrabold text-amber-300">⚡ {student.totalPoints || 0} pts</td>
                        <td className="px-5 py-4 font-semibold text-orange-400">🔥 {student.streak || 1} days</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 rounded-full border border-sky/30 bg-sky/10 px-2.5 py-0.5 text-xs font-bold text-sky">
                            <Icon name="star" size={12} /> {(student.badges || []).length} Badges
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Button size="sm" variant="ghost" onClick={() => setSelectedStudent(student)}>
                            View Info
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* TAB 2: Contact Messages */}
        {activeTab === "messages" && (
          <Card className="p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Icon name="mail" size={20} className="text-sky" />
              Messages & Contact Form Inquiries
            </h3>

            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
              </div>
            ) : contactMessages.length === 0 ? (
              <div className="py-12 text-center text-ink-low">
                <Icon name="mail" size={40} className="mx-auto mb-3 text-ink-low/30" />
                <p className="font-semibold text-lg">No contact messages received yet</p>
                <p className="text-sm">Messages submitted via the /contact page will appear here instantly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contactMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all hover:border-violet-500/40 hover:bg-white/[0.04]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-base font-extrabold text-white">{msg.subject || "(No Subject)"}</h4>
                        <p className="text-xs text-ink-low">
                          From: <span className="font-semibold text-violet-300">{msg.name}</span> ({msg.email})
                        </p>
                      </div>
                      <span className="text-xs text-ink-low/70">
                        {msg.submittedAt?.toDate
                          ? msg.submittedAt.toDate().toLocaleString()
                          : "Recently"}
                      </span>
                    </div>

                    <p className="text-sm text-ink-low leading-relaxed line-clamp-3 bg-black/20 rounded-xl p-3 border border-white/[0.03]">
                      "{msg.message}"
                    </p>

                    <div className="mt-3 flex justify-end">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedMessage(msg)}>
                        Read Full Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* TAB 3: Bug Reports & System Notes */}
        {activeTab === "bugs" && (
          <Card className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Icon name="alert-circle" size={20} className="text-amber-400" />
                Bug Reports & Technical Notes
              </h3>
              <Button size="sm" onClick={() => setShowNewBugModal(true)} className="gap-2">
                + New Log
              </Button>
            </div>

            {bugReports.length === 0 ? (
              <div className="py-12 text-center text-ink-low">
                <Icon name="alert-circle" size={40} className="mx-auto mb-3 text-ink-low/30" />
                <p className="font-semibold text-lg">No bug reports logged</p>
                <p className="text-sm">Click "+ New Log" to document any issues or system maintenance notes.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {bugReports.map((bug) => (
                  <div key={bug.id} className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Priority: {bug.priority || "Medium"}
                      </span>
                      <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
                        {bug.status || "Open"}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{bug.title}</h4>
                    <p className="text-sm text-ink-low">{bug.description}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

      </div>

      {/* MODAL 1: Student Detail Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Profile: ${selectedStudent.fullName || "Learner"}`}
        >
          <div className="space-y-4 text-sm text-ink-hi">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-2">
              <p><span className="text-ink-low">Email:</span> {selectedStudent.email || "N/A"}</p>
              <p><span className="text-ink-low">User ID:</span> <code className="text-xs font-mono text-violet-300">{selectedStudent.uid || selectedStudent.id}</code></p>
              <p><span className="text-ink-low">Total Points:</span> <strong className="text-amber-300">{selectedStudent.totalPoints || 0} XP</strong></p>
              <p><span className="text-ink-low">Streak:</span> <strong className="text-orange-400">{selectedStudent.streak || 1} Days</strong></p>
            </div>

            <div>
              <h5 className="font-bold text-white mb-2">Earned Badges:</h5>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.badges && selectedStudent.badges.length > 0 ? (
                  selectedStudent.badges.map((b, i) => (
                    <span key={i} className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                      🏆 {typeof b === "string" ? b : b.name}
                    </span>
                  ))
                ) : (
                  <span className="text-ink-low text-xs">No badges earned yet.</span>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button variant="ghost" onClick={() => setSelectedStudent(null)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 2: Full Contact Message Modal */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          title={`Inquiry from ${selectedMessage.name}`}
        >
          <div className="space-y-4 text-sm text-ink-hi">
            <div className="rounded-xl bg-white/[0.03] p-4 border border-white/[0.08] space-y-1.5">
              <p><span className="text-ink-low">Sender Name:</span> <strong>{selectedMessage.name}</strong></p>
              <p><span className="text-ink-low">Sender Email:</span> <a href={`mailto:${selectedMessage.email}`} className="text-sky underline">{selectedMessage.email}</a></p>
              <p><span className="text-ink-low">Subject:</span> <strong>{selectedMessage.subject}</strong></p>
            </div>

            <div>
              <h5 className="font-bold text-white mb-2">Message Body:</h5>
              <div className="rounded-xl bg-black/40 p-4 border border-white/[0.06] text-ink-low whitespace-pre-line leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || "Learntopia Support")}`}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:bg-violet-500 transition-colors"
              >
                <Icon name="mail" size={16} /> Reply via Email
              </a>
              <Button variant="ghost" onClick={() => setSelectedMessage(null)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 3: New Bug Report / System Note Modal */}
      {showNewBugModal && (
        <Modal
          isOpen={showNewBugModal}
          onClose={() => setShowNewBugModal(false)}
          title="Log Technical Note / Bug Report"
        >
          <form onSubmit={handleCreateBugReport} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-low mb-1.5">Title / Topic</label>
              <input
                type="text"
                value={newBug.title}
                onChange={(e) => setNewBug((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Firebase rule check or quiz timer latency"
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-sm text-ink-hi outline-none focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-low mb-1.5">Priority</label>
              <select
                value={newBug.priority}
                onChange={(e) => setNewBug((p) => ({ ...p, priority: e.target.value }))}
                className="w-full rounded-xl border border-white/[0.1] bg-ground-900 px-4 py-2.5 text-sm text-ink-hi outline-none focus:border-violet-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-low mb-1.5">Description</label>
              <textarea
                value={newBug.description}
                onChange={(e) => setNewBug((p) => ({ ...p, description: e.target.value }))}
                placeholder="Describe the issue, step to reproduce, or administrative note..."
                rows={4}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-sm text-ink-hi outline-none focus:border-violet-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" type="button" onClick={() => setShowNewBugModal(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={submittingBug}>
                Save Report
              </Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};

export default Admin;
