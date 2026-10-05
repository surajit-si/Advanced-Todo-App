import { model, Schema } from "mongoose";

interface IOtp {
  _id: string;
  userId: string;
  code: string;
  expires: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    userId: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "5m",
    },
  },
  { timestamps: true },
);

export const Otp = model("Otp", OtpSchema);
