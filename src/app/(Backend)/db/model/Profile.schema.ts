import mongoose, { Schema } from "mongoose";
import { ITodo } from "./Todo.schema";

export interface IProfile {
  _id: string;
  name: string;
  user: string | mongoose.Types.ObjectId;
  todos: ITodo[];
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
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  },
  {},
);

export const Profile = mongoose.model("Profile", ProfileSchema);
