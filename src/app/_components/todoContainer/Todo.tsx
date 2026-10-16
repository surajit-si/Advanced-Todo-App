"use client";

import { MouseEvent, useState } from "react";
import { type Todo } from "./TodoContainer";
import { CheckCheck, ChevronUp, Pencil, Trash, X } from "lucide-react";
import {
  deletePreferedTodo,
  markPreferedTodoState,
} from "@/app/_services/todo.services";
import { useUser } from "@/app/context/UserContext";
import { getPreferedUser } from "@/app/_services/user.services";
import { IUser } from "@/app/utils/localstorage";
import DeletePopup from "../deleteButton/DeletePopup";

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

  const { user, setUser } = useUser();

  async function handleMarkCheck(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    markPreferedTodoState(todo.id, "completed", user?.isSignedIn as boolean);
    setUser((await getPreferedUser()) as IUser);
  }

  async function handleMarkPending(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    markPreferedTodoState(todo.id, "pending", user?.isSignedIn as boolean);
    setUser((await getPreferedUser()) as IUser);
  }

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  async function handleDelete(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();

    //delete popup
    setIsDeleting(true);
  }

  function handleEdit(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    alert("Editing is not implemented yet.");
  }

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
            timeZone: "UTC",
          })}
        </span>
        {/* Buttons */}
        <span className="absolute right-2 inline-flex items-center gap-3 p-2 min-w-max whitespace-nowrap">
          {todo.state !== "completed" ? (
            <span title="Mark as completed" onClick={handleMarkCheck}>
              <CheckCheck
                strokeWidth={2}
                className="text-success cursor-pointer shrink-0 h-7 w-7 p-1 content-box rounded-sm hover:bg-[#0000002c]! transition-colors duration-200"
              />
            </span>
          ) : (
            <span title="Mark as pending" onClick={handleMarkPending}>
              <X
                strokeWidth={2}
                className=" cursor-pointer shrink-0 h-7 w-7 p-1 content-box rounded-sm hover:bg-[#0000002c]! transition-colors duration-200"
              />
            </span>
          )}

          <span title="Delete" onClick={handleDelete}>
            <Trash className="text-danger cursor-pointer shrink-0 h-7 w-7 p-1 content-box rounded-sm hover:bg-[#0000002c]! transition-colors duration-200" />
          </span>

          <span title="Edit" onClick={handleEdit}>
            <Pencil className="text-black cursor-pointer shrink-0 h-7 w-7 p-1 content-box rounded-sm hover:bg-[#0000002c]! transition-colors duration-200" />
          </span>
        </span>
      </div>
      {/* Delete popup */}
      {isDeleting && (
        <DeletePopup
          contsiner={document.body}
          leftSideButtonName="Cancel"
          leftSideButtonClassName="text-primary"
          rightSideButtonName="Delete"
          rightSideButtonClassName="text-white bg-danger"
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          leftSideButtonCallback={() => {
            setIsDeleting(false);
          }}
          rightSideButtonCallback={async () => {
            if (user) {
              deletePreferedTodo(todo.id, user.isSignedIn);
            }
            setUser((await getPreferedUser()) as IUser);
            setIsDeleting(false);
          }}
        >
          <h2 className="text-xl">Do you want to delete?</h2>
        </DeletePopup>
      )}

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
