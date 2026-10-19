import mongoose, { Schema, model } from "mongoose";
import { IProfile } from "./Profile.schema";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  profiles: IProfile[];
  selectedProfile: string;
  isVerified: boolean;
  isSignedIn: boolean;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    selectedProfile: {
      type: String,
    },
    isVerified: { type: Boolean, default: false },
    isSignedIn: { type: Boolean, default: true },
  },
  { timestamps: true },
);;

export const User = model("User", UserSchema);
