"use server";

import { ObjectId } from "mongoose";
import { Profile } from "../db/model/Profile.schema";
import connectDB from "../lib/connectDB";
import { verifyUser } from "./userActions";
import { IUser, User } from "../db/model/User.schema";

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

    const profile = await Profile.create({
      name,
      todos: [],
      user: userId,
    });
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
