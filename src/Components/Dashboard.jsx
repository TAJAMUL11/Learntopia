import { auth, db } from "../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import EmptyState from "./ui/EmptyState";
import { Skeleton } from "./ui/Skeleton";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Single auth listener, properly torn down on unmount (no leak).
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docUser = await getDoc(docRef);
          if (docUser.exists()) {
            setUserDetails(docUser.data());
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setUserDetails(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container-page flex min-h-[80vh] flex-col items-center justify-center py-14 text-ink-hi">
      {loading ? (
        // Skeleton profile card while Firestore loads
        <Card className="w-full max-w-md p-8 text-center">
          <Skeleton className="mx-auto mb-6 h-20 w-20 rounded-full" />
          <Skeleton className="mx-auto mb-2 h-6 w-40" />
          <Skeleton className="mx-auto mb-6 h-3 w-56" />
          <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="mt-6 h-11 w-full rounded-xl" />
        </Card>
      ) : userDetails ? (
        <Card className="w-full max-w-md animate-fade-up p-8 text-center">
          {/* Avatar */}
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-tr from-violet-600 to-sky text-3xl font-extrabold text-white shadow-glow">
            {userDetails.fullName ? userDetails.fullName.charAt(0).toUpperCase() : "S"}
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Student Dashboard</h1>
          <p className="mt-1.5 text-sm text-ink-low">Manage your account and view your learning profile.</p>

          {/* Details */}
          <div className="mt-6 space-y-1 rounded-2xl border border-white/[0.06] bg-black/20 p-4 text-sm">
            <div className="flex items-center justify-between border-b border-white/[0.06] py-2">
              <span className="flex items-center gap-2 text-ink-low"><Icon name="user" size={15} /> Full name</span>
              <span className="font-semibold text-ink-hi">{userDetails.fullName || "—"}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="flex items-center gap-2 text-ink-low"><Icon name="mail" size={15} /> Email</span>
              <span className="font-semibold text-ink-hi">{userDetails.email}</span>
            </div>
          </div>

          <Button variant="danger" fullWidth className="mt-6" onClick={handleLogout}>
            <Icon name="logout" size={16} /> Log out
          </Button>
        </Card>
      ) : (
        <Card className="w-full max-w-md p-8">
          <EmptyState
            icon="user"
            title="No active profile"
            description="Please log in to view your student dashboard."
            action={<Button onClick={() => navigate("/login")}>Log in now</Button>}
          />
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
