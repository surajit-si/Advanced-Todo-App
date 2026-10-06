import { useRouter } from "next/router";

export type ITodo = {
  task: string;
  deadline: Date;
  tags: string[];
  isCompleted: boolean;
  description: string;
  createdAt: Date;
  completed: boolean;
  completedAt: Date | null;
  reminderAt?: Date;
};
export type IProfile = {
  profileName: string;
  todos: ITodo[];
};
export type ITodoApp = IProfile[];

export function createLocalStorageTemplate() {
  const todoApp = window.localStorage.getItem("todoApp");

  if (!todoApp) {
    window.localStorage.setItem(
      "todoApp",
      JSON.stringify([{ profileName: "Guest", todos: [] }]),
    );
  }
}

export function getLocalData() {
  const todoApp = localStorage.getItem("todoApp");
  if (!todoApp) {
    createLocalStorageTemplate();
    const router = useRouter();
    router.reload();
  }

  const todoObj: ITodoApp = JSON.parse(todoApp as string);
  return todoObj;
}
