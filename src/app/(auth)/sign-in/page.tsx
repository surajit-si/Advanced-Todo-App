"use client";

import Link from "next/link";
import { loginUser, registerUser } from "../../(Backend)/actions/userActions";
import { useState } from "react";
import BetterInput from "../sign-up/BetterInput";

export default function SignIn() {
  const [status, setStatus] = useState("");

  //Submit form
  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setStatus("Email and password are required.");
      return;
    }
    setStatus("Logging in...");
    await loginUser(formData);
  }

  return (
    <div className="p-4 rounded-3xl border flex flex-col items-center justify-center gap-1">
      <h1 className="text-3xl font-normal">Sign In</h1>
      <p className="text-sm">
        Dont have an account?{" "}
        <Link href={"/sign-up"} className="text-primary font-bold">
          Sign up
        </Link>
      </p>
      {status && <p>{status}</p>}
      {/* Form */}
      <form
        action={handleSubmit}
        className="flex flex-col gap-2 min-w-60 w-80 max-w-100"
      >
        <BetterInput type="email" placeholder="Email" name="email" />

        <BetterInput type="password" placeholder="password" name="password" />

        <button
          type="submit"
          className="w-full bg-primary rounded-md py-1 border"
        >
          {" "}
          Sign Up{" "}
        </button>
      </form>
    </div>
  );
}
