import { myFetch } from "@/app/utils/myFetch";
import ChartBar from "@/components/overview/Chartbar";

export default async function Page() {
  const res = await myFetch("/analytics/overview");
  const chatData = await myFetch("/analytics/user-growth");

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-6 mb-8">
        <StatCard title="Total User" value={res?.data?.totalUsers} />
        <StatCard title="Active Users" value={res?.data?.activeUsers} />
      </div>
      <div className="">
        <ChartBar card={res?.data} chart={chatData?.data} />
      </div>
    </div>
  );
}

/* Stats Card */
function StatCard({ title, value }: any) {
  return (
    <div className="rounded-xl bg-[#0B3A55] px-6 py-7 shadow-lg">
      <p className=" text-cyan-200 text-xl">{title}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
    </div>
  );
}
