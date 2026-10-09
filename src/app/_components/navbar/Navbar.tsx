"use client";

import { CirclePlus, SquarePen, X } from "lucide-react";
import NavButton from "./NavButton";
import { useEffect, useState } from "react";
import {
  createLocalStorageTemplate,
  createProfile,
  editSelectedProfile,
  getLocalUser,
  getSelectedProfile,
  IUser,
  updateSelectedProfile,
} from "./localstorage";
import { useProfile } from "@/app/context/ProfileContext";

export default function Navbar() {
  const { profile, setProfile } = useProfile();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    //if no account & no localstorage than create localstorage field
    createLocalStorageTemplate();

    //set user selected profile
    setProfile(getSelectedProfile());
  }, []);

  const handleProfileCreating = (formData: FormData) => {
    const profileName = formData.get("profileName") as string;
    createProfile(profileName);
    setUser(getLocalUser());
    setIsCreating(false);
  };

  const handleProfileEditing = (formData: FormData) => {
    const profileName = formData.get("profileName") as string;
    editSelectedProfile(profileName, profile as string, () => {
      setProfile(profileName);
      updateSelectedProfile(profileName);
    });
    setUser(getLocalUser());
    setIsEditing(false);
  };

  //get the profiles
  useEffect(() => {
    //if not sign-in
    const todoProfiles = getLocalUser();
    setUser(todoProfiles);
  }, []);

  return (
    <div className="max-sm:h-12 w-full bg-primary flex justify-center items-center text-amber-50 ">
      <div className="shrink-0 w-full flex p-2 gap-2">
        {!isCreating && !isEditing && (
          <form action="#" className="flex-1 shrink-0">
            <select
              name="profile"
              id="profileSelection"
              className=" w-full "
              onChange={(e) => {
                setProfile(e.target.value);
                updateSelectedProfile(e.target.value);
              }}
            >
              {user?.profiles
                .sort((a, b) => {
                  if (a.name === user.selsectedProfile) return -1;
                  if (b.name === user.selsectedProfile) return 1;
                  return 0;
                })
                .map((profile, idx) => {
                  return (
                    <option value={profile.name} key={idx}>
                      {profile.name}
                    </option>
                  );
                })}
            </select>
          </form>
        )}

        {isCreating && !isEditing && (
          //creating
          <form action={handleProfileCreating} className="flex-1 shrink-0">
            <input
              type="text"
              name="profileName"
              placeholder="Enter new profile name:"
            />
          </form>
        )}

        {isEditing && !isCreating && (
          //editing
          <form action={handleProfileEditing} className="flex-1 shrink-0">
            <input
              type="text"
              defaultValue={profile}
              name="profileName"
              placeholder="Enter new profile name:"
            />
          </form>
        )}

        {/* Edit Button */}
        <NavButton className="">
          {!isEditing ? (
            <SquarePen
              color="#ffffff"
              onClick={() => {
                setIsEditing(!isEditing);
                setIsCreating(false);
              }}
            />
          ) : (
            <X
              color="#ffffff"
              strokeWidth={2}
              className="transition-transform duration-300"
              onClick={() => {
                setIsEditing(!isEditing);
                setIsCreating(false);
              }}
            />
          )}
        </NavButton>
        {/* Add Button */}
        <NavButton>
          <CirclePlus
            className={`${isCreating && "rotate-45"} transition-transform duration-300`}
            color="#ffffff"
            onClick={() => {
              setIsCreating(!isCreating);
              setIsEditing(false);
            }}
          />
        </NavButton>
      </div>
    </div>
  );
}
