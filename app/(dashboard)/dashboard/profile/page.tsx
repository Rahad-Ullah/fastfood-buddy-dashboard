import { myFetch } from "@/app/utils/myFetch";
import Profile from "@/components/settings/Profile";

export default async function page() {
  const res = await myFetch("/users/profile", {
    method: "GET",
    tags: ["profile"],
  });
  return (
    <>
      <Profile data={res?.data} />
    </>
  );
}
