import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    companyName: { 
      type: String, 
      required: true, 
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
    password: { 
      type: String, 
      required: true 
    },
    qrCode: { 
      type: String 
    },
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



// const removeFirebaseIndex = async () => {
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   console.log("MongoDB Connected");

//   try {
//     await Partner.collection.dropIndex("firebaseUid_1");
//     console.log("Dropped firebaseUid index");
//   } catch (err) {
//     console.log("Index does not exist or already removed.");
//   }

//   mongoose.disconnect();
// };

// removeFirebaseIndex();
