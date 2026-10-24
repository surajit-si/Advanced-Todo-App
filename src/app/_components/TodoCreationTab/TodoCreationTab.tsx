"use client";

import BetterInput from "@/app/(auth)/sign-up/BetterInput";
import DatetimeInput from "./DatetimeInput";
import { Info } from "lucide-react";
import TodoSection from "./TagsSection";
import { useState } from "react";
import { createTodoLocal, getLocalUser, IUser } from "../../utils/localstorage";
import { useProfile } from "@/app/context/ProfileContext";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { createPreferedTodo } from "@/app/_services/todo.services";
import { getPreferedUser } from "@/app/_services/user.services";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

export default function TodoCreationTab({
  className,
  container,
}: {
  className?: string;
  container: Element | DocumentFragment;
}) {
  const [todoTags, setTodoTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { profile } = useProfile();
  const { user, setUser } = useUser();

  const handleSubmit = async (formData: FormData) => {
    const task = formData.get("todo_task") as string;
    const description = formData.get("description") as string;
    const dateTime = formData.get("dateTime");
    const deadline = new Date(dateTime as string);

    createPreferedTodo(
      {
        task,
        description,
        deadline,
        tags: todoTags,
        selectedProfile: profile,
      },
      user?.isSignedIn as boolean,
    );
    //blank the tag state
    setTodoTags([]);
    setUser((await getPreferedUser()) as IUser);
  };

  //default dateTime
  function getLocalDatetimeString(date = new Date()) {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - tzOffset);
    return localDate.toISOString().slice(0, 16);
  }

  const router = useRouter();

  return createPortal(
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, type: "spring" }}
      action={handleSubmit}
      onSubmit={() => {
        router.push("?isCreating=false");
      }}
      className={`${className} w-[calc(100%-1rem)] max-w-108 p-4 rounded-lg bg-white flex flex-col gap-2 shadow-[0_0_20px_rgba(0,0,0,0.6)]`}
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
    </motion.form>,
    container,
  );
}
