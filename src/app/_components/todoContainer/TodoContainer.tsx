"use client";

import { useUser } from "@/app/context/UserContext";
import Todo from "./Todo";
import { IProfile, ITodo, IUser } from "../navbar/localstorage";
import { filterByTag } from "@/app/utils/filter.utils";
import { useSelectedTags } from "@/app/context/SelectedTagsContext";
import { useProfile } from "@/app/context/ProfileContext";

export type Todo = {
  task: string;
  deadline: number;
  tags: string[];
  state: "completed" | "pending";
  description?: string;
  completedAt?: number;
  reminderAt?: number[];
};

export default function TodoContainer({ className }: { className?: string }) {
  const { user } = useUser();
  const { profile } = useProfile();
  const localUser = user as IUser | null;

  const selectedIdx = localUser?.profiles.findIndex((val) => {
    return val.name === profile;
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

  const { selectedTags } = useSelectedTags();

  const filteredTodoList: Todo[] = filterByTag({
    rawTodo: todoList,
    tag: selectedTags,
  });

  return (
    <div
      className={`${className} todo-container flex flex-col w-full h-max overflow-y-scroll`}
    >
      {filteredTodoList.length > 0 ? (
        filteredTodoList.map((todo, idx) => {
          return <Todo todo={todo} idx={idx} key={idx} />;
        })
      ) : (
        <Todo
          todo={{
            task: "No tasks available.",
            deadline: 0,
            tags: [],
            state: "pending",
            description: "",
            completedAt: undefined,
            reminderAt: undefined,
          }}
          idx={0}
          key={0}
        />
      )}
    </div>
  );
}
