import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Partner from "../models/Partner.js";
import QRCode from "qrcode";

// Partner Registration
export const registerPartner = async (req, res) => {
  try {
    // Extract partner data from request body
    const { companyName, email, phone, password} = req.body;

    if (!companyName || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if partner already exists
    const existingPartner = await Partner.findOne({ email });
    if (existingPartner) {
      console.log("Partner already exists");
      return res.status(400).json({ message: "Partner already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new partner instance
    const partnerData = {
      companyName,
      email,
      phone,
      password: hashedPassword,
    };


    const partner = new Partner(partnerData);
    await partner.save();
    console.log("Partner registered successfully");

    res.status(201).json({ message: "Partner registered successfully" });

  } catch (error) {
    console.error("Partner Registration error:", error);
    res.status(500).json({ message: "Error registering partner", error });
  }
};

export const loginPartner = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received Partner Login Request for:", email);

    const partner = await Partner.findOne({ email });
    if (!partner) {
      console.log("Partner not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, partner.password);
    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Partner authenticated, generating token...");
    const token = jwt.sign({ id: partner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, partner });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const updatePartnerProfile = async (req, res) => {
  try {
    const partner = await Partner.findById(req.user.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    // Extract fields from request body
    const {
      companyMotto,
      companyDetails,
      industryType,
      website,
      logo,
      address,
    } = req.body;

    // Update the fields if provided
    if (companyMotto) partner.companyMotto = companyMotto;
    if (companyDetails) partner.companyDetails = companyDetails;
    if (industryType) partner.industryType = industryType;
    if (website) partner.website = website;
    if (logo) partner.logo = logo;
    if (address) {
      partner.address = {
        ...partner.address,
        ...address, // Merge new address fields with existing
      };
    }

    await partner.save();
    res.json({ message: "Partner profile updated successfully", partner });

  } catch (error) {
    console.error("Error updating partner profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// Get Partner Profile
export const getPartnerProfile = async (req, res) => {
  try {
    const partner = await Partner.findById(req.user.id).select("-password");
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    res.json(partner);
  } catch (error) {
    console.error("Error fetching partner profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Generate QR Code for Partner
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

    // Generate QR Code
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

    // Update the partner's record with the new QR code
    partner.qrCode = qrCode;
    await partner.save();

    res.json({ message: "QR Code generated successfully", qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ message: "Error generating QR code" });
  }
};

// Approve/Reject Check-In Request
export const updateCheckInStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "Approved" or "Rejected"

    const partner = await Partner.findById(req.user.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    const checkIn = partner.pendingCheckIns.find(checkIn => checkIn._id.toString() === id);
    if (!checkIn) return res.status(404).json({ message: "Check-in request not found" });

    checkIn.status = status;
    await partner.save();

    res.json({ message: `Check-in ${status}`, checkIn });

  } catch (error) {
    console.error("Error updating check-in status:", error);
    res.status(500).json({ message: "Error updating check-in status" });
  }
};


