import { db } from "../firebase/firebase";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import EmptyState from "./ui/EmptyState";
import { Skeleton } from "./ui/Skeleton";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();
  
  const [userDetails, setUserDetails] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [quizScores, setQuizScores] = useState({});
  const [loading, setLoading] = useState(true);

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
        <div className="mx-auto max-w-4xl space-y-6 animate-fade-up">
          <Card className="flex flex-col items-center justify-between gap-6 p-6 sm:flex-row md:p-8">
            <div className="flex items-center gap-6">
              {currentUser.photoURL ? (
                 <img src={currentUser.photoURL} referrerPolicy="no-referrer" alt="Profile" className="h-20 w-20 flex-none rounded-full border-4 border-white/10" />
              ) : (
                <div className="grid h-20 w-20 flex-none place-items-center rounded-full bg-gradient-to-tr from-violet-600 to-sky text-3xl font-extrabold text-white shadow-glow">
                  {userDetails?.fullName ? userDetails.fullName.charAt(0).toUpperCase() : "S"}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">{userDetails?.fullName || currentUser.displayName || "Student"}</h1>
                <p className="mt-1 text-sm text-ink-low">{userDetails?.email}</p>
              </div>
            </div>
            <Button variant="danger" onClick={handleLogout}>
              <Icon name="logout" size={16} /> Log out
            </Button>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Courses Section */}
            <Card className="p-6 md:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink-hi">
                <span className="text-sky"><Icon name="book" size={18} /></span> Enrolled Courses
              </h2>
              {enrolledCourses.length > 0 ? (
                <ul className="space-y-3">
                  {enrolledCourses.map((c) => (
                    <li key={c.courseId} className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-low">{c.category}</p>
                      <h3 className="mt-1 font-semibold text-ink-hi">{c.title}</h3>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-low">You haven&rsquo;t enrolled in any courses yet.</p>
              )}
            </Card>

            {/* Quiz Scores Section */}
            <Card className="p-6 md:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink-hi">
                <span className="text-sky"><Icon name="trophy" size={18} /></span> Quiz High Scores
              </h2>
              {Object.keys(quizScores).length > 0 ? (
                <ul className="space-y-3">
                  {Object.entries(quizScores).map(([title, score]) => (
                    <li key={title} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/20 p-4">
                      <h3 className="font-semibold text-ink-hi">{title}</h3>
                      <span className="flex items-center gap-1 text-sm font-bold text-violet-400">
                        {score} pts
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-low">You haven&rsquo;t taken any quizzes yet.</p>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
