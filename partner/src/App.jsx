import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import usePartnerAuthStore from "./store/usePartnerStore";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Auth/Login";
import ScanQR from "./pages/ScanQR";
import LandingPage from "./pages/Landing/LandingPage";
import FloatingHelp from "./components/FloatingHelp";
import Request from "./pages/Request";
import GenerateQR from "./pages/GenerateQR";
import "./index.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = usePartnerAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const { isAuthenticated } = usePartnerAuthStore();

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}

      {/* Main Layout */}
      <div className="flex">
        {isAuthenticated && <Sidebar />}

        {/* Main Content */}
        <div className="flex-1 p-6 relative">
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Landing Page when not logged in */}
            <Route
              path="/"
              element={isAuthenticated ? <Request /> : <LandingPage />}
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
              path="/generate-qr"
              element={
                <ProtectedRoute>
                  <GenerateQR />
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* ✅ Floating Help: Visible ONLY when authenticated */}
          {isAuthenticated && <FloatingHelp />}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
