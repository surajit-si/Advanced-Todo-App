"use server";

import { User } from "../db/model/User.schema";
import connectDB from "../lib/connectDB";

export async function createNewUser(formData: FormData) {
  try {
    const userName = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!userName) return { success: false, error: "Name field is required!" };
    if (!email) return { success: false, error: "Email field is required!" };
    if (!password)
      return { success: false, error: "Password field is required!" };

    //connect database
    await connectDB();

    //Check if user already exists
    const userExists = await User.findOne({ email });

    if (!userExists) return { success: false, error: "User already exists!" };

    const createdUser = await User.create({
      name: userName,
      email: email,
      password: password,
    });

    return {
      success: true,
      message: "User created successfully!",
      data: { name: userName, email },
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || "Failed to create user. Please try again.",
    };
  }
}
