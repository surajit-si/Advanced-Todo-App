"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { IUser as BackendUser } from "../(Backend)/db/model/User.schema";
import { IUser as LocalUser } from "../_components/navbar/localstorage";

type ContextUser = BackendUser | LocalUser;

interface UserContextType {
  user: ContextUser | null;
  setUser: Dispatch<SetStateAction<ContextUser | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ContextUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const data = useContext(UserContext);

  if (data === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return data;
};
