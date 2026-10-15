"use client";
import { useEffect } from "react";
import Tab from "./Tag";
import { useSelectedTags } from "@/app/context/SelectedTagsContext";
import { useUser } from "@/app/context/UserContext";
import { useProfile } from "@/app/context/ProfileContext";
import type { IUser } from "../navbar/localstorage";

export default function TagList({ className }: { className?: string }) {
  const { selectedTags, setSelectedTags } = useSelectedTags();
  const { user } = useUser();
  const { profile } = useProfile();
  const localUser = user as IUser | null;
  const selectedProfile = localUser?.profiles.find(
    (userProfile) => userProfile.name === profile,
  );
  const standardTags = ["All", "completed", "pending"];
  const profileTags =
    selectedProfile?.todos.flatMap((todo) => todo.tags ?? []) ?? [];
  const list = [
    ...standardTags,
    ...new Set(profileTags.filter((tag) => !standardTags.includes(tag))),
  ];

  useEffect(() => {
    setSelectedTags("All");
  }, [profile, setSelectedTags]);

  function handleOnClick({ title }: { title: string }) {
    setSelectedTags(title);
  }

  return (
    <div
      className={`${className} py-2 flex flex-row gap-2 px-2 overflow-x-scroll hide-scrollbar`}
    >
      {list.map((tagName) => {
        return (
          <Tab
            title={tagName}
            onClick={() => {
              handleOnClick({ title: tagName });
            }}
            className={`${tagName === selectedTags ? "bg-primary/50!" : "bg-secondary!"}`}
            key={tagName}
          />
        );
      })}
    </div>
  );
}
