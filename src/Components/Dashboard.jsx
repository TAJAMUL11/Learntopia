import { auth, db } from "../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const logOutNavigation = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
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
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      logOutNavigation('/login', { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-8 flex flex-col items-center justify-center min-h-[80vh] select-none text-white">
      {loading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-button-bg-color border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading student profile...</p>
        </div>
      ) : userDetails ? (
        <div className="w-full max-w-md background-blur p-6 md:p-8 rounded-3xl border border-light-bg-color shadow-custom-shadow text-center">
          {/* Avatar Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-button-bg-color to-highlighted-btn-bg flex items-center justify-center text-3xl font-extrabold text-white mx-auto mb-6 shadow-lg shadow-button-bg-color/20">
            {userDetails.fullName ? userDetails.fullName.charAt(0).toUpperCase() : "S"}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide mb-2">Student Dashboard</h1>
          <p className="text-sm text-gray-400 mb-6">Manage your account and view enrolled course progress.</p>

          {/* Details list */}
          <div className="text-left space-y-4 bg-black/20 rounded-2xl p-4 border border-white/5 mb-6 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-gray-400">Full Name</span>
              <span className="font-semibold text-gray-200">{userDetails.fullName}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-400">Email Address</span>
              <span className="font-semibold text-gray-200">{userDetails.email}</span>
            </div>
          </div>

          {/* Log Out button */}
          <button className="w-full btn-style py-3 font-semibold uppercase tracking-wider text-xs shadow-md active:scale-95" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md background-blur p-6 md:p-8 rounded-3xl border border-light-bg-color shadow-custom-shadow text-center">
          <h2 className="text-xl font-bold mb-4">No Profile Active</h2>
          <p className="text-sm text-gray-400 mb-6">Please log in to view your dashboard.</p>
          <button className="w-full btn-style py-3" onClick={() => logOutNavigation('/login')}>
            Log In Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

