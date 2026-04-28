/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { myFetch } from "@/app/utils/myFetch";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgotPassword = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const res = await myFetch("/auth/forget-password", {
      method: "POST",
      body: {
        email: data.email,
      },
    });
    if (res.success) {
      localStorage.setItem("resetEmail", data.email);
      router.push("/verify-otp");
    } else {
      toast.error((res as any).error[0].message ?? "Upload failed");
    }
  };

  return (
    <div className="w-100 mx-auto p-6 border border-[#00D4FF] rounded-lg shadow-lg">
      <h2 className="text-2xl text-[#008FFF] font-semibold mb-4 text-center">
        Forgot Password
      </h2>
      <p className="text-sm text-white mb-6 text-center">
        Enter your email address and get OTP for verification
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="block mb-1 text-white" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            {...register("email", { required: "Email is required" })}
            className="authInputStyle"
          />
        </div>

        <div className="mt-4 space-y-4">
          <button type="submit" className="authButtonStyle">
            Get OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
