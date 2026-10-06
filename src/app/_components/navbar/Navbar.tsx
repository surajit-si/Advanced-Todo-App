"use client";

import { CirclePlus, SquarePen } from "lucide-react";
import NavButton from "./NavButton";
import { useEffect, useState } from "react";
import {
  createLocalStorageTemplate,
  getLocalData,
  ITodoApp,
} from "./localstorage";

export default function Navbar() {
  const [selectedProfile, setSelectedProfile] = useState<string>("Guest");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<ITodoApp>();

  //if no account & no localstorage than create localstorage field
  useEffect(() => {
    createLocalStorageTemplate();
  }, []);

  const handleProfileCreating = (formData: FormData) => {
    //
  };

  //get the profiles
  useEffect(() => {
    //if not sign-in
    const todoProfiles = getLocalData();
    setProfiles(todoProfiles);
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
                setSelectedProfile(e.target.value);
              }}
            >
              {profiles?.map((profile, idx) => {
                return (
                  <option value={profile.profileName} key={idx}>
                    {profile.profileName}
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
          <form action="#" className="flex-1 shrink-0">
            <input
              type="text"
              defaultValue={selectedProfile}
              name="profileName"
              placeholder="Enter new profile name:"
            />
          </form>
        )}

        {/* Edit Button */}
        <NavButton className="">
          <SquarePen
            color="#ffffff"
            onClick={() => {
              setIsEditing(!isEditing);
              setIsCreating(false);
            }}
          />
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
