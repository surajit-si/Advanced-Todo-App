"use client";

import {
  registerUser,
  sendOTP,
  verifyOTP,
} from "../../(Backend)/actions/userActions";
import { useEffect, useRef, useState } from "react";
import BetterInput from "../sign-up/BetterInput";
import { IActionResponse } from "@/app/(Backend)/lib/ActionResponse";

export default function SignUp() {
  const [status, setStatus] = useState<string>("");
  //resend Button
  const resendRef = useRef<HTMLButtonElement>(null);

  //send 1st otp
  useEffect(() => {
    let isMounted = true; // 🟢 Track mount status
    let timer: NodeJS.Timeout;

    sendOTP().then((res: IActionResponse<{ reminingTime: number }>) => {
      // 🟢 Prevent setting timer if unmounted while request was pending
      if (!isMounted) return;

      if (!res.success) {
        setStatus(res.errorMsg as string);
        if (res.data?.reminingTime) {
          let reminingTime = res.data.reminingTime;

          const resendBtn = resendRef.current;
          if (resendBtn) {
            timer = setInterval(() => {
              resendBtn.textContent = String(reminingTime);
              reminingTime--;

              if (reminingTime <= 0) {
                clearInterval(timer);
                resendBtn.textContent = "Resend";
              }
            }, 1000);
          }
        }
      }
    });

    return () => {
      isMounted = false; // 🟢 Cancel async actions
      if (timer) clearInterval(timer); // 🟢 Clear active timer
    };
  }, []);

  function handleSubmit(formData: FormData) {
    verifyOTP(formData).then((res: IActionResponse<any>) => {
      console.log(res);

      if (res.success) {
        setStatus("OTP verified successfully!");
      } else {
        setStatus(res.errorMsg);
      }
    });
  }

  return (
    <div className="p-4 rounded-3xl border flex flex-col items-center justify-center gap-1">
      <h1 className="text-3xl font-normal">Verify Email</h1>
      <p className="text-sm">Verify your email to get started</p>
      {status && <p>{status}</p>}
      {/* Form */}
      <form
        action={handleSubmit}
        className="flex flex-col gap-2 min-w-60 w-80 max-w-100"
        onSubmit={(e) => {
          // e.preventDefault();
        }}
      >
        <div className="flex justify-between items-center">
          <BetterInput
            type="number"
            placeholder="OTP"
            name="otp"
            className="flex-1 "
          />
          <button className="bg-primary h-8 w-24 rounded-md" ref={resendRef}>
            Resend
          </button>
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
