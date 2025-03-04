import { useState } from "react";
import RequestModal from "../components/RequestModal";

const Request = () => {
  // Dummy requests data
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      message: "Interested in your services.",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      message: "Would like to collaborate.",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Requests</h1>

      {requests.length === 0 ? (
        <p>No requests available.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req.id}
              className="p-4 border rounded-md shadow-sm bg-white hover:bg-gray-100 cursor-pointer"
              onClick={() => openModal(req)}
            >
              <p className="text-lg font-semibold">{req.name}</p>
              <p className="text-sm text-gray-600">{req.email}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Modal Component */}
      {isModalOpen && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setIsModalOpen(false)}
          setRequests={setRequests}
        />
      )}
    </div>
  );
};

export default Request;
