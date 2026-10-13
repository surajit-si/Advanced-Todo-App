"use client";

import { useUser } from "@/app/context/UserContext";
import Todo from "./Todo";
import { IProfile, ITodo, IUser } from "../navbar/localstorage";

export type Todo = {
  task: string;
  deadline: number;
  tags: string[];
  state: "completed" | "pending";
  description?: string;
  completedAt?: number;
  reminderAt?: number[];
};

const selectedTags: string[] = ["shopping", "errands"];

export default function TodoContainer({ className }: { className?: string }) {
  const { user } = useUser();
  const localUser = user as IUser | null;

  const selectedIdx = localUser?.profiles.findIndex((val) => {
    return val.name === localUser?.selectedProfile;
  });

  const todoList: Todo[] =
    localUser && selectedIdx !== undefined && selectedIdx >= 0
      ? localUser.profiles[selectedIdx].todos.map((todo: ITodo) => ({
          task: todo.task,
          deadline: todo.deadline
            ? new Date(todo.deadline).getTime()
            : Date.now(),
          tags: todo.tags ?? [],
          state: todo.isCompleted ? "completed" : "pending",
          description: todo.description,
          completedAt: todo.completedAt
            ? new Date(todo.completedAt).getTime()
            : undefined,
          reminderAt: todo.reminderAt
            ? [new Date(todo.reminderAt).getTime()]
            : undefined,
        }))
      : [];

  return (
    <div
      className={`${className} todo-container flex flex-col w-full h-max overflow-y-scroll`}
    >
      {todoList.map((todo, idx) => {
        return <Todo todo={todo} idx={idx} key={idx} />;
      })}
    </div>
  );
}
