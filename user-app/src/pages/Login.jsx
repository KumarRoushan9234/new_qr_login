import { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(email, password);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded mt-2"
      />
      <button
        onClick={handleLogin}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
