import User from "../models/User.js";
import Partner from "../models/Partner.js";

export const submitCheckIn = async (req, res) => {
  try {
    const { userId, partnerId } = req.body;
    const user = await User.findById(userId);
    const partner = await Partner.findById(partnerId);

    if (!user || !partner) return res.status(404).json({ message: "User or Partner not found" });

    partner.pendingCheckIns.push({ userId, userName: user.name, email: user.email, status: "Pending" });
    await partner.save();

    res.json({ message: "Check-in request submitted" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting check-in", error });
  }
};

export const approveCheckIn = async (req, res) => {
  try {
    const { partnerId, userId } = req.body;
    const partner = await Partner.findById(partnerId);
    const user = await User.findById(userId);

    if (!partner || !user) return res.status(404).json({ message: "User or Partner not found" });

    user.checkIns.push({ partnerId, partnerName: partner.companyName, status: "Approved" });
    await user.save();

    partner.pendingCheckIns = partner.pendingCheckIns.filter((p) => p.userId !== userId);
    await partner.save();

    res.json({ message: "Check-in approved" });
  } catch (error) {
    res.status(500).json({ message: "Error approving check-in", error });
  }
};
