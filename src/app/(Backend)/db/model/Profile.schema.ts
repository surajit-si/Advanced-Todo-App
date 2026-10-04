import mongoose, { Schema } from "mongoose";

export interface IProfile {
  _id: string;
  name: string;
  user: mongoose.Types.ObjectId;
  profileTodos: mongoose.Types.ObjectId[];
}

const ProfileSchema: Schema<IProfile> = new Schema<IProfile>(
  {
    name: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
    },
  },
  {},
);

export const Profile = mongoose.model("Profile", ProfileSchema);
