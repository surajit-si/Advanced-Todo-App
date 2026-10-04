"use client";

import Link from "next/link";
import { registerUser } from "../../(Backend)/actions/userActions";
import { useState } from "react";
import BetterInput from "../sign-up/BetterInput";

export default function SignIn() {
  const [status, setStatus] = useState("");

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
      <form action={""} className="flex flex-col gap-2 min-w-60 w-80 max-w-100">
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
