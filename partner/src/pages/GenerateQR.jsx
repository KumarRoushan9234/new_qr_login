import { useState } from "react";
import usePartnerStore from "../store/usePartnerStore";
import API from "../api/api";

const GenerateQR = () => {
  const { token } = usePartnerStore();
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateQR = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await API.post(
        "/partners/generate-qr",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQrCode(response.data.qrCode);
    } catch (err) {
      setError("Failed to generate QR Code. Try again.");
      console.error(err);
    }

    setLoading(false);
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "Partner_QR_Code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">Generate Partner QR Code</h2>

      {error && <p className="text-red-500">{error}</p>}

      {qrCode ? (
        <div>
          <img
            src={qrCode}
            alt="Partner QR Code"
            className="w-48 h-48 mx-auto mb-4"
          />
          <button
            onClick={downloadQRCode}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download QR Code
          </button>
        </div>
      ) : (
        <button
          onClick={handleGenerateQR}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Generating..." : "Generate QR Code"}
        </button>
      )}
    </div>
  );
};

export default GenerateQR;
