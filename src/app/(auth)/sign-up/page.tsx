"use client";

import { registerUser } from "../../(Backend)/actions/userActions";
import BetterInput from "./BetterInput";
import { useState } from "react";

export default function SignUp() {
  const [status, setStatus] = useState("");

  //Submit form
  async function handleSubmit(formData: FormData) {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    setStatus("Creating account...");
    const result = await registerUser(formData);
    setStatus(
      result.success
        ? (result.message ?? "Account created successfully.")
        : (result.error ?? "Failed to create account."),
    );
  }

  return (
    <div className="p-4 rounded-3xl border flex flex-col items-center justify-center gap-1">
      <h1 className="text-3xl font-normal">Sign Up</h1>
      <p className="text-sm">Sign up to get started</p>
      {/* Form */}
      <form
        action={handleSubmit}
        className="flex flex-col gap-2 min-w-60 w-80 max-w-100"
      >
        <BetterInput type="text" placeholder="Name" name="name" />
        <BetterInput type="email" placeholder="Email" name="email" />

        <BetterInput type="password" placeholder="password" name="password" />
        <BetterInput
          type="password"
          placeholder="password"
          name="confirmPassword"
        />

        <button
          type="submit"
          className="w-full bg-primary rounded-md py-1 border"
        >
          {" "}
          Sign Up{" "}
        </button>
        {status && <p role="status">{status}</p>}
      </form>
    </div>
  );
}
