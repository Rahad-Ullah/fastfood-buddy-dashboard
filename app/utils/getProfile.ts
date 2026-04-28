"use server";

import { cookies } from "next/headers";

const getProfile = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${process.env.BASE_URL}/users/profile`, {
    next: {
      tags: ["users-profile"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const { data } = await res?.json();
  return data;
};

export default getProfile;
