"use client";

import { MouseEvent, useState } from "react";
import { type TodoType } from "./TodoContainer";
import { CheckCheck, ChevronUp, Pencil, Trash, X } from "lucide-react";
import {
  deletePreferedTodo,
  markPreferedTodoState,
} from "@/app/_services/todo.services";
import { useUser } from "@/app/context/UserContext";
import { getPreferedUser } from "@/app/_services/user.services";
import { IUser } from "@/app/utils/localstorage";
import DeletePopup from "../deleteButton/DeletePopup";
import { AnimatePresence, motion } from "motion/react";

export default function Todo({ todo, idx }: { todo: TodoType; idx: number }) {
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
    markPreferedTodoState(todo._id, "completed", user?.isSignedIn as boolean);
    setUser((await getPreferedUser()) as IUser);
  }

  async function handleMarkPending(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    markPreferedTodoState(todo._id, "pending", user?.isSignedIn as boolean);
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
        <AnimatePresence mode="wait">
          {isHovering && (
            <motion.span
              key="date"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25, type: "spring" }}
              className={` border-[hsla(0,0%,0%)] opacity-70 border py-1 px-2 rounded-full absolute left-1/2 -translate-x-1/2 text-[0.6em] transi `}
            >
              {new Date(todo.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </motion.span>
          )}
        </AnimatePresence>
        {/* Buttons */}
        <span className="absolute right-2 inline-flex items-center gap-3 p-2 min-w-max whitespace-nowrap">
          {/* Check ok not */}
          <AnimatePresence mode="wait">
            {todo.state !== "completed" ? (
              <motion.span
                key={"check"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, type: "tween" }}
                title="Mark as completed"
                onClick={handleMarkCheck}
              >
                <CheckCheck
                  strokeWidth={2}
                  className="text-success cursor-pointer shrink-0 h-7 w-7 p-1 content-box rounded-sm hover:bg-[#0000002c]! transition-colors duration-200"
                />
              </motion.span>
            ) : (
              <motion.span
                key={"x"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                title="Mark as pending"
                onClick={handleMarkPending}
              >
                <X
                  strokeWidth={2}
                  className=" cursor-pointer shrink-0 h-7 w-7 p-1 content-box rounded-sm hover:bg-[#0000002c]! transition-colors duration-200"
                />
              </motion.span>
            )}
          </AnimatePresence>
          {/* Delete */}
          <motion.span
            key={"delete"}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
            title="Delete"
            onClick={handleDelete}
          >
            <Trash className="text-danger cursor-pointer shrink-0 h-7 w-7 p-1 content-box rounded-sm hover:bg-[#0000002c]! transition-colors duration-200" />
          </motion.span>
          {/* Edit */}
          <motion.span
            key={"edit"}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
            title="Edit"
            onClick={handleEdit}
          >
            <Pencil className="text-black cursor-pointer shrink-0 h-7 w-7 p-1 content-box rounded-sm hover:bg-[#0000002c]! transition-colors duration-200" />
          </motion.span>
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
              deletePreferedTodo(todo._id, user.isSignedIn);
            }
            setUser((await getPreferedUser()) as IUser);
            setIsDeleting(false);
          }}
        >
          <h2 className="text-xl">Do you want to delete?</h2>
        </DeletePopup>
      )}

      {/* Description */}

      {/* Description */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="description"
            initial={{ opacity: 0, height: 0, y: 0 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -5 }}
            transition={{ duration: 0.25, type: "spring", damping: 20 }}
            className="overflow-hidden"
          >
            <p className="pl-6 opacity-70">Description:-</p>
            <p className="opacity-50 pl-8 pb-2 ">
              {todo.description || "No description provided."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
