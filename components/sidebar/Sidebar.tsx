"use client";
import {
  LayoutGrid,
  Users,
  Store,
  CreditCard,
  FileText,
  Shield,
  User,
  BotMessageSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogOutPage from "./LogOut";
import { usePathname } from "next/navigation";

export const menuItems = [
  {
    label: "Overview",
    icon: LayoutGrid,
    path: "/dashboard",
  },
  {
    label: "User Management",
    icon: Users,
    path: "/dashboard/users",
  },
  {
    label: "Restaurant List",
    icon: Store,
    path: "/dashboard/restaurent-list",
  },
  {
    label: "Subscription",
    icon: CreditCard,
    path: "/dashboard/subscription",
  },
  {
    label: "Terms & Condition",
    icon: FileText,
    path: "/dashboard/terms-condition",
  },
  {
    label: "Privacy Policy",
    icon: Shield,
    path: "/dashboard/privacy-policy",
  },
  {
    label: "Buddy Insights",
    icon: BotMessageSquare,
    path: "/dashboard/buddy-insights",
  },
  {
    label: "Change Password",
    icon: User,
    path: "/dashboard/change-password",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActiveStyle(path: string) {
    const check = path === pathname;
    return check
      ? `bg-linear-to-r from-[#012846] to-[#064E6F] border border-[#064E6F]`
      : ` bg-[#054768] hover:bg-[#065d84]`;
  }

  return (
    <aside className="h-screen w-80 bg-[#012846] text-white p-4 ">
      {/* Menu */}

      <Link href="/dashboard">
        <Image
          src="/sidebar.png"
          alt="logo"
          width={10}
          height={10}
          className="w-full h-44"
          sizes="100vh"
        />
      </Link>

      <div className="space-y-3 mt-10">
        {menuItems.map(({ label, icon: Icon, path }) => {
          const active = path === pathname;

          return (
            <Link
              href={path}
              key={path}
              className={`flex items-center gap-3 w-full px-5 py-3 rounded-full font-medium  text-lg ${isActiveStyle(
                path,
              )}`}
            >
              <Icon className="w-5 h-5 text-orange-400" />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <LogOutPage />
    </aside>
  );
}
