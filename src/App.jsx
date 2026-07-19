import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard";
import Doc from "./pages/Doc";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doc" element={<Doc />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="toastbody"
        transition={Slide}
      />
    </AuthProvider>
  );
};

export default App;
