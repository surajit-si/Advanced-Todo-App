"use client";

import { useState } from "react";
import { type Todo } from "./TodoContainer";
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";

export default function Todo({ todo }: { todo: Todo }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="mx-2 flex justify-center flex-col border-t border-b border-[hsla(0,0%,0%,0.5)] cursor-pointer transition-all duration-200 "
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-2 px-2 relative py-2 ">
        <ChevronUp
          color="#0B0B0B"
          opacity={"60%"}
          className={`${isOpen && "rotate-180"} transition-transform`}
        />

        {/* Task */}
        <p className="opacity-70! ">Task</p>

        {/* Timer */}
        <span className="border-[hsla(0,0%,0%)] opacity-70 border py-1 px-2 rounded-full absolute left-1/2 -translate-x-1/2">
          12:00
        </span>
        {/* Buttons */}
        <span className="absolute right-2 inline-flex items-center gap-3 p-2 min-w-max whitespace-nowrap">
          <Trash className="text-danger cursor-pointer shrink-0 h-7 w-7 p-1 content-box rounded-sm hover:bg-[#0000002c]! transition-colors duration-200" />
          <Pencil className="text-black cursor-pointer shrink-0 h-7 w-7 p-1 content-box rounded-sm hover:bg-[#0000002c]! transition-colors duration-200" />
        </span>
      </div>

      {/* Description */}

      {isOpen && (
        <div className="">
          <p className="pl-6 opacity-70">Description:-</p>
          <p className="opacity-50 pl-8 pb-2 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
            architecto veniam, dignissimos ex cumque quidem ut aut ducimus
            veritatis rerum earum libero enim dolorem consectetur nesciunt,
            dolore asperiores minima porro.
          </p>
        </div>
      )}
    </div>
  );
}
