export type Todo = {
  id: string;
  task: string;
  deadline: number;
  tags: string[];
  state: "completed" | "pending";
  description?: string;
  completedAt?: number;
  reminderAt?: number[];
};

export function filterByTag({
  rawTodo,
  tag,
}: {
  rawTodo: Todo[];
  tag: string;
}): Todo[] {
  if (tag === "All") {
    return rawTodo;
  } else if (tag === "completed") {
    return rawTodo.filter((todo) => todo.state === "completed");
  } else if (tag === "pending") {
    return rawTodo.filter((todo) => todo.state === "pending");
  }

  return rawTodo.filter((todo) => todo.tags.includes(tag));
}
