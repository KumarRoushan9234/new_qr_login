import { useState, useEffect } from "react";
import API from "../api/api";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await API.get("/requests"); // Using API instance
        setRequests(response.data); // Assuming response.data is an array of requests
      } catch (err) {
        setError("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Open the modal
  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    try {
      await API.put("/requests/update-status", {
        requestId: selectedRequest.id,
        status: newStatus,
      });

      // Update UI instantly
      setRequests(
        (prev) =>
          prev
            .map((r) =>
              r.id === selectedRequest.id ? { ...r, status: newStatus } : r
            )
            .filter((r) => r.status === "Pending") // Remove non-pending requests
      );

      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Requests</h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req.id}
              className="p-4 border rounded-md shadow-sm bg-white hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => openModal(req)}
            >
              <div>
                <p className="text-lg font-semibold">{req.name}</p>
                <p className="text-sm text-gray-600">{req.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  req.status === "Pending"
                    ? "bg-yellow-300 text-gray-800"
                    : req.status === "Approved"
                    ? "bg-green-400 text-white"
                    : "bg-red-400 text-white"
                }`}
              >
                {req.status}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Modal Inside the Same Page */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Request Details</h2>
            <p className="text-gray-700">{selectedRequest.name}</p>
            <p className="text-gray-500 text-sm">{selectedRequest.email}</p>
            <p className="text-gray-500 text-sm">{selectedRequest.message}</p>
            <p className="text-gray-500 text-sm mt-2 font-semibold">
              Status: {selectedRequest.status}
            </p>

            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={() => handleStatusChange("Approved")}
              >
                Approve
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleStatusChange("Rejected")}
              >
                Reject
              </button>
            </div>

            <button
              className="mt-4 w-full text-gray-500 underline"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
