import mongoose, { model, Schema } from "mongoose";

export interface ITodo {
  _id: string;
  task: string;
  deadline: Date;
  tags: string[];
  isCompleted: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
  reminder: Date | null;
  profile: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const TodoSchema: Schema<ITodo> = new Schema<ITodo>({
  task: { type: String, required: true },
  deadline: { type: Date, required: false },
  tags: [{ type: String }],
  isCompleted: { type: Boolean, default: false },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
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

export const Todo = model<ITodo>("Todo", TodoSchema);
