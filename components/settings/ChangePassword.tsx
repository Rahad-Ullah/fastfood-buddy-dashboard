"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { myFetch } from "@/app/utils/myFetch";
import { toast } from "sonner";

interface IFormInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const payload = {
      currentPassword: data?.currentPassword,
      newPassword: data?.newPassword,
      confirmPassword: data?.confirmPassword,
    };
    try {
      const res = await myFetch("/auth/change-password", {
        method: "POST",
        body: payload,
      });

      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error((res as any).error[0].message ?? "Upload failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "ocurr failed");
    }
  };

  const newPassword = watch("newPassword");

  return (
    <div className="max-w-md mx-auto p-6 bg-[#00596B] shadow-md rounded-md mt-32 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block mb-1 font-medium">Current Password</label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              {showCurrent ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-1 font-medium">New Password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              {showNew ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              {showConfirm ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="bg-[#FF6D00] hover:bg-[#FF6D00] text-white px-7 h-10 mt-5 rounded-full text-[16px] cursor-pointer w-full"
        >
          Update Password
        </Button>
      </form>
    </div>
  );
}
