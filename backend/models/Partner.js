import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    companyName: { 
      type: String, 
      required: true, 
      // trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true 
    },
    phone: { 
      type: String, 
      required: true, 
      unique: true 
    },

    qrCode: { 
      type: String 
    }, // QR Code Image URL/Base64

    pendingCheckIns: [
      {
        userId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User" 
        },
        userName: { 
          type: String 
        },
        email: { 
          type: String 
        },
        status: { 
          type: String, 
          enum: ["Pending", "Approved", "Rejected"], 
          default: "Pending" 
        },
        requestedAt: { 
          type: Date, 
          default: Date.now 
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Partner", PartnerSchema);
