import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

import { FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [search, setSearch] = useState("");

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-800">
      <h3>User-APP</h3>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-1/3 dark:bg-gray-700"
      />
      <div className="flex items-center gap-4">
        <FiUser className="text-xl cursor-pointer" />
        {user ? (
          <FiLogOut
            onClick={logout}
            className="text-xl cursor-pointer text-red-500"
          />
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
