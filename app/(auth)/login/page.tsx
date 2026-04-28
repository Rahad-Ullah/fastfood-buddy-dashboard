/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { myFetch } from "@/app/utils/myFetch";
import { setCookie } from "cookies-next";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignInForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [showCurrent, setShowCurrent] = useState(false);

  const onSubmit = async (data: any) => {
    const res = await myFetch("/auth/login", {
      method: "POST",
      body: {
        email: data.email,
        password: data.password,
      },
    });

    if (res.success) {
      setCookie("accessToken", res?.data?.accessToken);
      setCookie("role", res?.data?.role);
      router.push("/dashboard");
    } else {
      toast.error(res?.message ?? "Login failed!");
    }
  };

  return (
    <div className="w-100 mx-auto p-6 border border-[#00D4FF] rounded-lg shadow-lg">
      <h2 className="text-2xl text-[#008FFF] font-semibold mb-6 text-center">
        Sign in to Fastfood Buddy
      </h2>
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

        <div className="space-y-2 relative">
          <label className="block text-white" htmlFor="password">
            Password
          </label>

          <input
            type={showCurrent ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
            className="authInputStyle pr-10"
          />

          <button
            type="button"
            onClick={() => setShowCurrent((prev) => !prev)}
            className="absolute right-3 top-12 text-gray-400 cursor-pointer"
          >
            {showCurrent ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="mr-2"
            />
            Remember me
          </label>
          <a href="/forgot-password" className="text-blue-300 text-sm">
            Forgot Password?
          </a>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-center text-white mt-2 text-sm">
            You don’t have to get it right — just check in.
          </p>
          <button type="submit" className="authButtonStyle">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
