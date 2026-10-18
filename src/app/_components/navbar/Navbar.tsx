"use client";

import { CirclePlus, SquarePen, X } from "lucide-react";
import NavButton from "./NavButton";
import { useEffect, useState } from "react";
import {
  createLocalStorageTemplate,
  getLocalUser,
  IUser,
} from "../../utils/localstorage";
import { useProfile } from "@/app/context/ProfileContext";
import {
  createPreferedProfile,
  editPreferedProfile,
  getPreferedProfile,
  updatePreferedProfile,
} from "@/app/_services/profile.services";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { profile, setProfile } = useProfile();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const localUser = user as IUser | null;

  useEffect(() => {
    //if no account & no localstorage than create localstorage field
    createLocalStorageTemplate();

    //set user selected profile
    setProfile(getPreferedProfile(user?.isSignedIn as boolean));
  }, []);

  const handleProfileCreating = (formData: FormData) => {
    const profileName = formData.get("profileName") as string;
    createPreferedProfile(profileName, user?.isSignedIn);
    setUser(getLocalUser());
    setIsCreating(false);
  };

  const handleProfileEditing = (formData: FormData) => {
    const profileName = formData.get("profileName") as string;
    editPreferedProfile(
      profileName,
      profile as string,
      user?.isSignedIn as boolean,
      () => {
        setProfile(profileName);
        updatePreferedProfile(profileName, user?.isSignedIn as boolean);
      },
    );
    setUser(getLocalUser());
    setIsEditing(false);
  };

  const handleProfileChanging = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfile(e.target.value);
    updatePreferedProfile(e.target.value, user?.isSignedIn as boolean);
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
              onChange={handleProfileChanging}
            >
              {localUser?.profiles
                .sort((a, b) => {
                  if (a.name === localUser.selectedProfile) return -1;
                  if (b.name === localUser.selectedProfile) return 1;
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
