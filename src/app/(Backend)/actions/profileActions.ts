"use server";

import { ObjectId } from "mongoose";
import { Profile } from "../db/model/Profile.schema";
import connectDB from "../lib/connectDB";
import { getUser, verifyUser } from "./userActions";
import { IUser, User } from "../db/model/User.schema";
import { Todo } from "../db/model/Todo.schema";

export async function createServerProfile(name: string) {
  try {
    await connectDB();
    const user = await verifyUser();
    const userId = (user.data as IUser)._id;

    //find if the profile already exists
    const profileExists = await Profile.findOne({ name, user: userId });

    if (profileExists) {
      return;
    }

    await Profile.create({
      name,
      todos: [],
      user: userId,
    });

    await updateUserSelectedProfileAction(name);
  } catch (error) {}
}

export async function updateUserSelectedProfileAction(profileName: string) {
  const user = await verifyUser();
  if (!user.success) {
    return;
  }

  const userData = user.data as IUser;

  const profile = await Profile.findOne({
    name: profileName,
    user: userData._id,
  });

  if (!profile) {
    return;
  }

  await User.findByIdAndUpdate(userData._id, {
    selectedProfile: profile.name,
  });
}

export async function getSelectedProfileAction() {
  const user = await verifyUser();
  if (!user.success) {
    return;
  }
  const userData = user.data as IUser;
  return userData.selectedProfile;
}

export async function editSelectedProfileAction(
  profileName: string,
  fn?: () => void,
) {
  const user = await verifyUser();
  if (!user.success) {
    return;
  }
  const userData = user.data as IUser;
  //find selected profile and update
  await Profile.findOneAndUpdate(
    { name: userData.selectedProfile },
    { name: profileName },
  );
  await updateUserSelectedProfileAction(profileName);
}

export async function deleteProfileAction() {
  const userData = (await getUser()).data;
  if (!userData) {
    return;
  }

  const profile = await Profile.findOne({
    name: userData.selectedProfile,
    user: userData._id,
  });

  if (!profile) {
    return;
  }

  await Profile.findByIdAndDelete(profile._id);

  await Todo.deleteMany({ profile: profile._id });

  /*  let editedUser: IUser | null = await User.findById(userData._id);

  if (!editedUser) {
    return;
  } */

  if (userData.profiles.length === 1) {
    await createServerProfile(userData.name);
    // await updateUserSelectedProfileAction(userData.name);
  }

  const editedUser = (await getUser()).data;
  if (!editedUser) {
    return;
  }

  //change selected profile
  await User.findByIdAndUpdate(userData._id, {
    selectedProfile: editedUser.profiles[0].name,
  });
}
