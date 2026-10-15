"use client";
import { useEffect, useState } from "react";
import Tab from "./Tag";
import { useSelectedTags } from "@/app/context/SelectedTagsContext";

export default function TagList({ className }: { className?: string }) {
  type Tags = {
    tagName: string;
  };

  const { selectedTags, setSelectedTags } = useSelectedTags();
  // const [currentTag, setCurrentTag] = useState<string>("All");

  //default selected tag
  useEffect(() => {
    setSelectedTags("All");
  }, []);

  const list: Tags[] = [
    { tagName: "All" },
    { tagName: "completed" },
    { tagName: "pending" },
  ];

  function handleOnClick({ title }: { title: string }) {
    setSelectedTags(title);
  }

  return (
    <div
      className={`${className} py-2 flex flex-row gap-2 px-2 overflow-x-scroll hide-scrollbar`}
    >
      {list.map((tag) => {
        return (
          <Tab
            title={tag.tagName}
            onClick={() => {
              handleOnClick({ title: tag.tagName });
            }}
            className={`${tag.tagName === selectedTags ? "bg-primary/50!" : "bg-secondary!"}`}
            key={tag.tagName}
          />
        );
      })}
    </div>
  );
}
