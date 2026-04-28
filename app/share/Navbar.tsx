"use client";
import Image from "next/image";
import Link from "next/link";
import { myFetch } from "../utils/myFetch";
import { menuItems } from "@/components/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
type Profile = {
  name: string;
  role: string;
  image?: string;
};
export default function Navbar() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch("/users/profile", {
        method: "GET",
        tags: ["profile"],
      });
      setProfile(res?.data);
    };

    fetchData();
  }, []);
  const pathname = usePathname();

  const currentPath = menuItems?.find((item) => item.path === pathname);

  const profileImage = profile?.image
    ? profile.image.startsWith("http")
      ? profile.image
      : `${process.env.NEXT_PUBLIC_IMAGE_URL}${profile.image}`
    : "/profile.png";

  return (
    <div className="bg-primary px-8 py-3 rounded-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-3xl font-semibold">
          {currentPath?.label}
        </h1>

        <Link href={`/dashboard/profile`}>
          <div className="flex items-center gap-3">
            <Image
              src={profileImage}
              alt="logo"
              width={50}
              height={60}
              className="w-12 h-12 rounded-full object-cover"
              sizes="100vh"
              unoptimized
            />
            <div className="text-white">
              <div className="font-medium">{profile?.name}</div>
              <div className="text-sm text-blue-200">{profile?.role}</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
