"use client";

import { CirclePlus, SquarePen, Trash, X } from "lucide-react";
import NavButton from "./NavButton";
import { useEffect, useState } from "react";
import { createLocalStorageTemplate } from "../../utils/localstorage";
import { useProfile } from "@/app/context/ProfileContext";
import {
  createPreferedProfile,
  deletePreferedProfile,
  editPreferedProfile,
  updatePreferedProfile,
} from "@/app/_services/profile.services";
import { useUser } from "@/app/context/UserContext";
import { getPreferedUser } from "@/app/_services/user.services";
import DeletePopup from "../deleteButton/DeletePopup";
import { AnimatePresence, motion, scale } from "motion/react";

export default function Navbar() {
  const { profile, setProfile } = useProfile();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    //if no account & no localstorage than create localstorage field
    createLocalStorageTemplate();

    //set user selected profile
    // setProfile(getPreferedProfile(user?.isSignedIn as boolean));
  }, []);

  useEffect(() => {
    if (user?.selectedProfile) {
      setProfile(user.selectedProfile);
    }
  }, [user?.selectedProfile]);

  const handleProfileCreating = (formData: FormData) => {
    const profileName = formData.get("profileName") as string;
    createPreferedProfile(profileName, user?.isSignedIn);

    getPreferedUser().then((curr) => {
      setUser(curr ?? null);
    });
    setIsCreating(false);
  };

  const handleProfileEditing = (formData: FormData) => {
    const profileName = formData.get("profileName") as string;
    editPreferedProfile(
      profileName,
      profile as string,
      user?.isSignedIn as boolean,
      () => {
        updatePreferedProfile(profileName, user?.isSignedIn as boolean);
      },
    );
    getPreferedUser().then((curr) => {
      setUser(curr ?? null);
    });
    setIsEditing(false);
  };

  const handleProfileChanging = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedProfile = e.target.value;
    setProfile(selectedProfile);
    await updatePreferedProfile(selectedProfile, user?.isSignedIn as boolean);
    const curr = await getPreferedUser();
    setUser(curr ?? null);
  };

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleProfileDelete = async () => {
    await deletePreferedProfile(user?.isSignedIn as boolean);

    getPreferedUser().then((curr) => {
      setUser(curr ?? null);
    });
    setIsEditing(false);
  };

  const profiles = user?.profiles.filter(
    (candidate): candidate is typeof candidate & { name: string } =>
      typeof candidate === "object" &&
      candidate !== null &&
      "name" in candidate,
  );
  const selectedProfile = user?.selectedProfile;

  //get the profiles
  /*   useEffect(() => {
    getPreferedUser().then((curr) => {
      setUser(curr ?? null);
    });
  }, []); */

  return (
    <div className="max-sm:h-12 w-full bg-primary flex justify-center items-center text-amber-50 ">
      {isDeleting && (
        <DeletePopup
          contsiner={document.body}
          leftSideButtonName="Cancel"
          leftSideButtonClassName="text-primary"
          rightSideButtonName="Delete"
          rightSideButtonClassName="text-white bg-danger"
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          leftSideButtonCallback={() => {
            setIsDeleting(false);
          }}
          rightSideButtonCallback={async () => {
            if (user) {
              await handleProfileDelete();
            }
            setIsDeleting(false);
          }}
        >
          <h2 className="text-xl">Do you want to delete?</h2>
        </DeletePopup>
      )}
      <div className="shrink-0 w-full flex p-2 gap-2">
        <AnimatePresence mode="wait">
          {!isCreating && !isEditing && (
            <motion.div
              key="select-box"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25, type: "spring" }}
              className="w-full"
            >
              <form action="#" className="flex-1 shrink-0">
                <select
                  name="profile"
                  id="profileSelection"
                  className=" w-full "
                  value={profile || user?.selectedProfile || ""}
                  onChange={handleProfileChanging}
                >
                  {profiles
                    ?.sort((a, b) => {
                      if (a.name === selectedProfile) return -1;
                      if (b.name === selectedProfile) return 1;
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
            </motion.div>
          )}

          {isCreating && !isEditing && (
            //creating
            <motion.div
              key="creating-box"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25, type: "spring" }}
              className="w-full"
            >
              <form action={handleProfileCreating} className="flex-1 shrink-0">
                <input
                  type="text"
                  name="profileName"
                  placeholder="Enter new profile name:"
                />
              </form>
            </motion.div>
          )}

          {isEditing && !isCreating && (
            //editing
            <motion.div
              key="editing-box"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25, type: "spring" }}
              className="w-full"
            >
              <form action={handleProfileEditing} className="flex-1 shrink-0">
                <input
                  type="text"
                  defaultValue={profile}
                  name="profileName"
                  placeholder="Enter new profile name:"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Profile Delete Button */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.2, type: "spring" }}
            >
              <NavButton className="transition-opacity duration-300">
                <Trash
                  strokeWidth={1.5}
                  color="#dc3545"
                  onClick={() => {
                    setIsDeleting(true);
                  }}
                />
              </NavButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Button */}
        <NavButton>
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div
                key="edit-icon"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setIsEditing(!isEditing);
                  setIsCreating(false);
                }}
                className="cursor-pointer flex items-center justify-center"
              >
                <SquarePen color="#ffffff" />
              </motion.div>
            ) : (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setIsEditing(!isEditing);
                  setIsCreating(false);
                }}
                className="cursor-pointer flex items-center justify-center"
              >
                <X color="#ffffff" strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
        </NavButton>

        {/* Add Button */}
        <motion.button whileTap={{ scale: 0.85 }}>
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
        </motion.button>
      </div>
    </div>
  );
}
