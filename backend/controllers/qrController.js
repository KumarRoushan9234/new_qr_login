import QRCode from "qrcode";
import Partner from "../models/Partner.js";

export const generateQRCode = async (req, res) => {
  try {
    const { companyName, email, phone } = req.body;
    const qrData = { companyName, email, phone };
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

    const partner = new Partner({ companyName, email, phone, qrCode });
    await partner.save();

    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ message: "Error generating QR code", error });
  }
};
