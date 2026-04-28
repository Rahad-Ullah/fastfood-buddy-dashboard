import { myFetch } from "@/app/utils/myFetch";
import Users from "@/components/users/Users";

export default async function page() {
  const res = await myFetch("/v1/users", {
    tags: ["users"],
  });

  return (
    <div className="bg-primary text-white">
      <Users data={res?.data} />
    </div>
  );
}
