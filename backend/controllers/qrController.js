import QRCode from "qrcode";
import Partner from "../models/Partner.js";

export const generateQRCode = async (req, res) => {
  try {
    const partnerId = req.user.id; // Get authenticated partner ID

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    const qrData = {
      companyName: partner.companyName,
      email: partner.email,
      phone: partner.phone,
      partnerId: partner._id,
    };

    // Generate QR Code as Data URL
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

    // Save QR Code in the database
    partner.qrCode = qrCode;
    await partner.save();

    res.json({ message: "QR Code generated successfully", qrCode });
  } catch (error) {
    console.error("Error generating QR Code:", error);
    res.status(500).json({ message: "Error generating QR Code", error });
  }
};

// export const generateQRCode = async (req, res) => {
//   try {
//     const { companyName, email, phone } = req.body;
//     const qrData = { companyName, email, phone };
//     const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

//     const partner = new Partner({ companyName, email, phone, qrCode });
//     await partner.save();

//     res.json({ qrCode });
//   } catch (error) {
//     res.status(500).json({ message: "Error generating QR code", error });
//   }
// };
