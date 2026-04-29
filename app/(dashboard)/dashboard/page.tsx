import { myFetch } from "@/app/utils/myFetch";
import ChartBar from "@/components/overview/Chartbar";

export default async function AnalyticsPage({ searchParams }: any) {
  const { year } = await searchParams;

  const overviewRes = await myFetch("/v1/analytics/overview");
  const chartData = await myFetch(
    `/v1/analytics/user-growth?year=${year ?? new Date().getFullYear()}`,
  );

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-6 mb-8">
        <StatCard title="Total User" value={overviewRes?.data?.totalUsers} />
        <StatCard title="Active Users" value={overviewRes?.data?.activeUsers} />
      </div>
      <div className="">
        <ChartBar card={overviewRes?.data} chart={chartData?.data} />
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
