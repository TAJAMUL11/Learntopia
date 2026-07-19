import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// React Router keeps the previous scroll position on navigation, which lands
// the user mid-page. Reset to the top whenever the route changes.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // "instant" overrides the CSS `scroll-behavior: smooth` so navigation snaps
    // to the top rather than animating.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
