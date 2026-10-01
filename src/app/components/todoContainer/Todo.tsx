"use client";

import { useState } from "react";
import { type Todo } from "./TodoContainer";
import { ChevronUp, Pencil, Trash } from "lucide-react";

export default function Todo({ todo, idx }: { todo: Todo; idx: number }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleEnter = () => {
    setIsHovering(true);
  };
  const handleLeave = () => {
    setIsHovering(false);
  };

  //ragex
  // Works everywhere without TS target warnings:
  const finalTitle = (str: string) =>
    str.replace(/^([\s\S]{13})[\s\S]{3,}$/, "$1...");

  return (
    <div
      className={`${idx === 0 ? "border-t" : ""} mx-2 flex justify-center flex-col  border-b border-[hsla(0,0%,0%,0.5)] cursor-pointer transition-all duration-200 `}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-2 px-2 relative py-2 ">
        <ChevronUp
          color="#0B0B0B"
          opacity={"60%"}
          className={`${isOpen && "rotate-180"} transition-transform`}
        />

        {/* Task */}
        {isHovering ? (
          <p className={`opacity-70! text-sm `}>{finalTitle(todo.task)}</p>
        ) : (
          <p className={`opacity-70! text-sm `}>{todo.task}</p>
        )}

        {/* Date */}
        <span
          className={`${isHovering ? "" : "hidden"} border-[hsla(0,0%,0%)] opacity-70 border py-1 px-2 rounded-full absolute left-1/2 -translate-x-1/2 text-[0.6em]  `}
        >
          {new Date(todo.deadline).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
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
            {todo.description || "No description provided."}
          </p>
        </div>
      )}
    </div>
  );
}
