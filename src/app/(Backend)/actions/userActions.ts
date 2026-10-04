"use server";

import { redirect } from "next/navigation";
import { IUser, User } from "../db/model/User.schema";
import { sendEmail } from "../lib/brevo";
import connectDB from "../lib/connectDB";
import { cookies } from "next/headers";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../lib/jose";

export async function registerUser(formData: FormData) {
  let isSuccess = false;
  try {
    const nameValue = formData.get("name");
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");

    const userName = typeof nameValue === "string" ? nameValue.trim() : "";
    const email = typeof emailValue === "string" ? emailValue.trim() : "";
    const password = typeof passwordValue === "string" ? passwordValue : "";

    if (!userName) return { success: false, error: "Name field is required!" };
    if (!email) return { success: false, error: "Email field is required!" };
    if (!password)
      return { success: false, error: "Password field is required!" };

    //connect database
    await connectDB();

    //Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) return { success: false, error: "Email already in use!" };

    await User.create({
      name: userName,
      email: email,
      password: password,
    });

    isSuccess = true;

    /* return {
      success: true,
      message: "User created successfully!",
      data: { name: userName, email },
    }; */
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create user. Please try again.",
    };
  }
  if (isSuccess) {
    redirect("/verify-email");
  }
}

export async function loginUser(formData: FormData) {
  //get cookies
  const cookieStore = await cookies();

  let isSuccess = false;
  try {
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");

    const email = typeof emailValue === "string" ? emailValue.trim() : "";
    const password = typeof passwordValue === "string" ? passwordValue : "";

    if (!email) return { success: false, error: "Email field is required!" };
    if (!password)
      return { success: false, error: "Password field is required!" };

    //connect database
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return { success: false, error: "Invalid email!" };

    //check password
    if (user.password !== password) {
      return { success: false, error: "Invalid password!" };
    }

    //create cookie
    const accessToken = await generateAccessToken(user._id.toString());
    const refreshToken = await generateRefreshToken(user._id.toString());

    cookieStore.set("accessToken", accessToken);
    cookieStore.set("refreshToken", refreshToken);

    isSuccess = true;
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to login. Please try again.",
    };
  }

  if (isSuccess) {
    redirect("/");
  }
}

export async function getUser(): Promise<{
  success: boolean;
  data?: IUser;
  error?: string;
}> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) return { success: false, error: "Unauthorized!" };

  const payload = await verifyToken(accessToken.value);

  if (!payload) return { success: false, error: "Invalid token!" };

  await connectDB();

  const user = await User.findOne({ _id: payload.userId }).select("-password");
  if (!user) return { success: false, error: "Invalid token!" };

  return {
    success: true,
    data: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profiles: user.profiles,
      selectedProfile: user.selectedProfile,
      todos: user.todos,
    },
  };
}
