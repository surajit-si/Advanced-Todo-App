"use client";
import { useState } from "react";
import Tab from "./Tag";
import { title } from "process";

export default function TagList({ className }: { className?: string }) {
  type Tags = {
    tagName: string;
  };

  const [currentTag, setCurrentTag] = useState<string>("All");

  const list: Tags[] = [
    { tagName: "All" },
    { tagName: "completed" },
    { tagName: "pending" },
  ];

  function handleOnClick({ title }: { title: string }) {
    setCurrentTag(title);
  }

  return (
    <div
      className={`${className} flex flex-row gap-2 px-2 overflow-x-scroll hide-scrollbar`}
    >
      {list.map((tag) => {
        return (
          <Tab
            title={tag.tagName}
            onClick={() => {
              handleOnClick({ title: tag.tagName });
            }}
            className={`${tag.tagName === currentTag ? "bg-primary/50!" : "bg-secondary!"}`}
            key={tag.tagName}
          />
        );
      })}
    </div>
  );
}
