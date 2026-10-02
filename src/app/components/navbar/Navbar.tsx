"use client";

import { CirclePlus, SquarePen } from "lucide-react";
import NavButton from "./NavButton";
import { useState } from "react";

export default function Navbar() {
  const [selectedProfile, setSelectedProfile] = useState<string>("Guest");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
              <option value="guest">Guest</option>
            </select>
          </form>
        )}

        {isCreating && !isEditing && (
          <form action="#" className="flex-1 shrink-0">
            <input
              type="text"
              name="profileName"
              placeholder="Enter new profile name:"
            />
          </form>
        )}

        {isEditing && !isCreating && (
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
