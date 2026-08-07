import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { quizzes } from "../data/quizData";
import Card from "../Components/ui/Card";
import Icon from "../Components/ui/Icon";
import { Skeleton } from "../Components/ui/Skeleton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAuth } from "../context/AuthContext";

// Tab definitions — "all" + one per quiz
const TABS = [
  { id: "all", label: "Global Leaderboard" },
  ...quizzes.map((q) => ({ id: q.id, label: q.title })),
];

const Leaderboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [allEntries, setAllEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { state: { returnTo: "/leaderboard" }, replace: true });
    }
  }, [currentUser, navigate]);

  // ── Fetch leaderboard data dynamically based on activeTab ──
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const entries = [];

        if (activeTab === "all") {
          // Fetch overall user rankings from PublicLeaderboard
          const publicSnap = await getDocs(
            query(
              collection(db, "PublicLeaderboard"),
              orderBy("totalPoints", "desc"),
              limit(50)
            )
          );
          publicSnap.forEach((d) => {
            const data = d.data();
            entries.push({
              id: d.id,
              userId: d.id,
              userName: data.fullName || "Learner",
              quizId: "all",
              quizTitle: "Overall Points",
              score: Number(data.totalPoints) || 0,
              rawScore: (Number(data.totalPoints) || 0) / 10,
              isCurrent: d.id === currentUser?.uid,
            });
          });
        } else {
          // Fetch scores for the active quiz
          const scoresSnap = await getDocs(
            query(
              collection(db, "QuizLeaderboards", activeTab, "Scores"),
              orderBy("score", "desc"),
              limit(50)
            )
          );
          const activeQuizDef = quizzes.find((q) => q.id === activeTab);
          scoresSnap.forEach((d) => {
            const data = d.data();
            entries.push({
              id: `${activeTab}_${d.id}`,
              userId: d.id,
              userName: data.userFullName || "Learner",
              quizId: activeTab,
              quizTitle: activeQuizDef?.title || "Quiz",
              score: Number(data.score) || 0,
              rawScore: Number(data.rawScore) || 0,
              isCurrent: d.id === currentUser?.uid,
            });
          });
        }

        // 2. Fallback to current user's local attempts if database list is empty
        if (entries.length === 0 && currentUser) {
          if (activeTab === "all") {
            const userSnap = await getDoc(doc(db, "Users", currentUser.uid));
            if (userSnap.exists()) {
              const data = userSnap.data();
              entries.push({
                id: currentUser.uid,
                userId: currentUser.uid,
                userName: data.fullName || currentUser.displayName || "You",
                quizId: "all",
                quizTitle: "Overall Points",
                score: Number(data.totalPoints) || 0,
                rawScore: (Number(data.totalPoints) || 0) / 10,
                isCurrent: true,
              });
            }
          } else {
            const attemptsSnap = await getDocs(
              collection(db, "Users", currentUser.uid, "quizAttempts")
            );
            const userSnap = await getDoc(doc(db, "Users", currentUser.uid));
            const fullName =
              (userSnap.exists() && userSnap.data().fullName) ||
              currentUser.displayName ||
              "You";

            attemptsSnap.forEach((qd) => {
              const data = qd.data();
              if (data.quizId === activeTab && data.score !== undefined) {
                const quizDef = quizzes.find((q) => q.id === data.quizId);
                entries.push({
                  id: `${currentUser.uid}_${qd.id}`,
                  userId: currentUser.uid,
                  userName: fullName,
                  quizId: data.quizId,
                  quizTitle: quizDef?.title || "Quiz",
                  score: Number(data.score) * 10,
                  rawScore: Number(data.score),
                  isCurrent: true,
                });
              }
            });
          }
        }

        // Deduplicate - keep highest score per user
        const bestScores = new Map();
        for (const entry of entries) {
          const key = activeTab === "all" ? entry.userId : `${entry.userId}_${entry.quizId}`;
          const existing = bestScores.get(key);
          if (!existing || entry.score > existing.score) {
            bestScores.set(key, entry);
          }
        }

        if (isMounted) {
          setAllEntries(Array.from(bestScores.values()));
        }
      } catch (err) {
        console.error("Error building leaderboard:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [currentUser, activeTab]);

  // ── Filter by search query and sort ──
  const filteredEntries = useMemo(() => {
    let data = allEntries;

    // Search filter
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      data = data.filter(
        (e) =>
          e.userName.toLowerCase().includes(q) ||
          e.quizTitle.toLowerCase().includes(q)
      );
    }

    // Sort descending by score, limit to top 10
    return [...data].sort((a, b) => b.score - a.score).slice(0, 10);
  }, [allEntries, searchQuery]);

  // ── Animate rows on change ──
  useGSAP(() => {
    if (!loading && filteredEntries.length > 0) {
      gsap.from(".lb-row", {
        y: 12,
        opacity: 0,
        duration: 0.25,
        stagger: 0.04,
        ease: "power2.out",
      });
    }
  }, [loading, activeTab, searchQuery]);

  // ── Rank medal helpers ──
  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  // Medal colours (gold / silver / bronze) are intentional for a leaderboard;
  // everything else uses the neutral ink token.
  const getRankColor = (rank) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-slate-300";
    if (rank === 3) return "text-amber-400";
    return "text-ink-faint";
  };

  return (
    <div className="container-page flex min-h-[85vh] flex-col items-center py-8 md:py-16 text-white">

      {/* ── Header ── */}
      <div className="w-full max-w-5xl text-center space-y-3 mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
          <Icon name="trophy" size={14} /> Learntopia Rankings
        </div>
        <h1 className="text-2xl font-black tracking-tight md:text-5xl text-white">
          Leaderboard
        </h1>
        <p className="text-sm md:text-base text-ink-low max-w-lg mx-auto">
          See who&rsquo;s on top. Filter by quiz to view individual rankings.
        </p>
      </div>

      {/* ── Quiz Filter: Dropdown on mobile, tabs on desktop ── */}
      <div className="w-full max-w-5xl mb-5">
        {/* Mobile: Dropdown */}
        <div className="block md:hidden">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint mb-1.5 block">Filter by Quiz</label>
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => { setActiveTab(e.target.value); setSearchQuery(""); }}
              className="w-full appearance-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 pr-10 text-sm font-semibold text-white focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 focus:outline-none transition-all"
            >
              {TABS.map((tab) => (
                <option key={tab.id} value={tab.id} className="bg-[#0d0a18] text-white">
                  {tab.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-ink-low">
              <Icon name="chevron-down" size={16} />
            </div>
          </div>
        </div>

        {/* Desktop: Tabs */}
        <div className="hidden md:flex items-center gap-2 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchQuery(""); }}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200 border ${
                activeTab === tab.id
                  ? "bg-violet-600 border-violet-500 text-white shadow-glow"
                  : "bg-white/[0.03] border-white/[0.07] text-ink-low hover:text-white hover:border-white/15 hover:bg-white/[0.06]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Search ── */}
      <div className="w-full max-w-5xl mb-6">
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-faint">
            <Icon name="search" size={15} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] pl-10 pr-8 py-2.5 text-sm text-white placeholder-ink-faint focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-faint hover:text-white transition-colors"
            >
              <Icon name="x" size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="w-full max-w-5xl space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : filteredEntries.length === 0 ? (
        <Card className="w-full max-w-md p-10 text-center my-6">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-400">
            <Icon name="award" size={26} />
          </div>
          <h3 className="text-base font-bold text-white">No Rankings Yet</h3>
          <p className="mt-2 text-sm text-ink-low">
            {searchQuery
              ? `No results for "${searchQuery}".`
              : activeTab === "all"
                ? "Complete a quiz to appear on the leaderboard!"
                : `No one has attempted "${TABS.find((t) => t.id === activeTab)?.label}" yet.`}
          </p>
        </Card>
      ) : (
        <>
          {/* ── Mobile: Card Layout ── */}
          <div className="w-full max-w-5xl space-y-2.5 md:hidden">
            {filteredEntries.map((item, index) => {
              const rank = index + 1;
              const medal = getMedal(rank);
              const isYou = item.isCurrent;

              return (
                <div
                  key={item.id}
                  className={`lb-row flex items-center gap-3 rounded-xl px-4 py-3.5 border transition-all ${
                    rank <= 3
                      ? "border-white/[0.08] bg-white/[0.04]"
                      : "border-white/[0.05] bg-white/[0.02]"
                  } ${isYou ? "!bg-violet-500/[0.1] !border-violet-500/20" : ""}`}
                >
                  {/* Rank */}
                  <div className="w-8 shrink-0 text-center">
                    {medal ? (
                      <span className="text-xl leading-none">{medal}</span>
                    ) : (
                      <span className={`text-sm font-bold tabular-nums ${getRankColor(rank)}`}>{rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold border ${
                    rank === 1 ? "border-yellow-400/50 bg-yellow-400/15 text-yellow-300" :
                    rank === 2 ? "border-slate-300/50 bg-slate-300/15 text-slate-200" :
                    rank === 3 ? "border-amber-500/50 bg-amber-500/15 text-amber-300" :
                    "border-white/10 bg-white/5 text-ink-low"
                  }`}>
                    {item.userName?.charAt(0).toUpperCase() || "U"}
                  </div>

                  {/* Name + Quiz */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-semibold truncate ${rank <= 3 ? "text-white" : "text-ink"}`}>
                        {item.userName}
                      </span>
                      {isYou && (
                        <span className="shrink-0 rounded-full bg-sky/15 border border-sky/30 px-1.5 py-px text-[9px] font-bold uppercase text-sky">
                          You
                        </span>
                      )}
                    </div>
                    {activeTab === "all" && (
                      <p className="text-[11px] text-ink-faint mt-0.5 truncate">{item.quizTitle}</p>
                    )}
                  </div>

                  {/* Score */}
                  <div className="shrink-0 text-right">
                    <span className={`text-sm font-bold tabular-nums ${rank <= 3 ? getRankColor(rank) : "text-violet-400"}`}>
                      {item.score}
                    </span>
                    <span className="ml-0.5 text-[9px] font-medium text-ink-faint uppercase">pts</span>
                  </div>
                </div>
              );
            })}

            {/* Mobile footer */}
            <div className="flex items-center justify-between px-2 pt-2">
              <span className="text-[11px] text-ink-faint">
                {filteredEntries.length} {filteredEntries.length === 1 ? "entry" : "entries"}
              </span>
              <span className="text-[11px] text-ink-faint">
                {activeTab === "all" ? "All quizzes" : TABS.find((t) => t.id === activeTab)?.label}
              </span>
            </div>
          </div>

          {/* ── Desktop: Table Layout ── */}
          <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-ground-900 overflow-hidden hidden md:block shadow-card">
            <table className="w-full text-left">

              {/* Header */}
              <thead>
                <tr className="border-b-2 border-white/10 bg-white/[0.03]">
                  <th className="py-4 pl-7 pr-3 text-xs font-bold uppercase tracking-wider text-ink-low w-20">Rank</th>
                  <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-ink-low">Student</th>
                  {activeTab === "all" && (
                    <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-ink-low">Quiz</th>
                  )}
                  <th className="py-4 pl-5 pr-7 text-xs font-bold uppercase tracking-wider text-ink-low text-right">Score</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {filteredEntries.map((item, index) => {
                  const rank = index + 1;
                  const medal = getMedal(rank);
                  const isYou = item.isCurrent;

                  return (
                    <tr
                      key={item.id}
                      className={`lb-row group transition-colors duration-150 border-b border-white/[0.06] last:border-b-0 ${
                        isYou
                          ? "bg-violet-500/10"
                          : index % 2 === 0
                            ? "bg-transparent"
                            : "bg-white/[0.015]"
                      } hover:bg-white/[0.05]`}
                    >
                      {/* Rank */}
                      <td className="py-5 pl-7 pr-3">
                        <div className="flex items-center gap-2">
                          {medal ? (
                            <span className="text-xl leading-none">{medal}</span>
                          ) : (
                            <span className={`text-sm font-bold tabular-nums ${getRankColor(rank)}`}>{rank}</span>
                          )}
                        </div>
                      </td>

                      {/* Student */}
                      <td className="py-5 px-5">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold border-2 ${
                            rank === 1 ? "border-yellow-400/60 bg-yellow-400/15 text-yellow-300" :
                            rank === 2 ? "border-slate-300/60 bg-slate-300/15 text-slate-200" :
                            rank === 3 ? "border-amber-500/60 bg-amber-500/15 text-amber-300" :
                            "border-white/10 bg-white/[0.04] text-ink-low"
                          }`}>
                            {item.userName?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`text-[15px] font-semibold truncate ${rank <= 3 ? "text-white" : "text-ink"}`}>
                              {item.userName}
                            </span>
                            {isYou && (
                              <span className="shrink-0 rounded-full bg-sky/15 border border-sky/30 px-2 py-0.5 text-[10px] font-bold uppercase text-sky">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Quiz */}
                      {activeTab === "all" && (
                        <td className="py-5 px-5">
                          <span className="text-sm text-ink-low group-hover:text-ink transition-colors">
                            {item.quizTitle}
                          </span>
                        </td>
                      )}

                      {/* Score */}
                      <td className="py-5 pl-5 pr-7 text-right">
                        <span className={`text-base font-bold tabular-nums ${rank <= 3 ? getRankColor(rank) : "text-violet-400"}`}>
                          {item.score}
                        </span>
                        <span className="ml-1.5 text-[11px] font-medium text-ink-faint uppercase">pts</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Desktop footer */}
            <div className="border-t border-white/[0.06] bg-white/[0.02] px-7 py-3.5 flex items-center justify-between">
              <span className="text-xs font-medium text-ink-faint">
                Top {filteredEntries.length} {filteredEntries.length === 1 ? "entry" : "entries"}
              </span>
              <span className="text-xs font-medium text-ink-faint">
                {activeTab === "all" ? "All quizzes" : TABS.find((t) => t.id === activeTab)?.label}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
