"use client";

import { useState } from "react";
import { type Todo } from "./TodoContainer";
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";

export default function Todo({ todo }: { todo: Todo }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div
      className="mx-2 min-h-13! flex justify-center flex-col border-t border-b border-[hsla(0,0%,0%,0.5)] relative cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-2 px-2">
        {isOpen ? (
          <ChevronUp color="#0B0B0B" opacity={"60%"} />
        ) : (
          <ChevronDown color="#0B0B0B" opacity={"60%"} />
        )}
        {/* Task */}
        <p className="opacity-70! ">Task</p>
      </div>

      {/* Description */}

      {isOpen && (
        <div className="">
          <p className="pl-6 opacity-70">Description:-</p>
          <p className="opacity-50">This Is des...</p>
        </div>
      )}

      {/* Timer */}
      <span className="border-[hsla(0,0%,0%)] opacity-70 border py-1.5 px-2 rounded-full absolute left-1/2 -translate-x-1/2">
        12:00
      </span>
      {/* Buttons */}
      <span className="absolute right-2 inline-flex items-center gap-3 p-2 min-w-max whitespace-nowrap">
        <Trash className="text-danger cursor-pointer shrink-0 h-7 w-7 p-1 content-box" />
        <Pencil className="text-black cursor-pointer shrink-0 h-7 w-7 p-1 content-box" />
      </span>
    </div>
  );
}
