import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  todos: mongoose.Types.ObjectId[];
  profiles: mongoose.Types.ObjectId[];
  selectedProfile: mongoose.Types.ObjectId;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
    profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    selectedProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true },
);

export const User = model("User", UserSchema);
