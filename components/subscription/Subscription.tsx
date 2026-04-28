import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { myFetch } from "@/app/utils/myFetch";
import SubscriptionModal from "../modal/SubscriptionModal";

export default async function PricingCard() {
  const res = await myFetch("/packages", {
    tags: ["packages"],
  });
  return (
    <div className="grid grid-cols-4 gap-7 p-4">
      {res?.data?.map((item: any) => (
        <div
          key={item?._id}
          className="w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-[#054768] flex flex-col"
        >
          {/* Header */}
          <div className="px-8 py-6 text-center bg-[#0a4d6e]">
            <h2 className="text-white text-xl font-semibold">{item?.name}</h2>
            <div className="mt-4">
              <span className="text-white text-5xl font-bold">
                ${item?.price}
              </span>
            </div>
          </div>

          {/* Features List (grows) */}
          <div className="px-8 py-8 space-y-5 flex-1">
            {item?.features?.map((feature: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <Check
                  className="w-5 h-5 text-white mt-0.5 shrink-0"
                  strokeWidth={3}
                />
                <p className="text-white text-sm leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>

          {/* Edit Button (always bottom, same position) */}
          <div className="px-8 pb-8 mt-auto">
            <SubscriptionModal
              item={item}
              trigger={
                <Button className="w-full bg-[#0a5570] hover:bg-[#0c6585] text-white font-semibold py-4 rounded-xl transition-colors duration-200 shadow-lg">
                  Edit
                </Button>
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
