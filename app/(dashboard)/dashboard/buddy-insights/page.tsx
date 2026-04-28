import { myFetch } from "@/app/utils/myFetch";
import BuddyInsights from "@/components/settings/BuddyInsights";

export default async function BuddyInsightsPage() {
  const res = await myFetch("/v1/disclaimer/buddy-insights");

  return (
    <>
      <BuddyInsights data={res?.data} />
    </>
  );
}
