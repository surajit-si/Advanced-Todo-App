"use client";

import BetterInput from "@/app/(auth)/sign-up/BetterInput";
import DatetimeInput from "./DatetimeInput";
import { Info } from "lucide-react";
import TodoSection from "./TagsSection";
import { useState } from "react";
import { createTodoLocal, getLocalUser } from "../../utils/localstorage";
import { useProfile } from "@/app/context/ProfileContext";
import { useUser } from "@/app/context/UserContext";

export default function TodoCreationTab({ className }: { className: string }) {
  const [todoTags, setTodoTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { profile } = useProfile();
  const { user, setUser } = useUser();

  const handleSubmit = (formData: FormData) => {
    const task = formData.get("todo_task") as string;
    const description = formData.get("description") as string;
    const dateTime = formData.get("dateTime");
    const deadline = new Date(dateTime as string);

    createTodoLocal({
      selectedProfile: profile,
      task,
      description,
      deadline,
      tags: todoTags,
    });
    setTodoTags([]);
    setUser(getLocalUser());
  };

  //default dateTime
  function getLocalDatetimeString(date = new Date()) {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - tzOffset);
    return localDate.toISOString().slice(0, 16);
  }

  return (
    <form
      action={handleSubmit}
      className={`${className} w-[calc(100%-1rem)] max-w-108 border p-4 rounded-lg shadow-md bg-white flex flex-col gap-2 `}
    >
      <BetterInput
        type="text"
        name="todo_task"
        placeholder="Task"
        parentClassName="h-8"
        lebelClassName="text-text-primary"
        className="text-text-primary"
      />
      <BetterInput
        type="text"
        name="description"
        placeholder="Description"
        parentClassName="h-16"
        lebelClassName="text-text-primary"
        className="text-text-primary"
      />
      {/* Date Time Input hidden */}
      <BetterInput
        type="datetime-local"
        name="dateTime"
        id="dateTime"
        defaultValue={getLocalDatetimeString()}
        parentClassName="h-0 w-0 p-0 hidden"
        tabIndex={-1}
        lebelClassName="text-text-primary p-0 hidden"
        className="p-0 hidden"
        onChange={(e) => {
          const date = new Date(e.target.value);
          setSelectedDate(date);
        }}
      />
      <DatetimeInput date={selectedDate} />

      {/* Tags */}
      <div>
        <BetterInput
          type="text"
          placeholder="Tags"
          name="tag"
          parentClassName="text-text-primary h-8"
          className=""
          required={false}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setTodoTags([...todoTags, e.currentTarget.value]);
              e.currentTarget.value = "";
              //focus on the input
              (e.target as HTMLInputElement).focus();
            }
          }}
        >
          <div className="" title={`Type Tag and press "Enter" to add.`}>
            <Info
              strokeWidth={3}
              size={"1rem"}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </BetterInput>
      </div>
      {/* Tags Section */}
      <TodoSection
        tagList={todoTags}
        setFn={(todoTagList) => {
          setTodoTags(todoTagList);
        }}
      />
      <button
        type="submit"
        className="py-1.5 rounded-xl bg-primary text-white shadow-[0_0_10px_#3a86ff] hover:scale-102 hover:shadow-[0_2px_10px_#3a86ff] transition-all duration-300 cursor-pointer"
      >
        Create
      </button>
    </form>
  );
}
