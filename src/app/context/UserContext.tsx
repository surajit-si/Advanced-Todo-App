"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IUser } from "../(Backend)/db/model/User.schema";

interface UserContextType {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

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
