"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface UserContextType {
  profile: string;
  setProfile: Dispatch<SetStateAction<string>>;
}

const ProfileContext = createContext<UserContextType | undefined>(undefined);

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<string>("");

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const data = useContext(ProfileContext);

  if (data === undefined) {
    throw new Error("useProfile must be used within a UserProvider");
  }

  return data;
}
