"use client";

import { registerUser } from "../../(Backend)/actions/userActions";
import { useState } from "react";
import BetterInput from "../sign-up/BetterInput";

export default function SignUp() {
  const [status, setStatus] = useState("");

  return (
    <div className="p-4 rounded-3xl border flex flex-col items-center justify-center gap-1">
      <h1 className="text-3xl font-normal">Verify Email</h1>
      <p className="text-sm">Verify your email to get started</p>
      {status && <p>{status}</p>}
      {/* Form */}
      <form action={""} className="flex flex-col gap-2 min-w-60 w-80 max-w-100">
        <div className="flex justify-between items-center">
          <BetterInput
            type="number"
            placeholder="OTP"
            name="otp"
            className="flex-1 "
          />
          <button className="bg-primary h-8 w-24 rounded-md">Resend</button>
        </div>

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
