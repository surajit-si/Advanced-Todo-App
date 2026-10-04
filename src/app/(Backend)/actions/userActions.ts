"use server";

import { redirect } from "next/navigation";
import { User } from "../db/model/User.schema";
import { sendEmail } from "../lib/brevo";
import connectDB from "../lib/connectDB";

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
