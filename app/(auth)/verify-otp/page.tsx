/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, Controller } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { myFetch } from "@/app/utils/myFetch";
import { useRouter } from "next/navigation";

const defaultValues = {
  verifyOtp: "",
};

const VerifyOtp = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors }, // To handle validation errors
  } = useForm({
    defaultValues,
    mode: "onChange", // Enable real-time validation
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    const resetEmail = localStorage.getItem("resetEmail");
    const res = await myFetch("/auth/verify-email", {
      method: "POST",
      body: {
        email: resetEmail,
        oneTimeCode: Number(data.verifyOtp),
      },
    });

    if (res.success) {
      // Proceed to reset password page or next step
      localStorage.setItem("resetToken", res?.data);
      localStorage.removeItem("resetEmail");
      router.push("/reset-password");
    } else {
      // Handle error (e.g., show error message)
      console.error(
        "OTP verification failed:",
        res?.message ?? "Failed to verify OTP!"
      );
    }
    // You can replace this with your logic to verify OTP
  };

  return (
    <div className="w-100 mx-auto p-6 border border-[#00D4FF] rounded-lg shadow-lg">
      <h2 className="text-2xl text-[#008FFF] font-semibold mb-4 text-center">
        Verify OTP
      </h2>
      <p className="text-sm text-white mb-6 text-center">
        Enter your verification code that we have sent your email
        sh********123@gmail.com
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* OTP Field */}
        <div className="space-y-2">
          <label className="block text-white" htmlFor="verifyOtp">
            Enter OTP
          </label>
          <Controller
            name="verifyOtp"
            control={control}
            rules={{ required: "OTP is required" }}
            render={({ field: { value, onChange } }) => (
              <InputOTP maxLength={6} value={value} onChange={onChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {/* Display error message */}
          {errors.verifyOtp && (
            <p className="text-red-500 text-sm">{errors.verifyOtp.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="authButtonStyle">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
