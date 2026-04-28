"use client";

import { myFetch } from "@/app/utils/myFetch";
import { revalidate } from "@/app/utils/revalidateTags";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Define the type for details
interface Details {
  _id?: string;
  typicalServing?: Record<string, number>;
  // add other fields from details if needed
}

interface ItemDetailsRightsideProps {
  data: {
    fact?: string;
    reason?: string;
    absorption?: string;
  }[];
}

export default function ItemDetailsRightside({
  data,
}: ItemDetailsRightsideProps) {
  const searchParams = useSearchParams();
  const id = searchParams.get("name") || "";
  const router = useRouter();
  const [details, setDetails] = useState<Details | null>(null);

  // Fetch details based on id
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await myFetch(`/foods/${id}`);
        setDetails(res?.data || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load details");
      }
    };

    fetchData();
  }, [id]);

  const handleEditForm = (id?: string) => {
    if (!id) {
      toast.error("Please select item name");
      return;
    }
    router.push(`/dashboard/restaurant-form/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error("Please select item name");
      return;
    }
    try {
      const res = await myFetch(`/foods/${id}`, {
        method: "DELETE",
      });

      if (res.success) {
        toast.success(res.message);
        revalidate("food");
      } else {
        toast.error((res as any).error[0].message ?? "Upload failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again ");
    }
  };

  return (
    <div className="col-span-8 bg-[#00243F] rounded-lg p-4">
      {/* Facts Section */}
      <h3 className="text-cyan-400 text-sm mb-1">What usually happens</h3>
      <p className="text-sm mb-3">{data?.[0]?.fact || "No data available"}</p>

      <h3 className="text-cyan-400 text-sm mb-1">Why this matters?</h3>
      <p className="text-sm mb-4">{data?.[0]?.reason || "No data available"}</p>

      <h3 className="text-cyan-400 text-sm mb-1">Digestion Profile</h3>
      <p className="text-sm mb-4">
        <span className="text-cyan-400 font-medium">Moderate Absorption</span>
        <br />
        {data?.[0]?.absorption || "No data available"}
      </p>

      {/* Nutrition Box */}
      <div className="bg-[#083A5A] rounded-lg p-3 mb-4">
        <h4 className="mb-2 text-cyan-300 text-xl">Typical Serving</h4>
        <div className="grid grid-cols-4 gap-2">
          {details?.typicalServing ? (
            Object.entries(details.typicalServing).map(([key, value]) => (
              <div key={key} className="text-center">
                <p className="capitalize text-md">{key}</p>
                <p className="font-semibold">{value}g</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-4 text-center">
              No serving data
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => handleEditForm(details?._id)}
          className={`w-full rounded-full py-2 text-sm font-medium  bg-orange-500 hover:bg-orange-600 text-white cursor-pointer`}
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(details?._id as string)}
          className={`w-full rounded-full py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white cursor-pointer`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
