import { model, Schema } from "mongoose";

interface IOtp {
  _id: string;
  userId: string;
  code: string;
  expires: string;
}

const OtpSchema = new Schema<IOtp>({
  userId: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  expires: "5m",
});

export const Otp = model("Otp", OtpSchema);
