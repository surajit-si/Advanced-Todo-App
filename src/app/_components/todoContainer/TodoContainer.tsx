import Todo from "./Todo";

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
  const todoList: Todo[] = [
    {
      task: "Buy groceries",
      deadline: 1688006400000, // Example timestamp
      tags: ["shopping", "errands"],
      state: "pending",
      description: "Buy milk, eggs, and bread.",
      reminderAt: [1687920000000], // Example reminder timestamp
    },
    {
      task: "Finish project report",
      deadline: 1688092800000, // Example timestamp
      tags: ["work", "urgent"],
      state: "completed",
      completedAt: 1688006400000, // Example completion timestamp
    },
  ];
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
