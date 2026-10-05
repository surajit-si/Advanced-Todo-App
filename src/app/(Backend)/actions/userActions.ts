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
import { Otp } from "../db/model/Otp.schema";
import ActionResponse, { IActionResponse } from "../lib/ActionResponse";

async function verifyUser() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");
  if (!accessToken)
    return ActionResponse({ success: false, errorMsg: "Unauthorized!" });

  const payload = await verifyToken(accessToken.value);

  if (!payload)
    return ActionResponse({ success: false, errorMsg: "Invalid token!" });

  await connectDB();

  const user = await User.findById(payload.userId).select("-password");

  if (!user)
    return ActionResponse({ success: false, errorMsg: "Invalid token!" });

  return ActionResponse({ success: true, data: user });
}

export async function registerUser(formData: FormData) {
  let isSuccess = false;
  try {
    const nameValue = formData.get("name");
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");

    const userName = typeof nameValue === "string" ? nameValue.trim() : "";
    const email = typeof emailValue === "string" ? emailValue.trim() : "";
    const password = typeof passwordValue === "string" ? passwordValue : "";

    if (!userName)
      return ActionResponse({
        success: false,
        errorMsg: "Name field is required!",
      });
    if (!email)
      return ActionResponse({
        success: false,
        errorMsg: "Email field is required!",
      });
    if (!password)
      return ActionResponse({
        success: false,
        errorMsg: "Password field is required!",
      });

    //connect database
    await connectDB();

    //Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists)
      return ActionResponse({
        success: false,
        errorMsg: "Email already in use!",
      });

    await User.create({
      name: userName,
      email: email,
      password: password,
    });

    isSuccess = true;
  } catch (error: unknown) {
    return ActionResponse({
      success: false,
      errorMsg:
        error instanceof Error
          ? error.message
          : "Failed to create user. Please try again.",
    });
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

    if (!email)
      return ActionResponse({
        success: false,
        errorMsg: "Email field is required!",
      });
    if (!password)
      return ActionResponse({
        success: false,
        errorMsg: "Password field is required!",
      });

    //connect database
    await connectDB();

    const user = await User.findOne({ email });
    if (!user)
      return ActionResponse({
        success: false,
        errorMsg: "Email is not registered!",
      });

    //check password
    if (user.password !== password) {
      return ActionResponse({
        success: false,
        errorMsg: "Password not matched",
      });
    }

    //create cookie
    const accessToken = await generateAccessToken(user._id.toString());
    const refreshToken = await generateRefreshToken(user._id.toString());

    cookieStore.set("accessToken", accessToken);
    cookieStore.set("refreshToken", refreshToken);

    isSuccess = true;
  } catch (error) {
    let errorObj = {};
    if (error instanceof Error && process.env.NODE_ENV === "development") {
      errorObj = { message: error.message, stack: error.stack };
    }
    return ActionResponse({
      success: false,
      errorMsg:
        error instanceof Error
          ? error.message
          : "Failed to login. Please try again.",
      ...errorObj,
    });
  }

  if (isSuccess) {
    redirect("/");
  }
}

export async function getUser(): Promise<IActionResponse<IUser>> {
  try {
    const response = await verifyUser();
    if (!response.success)
      return ActionResponse({ success: false, errorMsg: response.errorMsg });
    const user = response.data as IUser;

    return ActionResponse({
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
    });
  } catch (error) {
    let errorObj = {};
    if (error instanceof Error && process.env.NODE_ENV === "development") {
      errorObj = { message: error.message, stack: error.stack };
    }
    return ActionResponse({
      success: false,
      dev:
        process.env.NODE_ENV === "development"
          ? {
              name: errorObj.name,
              stack: errorObj.stack,
            }
          : undefined,
    });
  }
}

export async function sendOTP(): Promise<{
  success: boolean;
  data?: { reminingTime: number };
  error?: string;
  message?: string;
}> {
  try {
    const response = await verifyUser();
    if (!response.success) return response;
    const user = response.data as IUser;

    //check if otp already exgists
    const otpExists = await Otp.findOne({ userId: user._id });

    let currTime = 0;
    let lastUpdatedTime = 0;

    let resendCondition: number = 0;
    if (otpExists) {
      currTime = Date.now();
      lastUpdatedTime = new Date(otpExists.updatedAt).getTime();

      resendCondition = (currTime - lastUpdatedTime) / 1000;
    }

    //check if in cooldown
    //send remining time
    if (otpExists && resendCondition < 60)
      return ActionResponse({
        success: false,
        errorMsg: "Please wait sometimes before resending OTP.",
        data: { reminingTime: Math.ceil(60 - resendCondition) },
      });

    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendEmail({
      to: user.email,
      subject: "OTP",
      htmlContent: `<p>Your OTP is ${otp}</p>`,
    });

    //if otp not exists create new otp else update otp
    if (!otpExists) {
      await Otp.create({
        userId: user._id,
        code: otp.toString(),
      });
    } else {
      otpExists.code = otp.toString();
      otpExists.expiresAt = new Date(Date.now() + 5 * 1000);
      await otpExists.save();
    }

    return ActionResponse({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.log(error);

    let errorObj = {};
    if (error instanceof Error && process.env.NODE_ENV === "development") {
      errorObj = { message: error.message, stack: error.stack };
    }

    return ActionResponse({
      success: false,
      errorMsg: "Failed to send OTP. Please try again.",
      dev:
        process.env.NODE_ENV === "development"
          ? {
              name: errorObj.name,
              stack: errorObj.stack,
            }
          : undefined,
    });
  }
}

export async function verifyOTP(formDate: FormData) {
  let isSuccess = false;
  try {
    const otpValue = formDate.get("otp");
    //if no otp by user
    if (!otpValue) {
      return ActionResponse({
        success: false,
        errorMsg: "OTP field is required!",
      });
    }

    const { data } = await verifyUser();
    const user = data as IUser;

    //connect database
    await connectDB();

    const otp = await Otp.findOne({ userId: user._id });

    if (!otp)
      return ActionResponse({
        success: false,
        errorMsg: "Invalid OTP!",
      });

    //check otp
    if (otp.code !== otpValue) {
      return ActionResponse({
        success: false,
        errorMsg: "otp not matched!",
      });
    }

    //update user
    await User.findByIdAndUpdate(user._id, {
      isVerified: true,
    });

    //delete otp
    await Otp.findByIdAndDelete(otp._id);

    isSuccess = true;
    /* return ActionResponse({
      success: true,
      message: "OTP verified successfully!",
    }); */
  } catch (error) {
    let errorObj = {};
    if (error instanceof Error && process.env.NODE_ENV === "development") {
      errorObj = { message: error.message, stack: error.stack };
    }
    return ActionResponse({
      success: false,
      errorMsg:
        error instanceof Error
          ? error.message
          : "Failed to verify OTP. Please try again.",
      ...errorObj,
    });
  }
  if (isSuccess) {
    redirect("/");
  }
}
