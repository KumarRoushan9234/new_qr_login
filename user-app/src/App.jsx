import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import ScanQR from "./pages/ScanQR";
import "./index.css";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Sidebar />
    <Routes>
      <Route path="/" element={<h1>Landing Page</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/scan" element={<ScanQR />} />
    </Routes>
  </BrowserRouter>
  // <div>
  //   <h1 class="text-3xl font-bold underline">Hello world!</h1>
  // </div>
);

export default App;
