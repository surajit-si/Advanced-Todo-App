"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type selectedTagContextType = {
  selectedTags: string;
  setSelectedTags: Dispatch<SetStateAction<string>>;
};

const selectedTagsContext = createContext<selectedTagContextType | undefined>(
  undefined,
);

export default function SelectedTagsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tag, setTag] = useState<string>("");

  return (
    <selectedTagsContext.Provider
      value={{ selectedTags: tag, setSelectedTags: setTag }}
    >
      {children}
    </selectedTagsContext.Provider>
  );
}

export const useSelectedTags = () => {
  const data = useContext(selectedTagsContext);

  if (data === undefined) {
    throw new Error("useSelectedTags must be used within a UserProvider");
  }
  return data;
};
