import mongoose from "mongoose";

const partsSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    motorcycle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Motorcycle",
      required: true,
    },
    partName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    dateBought: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["good", "bad", "needs replacement"],
      default: "good",
    },
    lastMaintenance: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Part", partsSchema);
