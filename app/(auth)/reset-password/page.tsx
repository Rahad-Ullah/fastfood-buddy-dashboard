/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { myFetch } from "@/app/utils/myFetch";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const resetToken = localStorage.getItem("resetToken") || "";
    const res = await myFetch("/auth/reset-password", {
      method: "POST",
      token: resetToken,
      body: {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
    });

    if (res.success) {
      localStorage.removeItem("resetToken");
      router.push("/login");
    } else {
      console.error(
        "Password reset failed:",
        res?.message ?? "Failed to reset password!"
      );
    }
  };

  return (
    <div className="w-100 mx-auto p-6 border border-[#00D4FF] rounded-lg shadow-lg">
      <h2 className="text-2xl text-[#008FFF] font-semibold mb-6 text-center">
        Sign in to Fastfood Buddy
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="block mb-1 text-white" htmlFor="password">
            Password
          </label>
          <input
            type="newPassword"
            placeholder="Enter Password"
            {...register("newPassword", { required: "Password is required" })}
            className="authInputStyle"
          />
        </div>

        <div className="space-y-2">
          <label className="block mb-1 text-white" htmlFor="password">
            Password
          </label>
          <input
            type="confirmPassword"
            placeholder="Enter Password"
            {...register("confirmPassword", {
              required: "Password is required",
            })}
            className="authInputStyle"
          />
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-center text-white mt-2 text-sm">
            You don’t have to get it right — just check in.
          </p>
          <button type="submit" className="authButtonStyle">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
