import mongoose, { model, Schema } from "mongoose";

export interface ITodo {
  _id?: string;
  task: string;
  deadline: Date | null;
  tags: string[];
  isCompleted: boolean;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  completedAt: Date | null;
  reminder: Date | null;
  profile: string | mongoose.Types.ObjectId;
  user: string | mongoose.Types.ObjectId;
}

const TodoSchema: Schema<ITodo> = new Schema<ITodo>({
  task: { type: String, required: true },
  deadline: { type: Date, required: false },
  tags: [{ type: String }],
  isCompleted: { type: Boolean, default: false },
  description: { type: String, required: false },
  completedAt: { type: Date, required: false },
  reminder: { type: Date, required: false },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Todo = model("Todo", TodoSchema);
