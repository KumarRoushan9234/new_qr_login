import { useLocation } from "react-router-dom";
import { useState } from "react";

const CheckIn = () => {
  const location = useLocation();
  const qrData = location.state || {};

  console.log("Qr-Code Data : ", qrData);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCheckedIn(true);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen p-4">
      {/* Left Side: QR Code Info */}
      <div className="w-full md:w-1/2 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">QR Code Info:</h2>
        <p className="p-2 bg-gray-700 rounded border border-gray-600">
          <strong>Company Name:</strong> {qrData.companyName || "N/A"}
        </p>
        <p className="p-2 bg-gray-700 rounded border border-gray-600">
          <strong>Email:</strong> {qrData.email || "N/A"}
        </p>
        <p className="p-2 bg-gray-700 rounded border border-gray-600">
          <strong>Phone:</strong> {qrData.phone || "N/A"}
        </p>
        <p className="p-2 bg-gray-700 rounded border border-gray-600">
          <strong>Partner ID:</strong> {qrData.partnerId || "N/A"}
        </p>
      </div>

      {/* Right Side: Check-in Form */}
      <div className="w-full md:w-1/2 p-6">
        {!isCheckedIn ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Check-in Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded"
              >
                Confirm Check-in
              </button>
            </form>
          </>
        ) : (
          // Confirmation Message
          <div className="p-6 bg-green-100 border border-green-500 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-700">
              ✅ Check-in Request Confirmed
            </h2>
            <p className="text-amber-600 mt-2">
              <strong>Company Name:</strong> {qrData.companyName || "N/A"}
            </p>
            <p className="text-amber-600 mt-2">
              <strong>Email:</strong> {qrData.email || "N/A"}
            </p>
            <p className="text-amber-600 mt-2">
              <strong>Phone:</strong> {qrData.phone || "N/A"}
            </p>
            <hr className="text-black my-4" />
            <p className="text-amber-600 mt-2">
              <strong>Your Name:</strong> {formData.name}
            </p>
            <p className="text-amber-600 mt-2">
              <strong>Your Phone:</strong> {formData.phone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
