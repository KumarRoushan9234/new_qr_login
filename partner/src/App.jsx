import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import usePartnerAuthStore from "./store/usePartnerStore";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Auth/Login";
import ScanQR from "./pages/ScanQR";
import LandingPage from "./pages/Landing/LandingPage";
import Request from "./pages/Request";
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
      {isAuthenticated && <Sidebar />}
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
