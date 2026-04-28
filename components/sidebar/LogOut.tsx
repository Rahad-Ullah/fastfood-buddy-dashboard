"use client";

import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function LogOutPage() {
  const router = useRouter();

  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      deleteCookie("accessToken");
      deleteCookie("role");

      await Swal.fire({
        title: "Logged Out!",
        text: "You have been logged out successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/login"); // or "/"
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleLogOut}
      className="flex items-center justify-center gap-3 cursor-pointer px-5 py-3 mt-20 w-full rounded-full text-md font-medium bg-[#07324F] text-gray-200 hover:bg-[#0B4A6F] transition"
    >
      <LogOut className="w-5 h-5 text-orange-400" />
      Log Out
    </button>
  );
}
