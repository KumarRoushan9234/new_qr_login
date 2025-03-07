import { useState, useEffect } from "react";
import API from "../api/api";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("partner-token");
        if (!token) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          console.log("Authentication required. Please log in.");
          return;
        }

        const response = await API.get("/checkin/partner-checkins", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);

        setRequests(response.data.pendingCheckIns || []);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError(err.response?.data?.message || "Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Check-In Requests</h1>

      {loading && <p className="text-blue-600">Loading requests...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && requests.length === 0 ? (
        <p className="text-gray-500">No pending check-in requests.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id} // Use _id as the unique key
              className="p-4 border rounded-md shadow-sm bg-white"
            >
              <p className="text-lg font-semibold">{req.userName}</p>
              <p className="text-sm text-gray-600">{req.email}</p>
              <p className="text-sm text-gray-500">
                Check-in Time: {new Date(req.requestedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Request;
