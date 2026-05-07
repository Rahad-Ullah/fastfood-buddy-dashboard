import { myFetch } from "@/app/utils/myFetch";
import BuddyInsights from "@/components/buddy-insights/BuddyInsights";

export default async function BuddyInsightsPage({ searchParams }: any) {
  const { outcome } = await searchParams;

  const res = await myFetch(`/v2/buddy-insights?outcome=${outcome || "Good"}`, {
    tags: ["buddy-insights"],
  });

  return (
    <>
      <BuddyInsights data={res?.data} />
    </>
  );
}
