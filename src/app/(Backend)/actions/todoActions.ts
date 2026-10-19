"use server";

import mongoose from "mongoose";
import { Profile } from "../db/model/Profile.schema";
import { ITodo, Todo } from "../db/model/Todo.schema";
import { IUser } from "../db/model/User.schema";
import { verifyUser } from "./userActions";

export async function createTodo({
  task,
  description,
  deadline,
  tags,
}: {
  task: string;
  description?: string;
  deadline: Date;
  tags: string[];
}) {
  try {
    const user = await verifyUser();
    if (!user.success) {
      return;
    }

    const userData = user.data as IUser;

    //find the profile
    const profile = await Profile.findOne({
      name: userData.selectedProfile,
      user: userData._id,
    });

    if (!profile) {
      return;
    }

    const gap = deadline.getMilliseconds() - Date.now() <= 1000 * 60;

    // const calcDeadline = deadline ? deadline : null;

    const newTodo: ITodo = {
      task: task.trim(),
      description: description?.trim() || "",
      isCompleted: false,
      tags: tags,
      reminder: null,
      completedAt: null,
      createdAt: new Date(),
      deadline: gap ? null : deadline,
      profile: new mongoose.Types.ObjectId(profile._id),
      user: new mongoose.Types.ObjectId(userData._id),
    };

    const todo = await Todo.create(newTodo);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }
}

export async function deleteTodo(todoId: string) {
  try {
    const user = await verifyUser();
    if (!user.success) {
      return;
    }

    await Todo.findByIdAndDelete(todoId);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }
}

export async function markTodoState(
  todoId: string,
  currentState: "completed" | "pending",
) {
  try {
    const user = await verifyUser();
    if (!user.success) {
      return;
    }

    const todo = await Todo.findByIdAndUpdate(todoId, {
      isCompleted: currentState === "completed" ? true : false,
      completedAt: currentState === "completed" ? new Date() : null,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }
}
