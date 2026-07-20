import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { COURSES } from "../data/coursesData";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import SectionHeading from "../Components/ui/SectionHeading";
import { Skeleton } from "../Components/ui/Skeleton";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

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

    const checkStatus = async () => {
      try {
        const docRef = doc(db, "Users", currentUser.uid, "enrolledCourses", c.id.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().completed) {
          setIsCompleted(true);
        } else if (!docSnap.exists()) {
          // If they somehow got here without enrolling, enroll them now automatically
          await setDoc(docRef, {
            courseId: c.id,
            title: c.title,
            category: c.category,
            enrolledAt: new Date(),
            completed: false
          });
        }
      } catch (err) {
        console.error("Error checking course status:", err);
      } finally {
        setLoadingData(false);
      }
    };
    checkStatus();
  }, [authLoading, currentUser, id, navigate]);

  const handleMarkComplete = async () => {
    if (!currentUser || !course) return;
    try {
      const docRef = doc(db, "Users", currentUser.uid, "enrolledCourses", course.id.toString());
      await setDoc(docRef, { completed: true, completedAt: new Date() }, { merge: true });
      setIsCompleted(true);
      toast.success("Course marked as completed! Great job!");
    } catch (err) {
      toast.error("Failed to mark as completed.");
      console.error(err);
    }
  };

  if (authLoading || loadingData || !course) {
    return (
      <div className="container-page py-16 md:py-20 text-ink-hi">
        <Card className="mx-auto w-full max-w-2xl p-8 text-center">
          <Skeleton className="mx-auto mb-6 h-40 w-40" />
          <Skeleton className="mx-auto mb-2 h-6 w-1/2" />
          <Skeleton className="mx-auto h-3 w-3/4" />
        </Card>
      </div>
    );
  }

  return (
    <div className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-4xl animate-fade-up">
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="flex h-32 w-48 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 shadow-[0_0_40px_rgba(255,255,255,0.03)]">
             <img src={course.image} alt={course.title} className="max-h-full max-w-full drop-shadow-2xl" />
          </div>
          <div>
            <span className="mb-2 inline-block rounded-full border border-white/[0.13] bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky">
              {course.category}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink-hi md:text-4xl">{course.title}</h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-low">{course.desc}</p>
          </div>
        </div>

        {/* Syllabus Section */}
        <SectionHeading
          eyebrow="Course Syllabus"
          title="What you will learn"
          description="A step-by-step interactive journey designed just for you."
        />

        <div className="mt-8 space-y-4">
          {course.syllabus.map((module, index) => (
            <Card key={index} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start md:p-6">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-violet-500/20 text-lg font-extrabold text-violet-400">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink-hi">{module.title}</h3>
                <p className="mt-1 text-ink-low">{module.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 text-center sm:flex-row sm:text-left">
          <div>
            <h4 className="text-xl font-bold text-ink-hi">
              {isCompleted ? "🎉 You've finished this course!" : "Ready to finish?"}
            </h4>
            <p className="mt-1 text-sm text-ink-low">
              {isCompleted 
                ? "This course is marked as completed on your dashboard."
                : "Complete all modules and mark this course as finished to track your progress."}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
            {!isCompleted && (
              <Button onClick={handleMarkComplete}>Mark as Complete</Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetails;
