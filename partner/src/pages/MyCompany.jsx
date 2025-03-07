import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import usePartnerStore from "../store/PartnerStore";

const Mypartner = () => {
  const { partner } = usePartnerStore();

  if (!partner) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">My partner</h2>

      <div className="flex gap-6 items-center">
        {/* Left Side - QR Code */}
        <div className="text-center">
          <QRCodeCanvas value={partner._id} size={150} />
          <p className="text-gray-500 mt-2">Scan Me</p>
        </div>

        {/* Right Side - Basic Details */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{partner.name}</h3>
          <p>Email: {partner.email}</p>
          <p>Phone: {partner.phone}</p>
          <div>
            <h3>Address:</h3>
            <p>{partner.address.street}</p>
            <p>
              {partner.address.city}, {partner.address.state},{" "}
              {partner.address.country} - {partner.address.zipCode}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Details Below */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Additional Details</h3>
        <p>Industry: {partner.industry || "N/A"}</p>
        <p>Website: {partner.website || "N/A"}</p>
        <p>Description: {partner.description || "N/A"}</p>
      </div>
    </div>
  );
};

export default Mypartner;
