"use client";

import { updateUser } from "@/app/utils/user.utild";
import { useUser } from "../../context/UserContext";
import {
  CirclePlus,
  CircleUserRound,
  ClipboardList,
  LogIn,
  LogOut,
  Trash,
  UserPen,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function BottomNavbar({ className }: { className?: string }) {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  //User
  const { user, setUser } = useUser();

  //Update User
  useEffect(() => {
    updateUser().then((curr) => {
      setUser(curr);

      //redirect user if unvarified...
      if (!curr?.isVerified) {
        redirect("/verify-email");
      }
    });
  }, []);

  return (
    <div className={`${className} absolute bottom-0 w-full`}>
      <div
        className={` w-full h-10 flex flex-row justify-between px-16 border-t border-[black]/40 items-center relative`}
      >
        {/* Todo Menu */}
        <ClipboardList color="#3A86FF" />
        <span className="dummy hidden"></span>
        <div className="relative">
          {/* User Button */}
          <CircleUserRound
            className="text-primary cursor-pointer"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              console.log(user);
            }}
          />

          {isProfileOpen && (
            <div className="absolute py-4 px-2  top-0 -translate-y-full left-0 -translate-x-full w-60 rounded-2xl z-50 flex flex-col items-center bg-white shadow-[0_0_25px_rgba(0,0,0,0.5)]">
              {/* Photo */}
              <div className="aspect-square w-20 rounded-full overflow-hidden ">
                {user ? (
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNaGxAjEhS_6L2RZ9oNBHFxgnv4qJmgp1DMOMDMpeM1w&s=10"
                    }
                    alt="Hello"
                    className="bg-amber-200 h-full w-full rounded-full"
                  />
                ) : (
                  <CircleUserRound
                    className="h-full aspect-square text-gray-600 cursor-pointer "
                    size={""}
                    strokeWidth={1}
                  />
                )}
              </div>
              {/* Change avatar button */}
              <div
                className={`${!user && "hidden"} border flex rounded-2xl px-2 text-sm text-gray-600 cursor-pointer items-center gap-1 mt-1`}
              >
                <UserPen className="text-gray-600 aspect-square w-4" />
                Change Avatar
              </div>
              {/* Buttons */}
              <div className="mt-2 flex gap-2">
                {/* Delete Button */}
                {user ? (
                  <button
                    className={`Delete border border-danger px-4 py-1 rounded-4xl text-danger flex items-center gap-1 text-sm cursor-pointer transition-transform hover:scale-105 duration-200`}
                  >
                    <Trash className="text-danger aspect-square w-4" />
                    Delete
                  </button>
                ) : (
                  <button
                    className={`Delete border border-primary px-4 py-1 rounded-4xl text-primary flex items-center gap-1 text-sm cursor-pointer transition-transform hover:scale-105 duration-200`}
                  >
                    <UserPlus className="text-primary aspect-square w-4" />
                    Sign Up
                  </button>
                )}
                {/* Logout Button */}
                {user ? (
                  <button
                    className={`Delete border border-danger px-4 py-1 rounded-4xl text-white flex items-center gap-1 text-sm bg-danger cursor-pointer transition-transform hover:scale-105 duration-200`}
                  >
                    <LogOut className="text-white aspect-square w-4" />
                    Logout
                  </button>
                ) : (
                  <button
                    className={`Delete border border-primary px-4 py-1 rounded-4xl text-white flex items-center gap-1 text-sm bg-primary cursor-pointer transition-transform hover:scale-105 duration-200`}
                  >
                    <LogIn className="text-white aspect-square w-4" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Todo Add Button */}
        <div className="todoAddButton aspect-square w-14 bg-primary absolute left-1/2 rounded-full -translate-x-1/2 -top-1/2 flex justify-center items-center text-white text-2xl cursor-pointer">
          <CirclePlus />
        </div>
      </div>
    </div>
  );
}
