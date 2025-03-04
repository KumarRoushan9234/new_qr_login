import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ScanQR from "./pages/ScanQR";
import LandingPage from "./pages/Landing/LandingPage";
import Companies from "./pages/Companies";
import FloatingHelp from "./components/FloatingHelp";
import "./index.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      {isAuthenticated && <Sidebar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Landing Page when not logged in */}
        <Route
          path="/"
          element={isAuthenticated ? <Companies /> : <LandingPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <ScanQR />
            </ProtectedRoute>
          }
        />
        <Route
          // path="/scan"
          element={
            <ProtectedRoute>
              <FloatingHelp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
