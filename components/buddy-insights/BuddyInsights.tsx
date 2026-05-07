"use client";

import { myFetch } from "@/app/utils/myFetch";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import EditBuddyInsightModal from "./EditBuddyInsightModal";
import DeleteModal from "../modal/DeleteModal";
import { revalidate } from "@/app/utils/revalidateTags";
import { Switch } from "../ui/switch";
import AddBuddyInsightModal from "./AddBuddyInsightModal";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { useSearchParams } from "next/navigation";

interface IBuddyInsights {
  _id: string;
  outcome: "Good" | "Okay" | "Not Good";
  message: string;
  isActive: boolean;
}

export default function BuddyInsights({ data }: { data: IBuddyInsights[] }) {
  const updateSearchParams = useUpdateSearchParams();
  const outcome = useSearchParams().get("outcome");
  
  // handle delete
  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error("Please select item name", { id: "delete" });
      return;
    }
    try {
      toast.loading("Deleting...", { id: "delete" });
      const res = await myFetch(`/v2/buddy-insights/${id}`, {
        method: "DELETE",
      });

      if (res.success) {
        toast.success(res.message, { id: "delete" });
        revalidate("buddy-insights");
      } else {
        toast.error((res as any).error[0].message ?? "Upload failed", {
          id: "delete",
        });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again ", {
        id: "delete",
      });
    } finally {
      toast.dismiss("delete");
    }
  };

  // handle activation
  const handleActivation = async (item: any) => {
    if (!item?._id) {
      toast.error("Please select item name", { id: "activation" });
      return;
    }
    try {
      toast.loading("Updating...", { id: "activation" });
      const res = await myFetch(`/v2/buddy-insights/${item?._id}`, {
        method: "PATCH",
        body: { isActive: !item?.isActive },
      });

      if (res.success) {
        toast.success(res.message, { id: "activation" });
        revalidate("buddy-insights");
      } else {
        toast.error((res as any).error[0].message ?? "Upload failed", {
          id: "activation",
        });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again ", {
        id: "activation",
      });
    } finally {
      toast.dismiss("activation");
    }
  };

  return (
    <div className="p-3 text-white">
      {/* header */}
      <section className="flex justify-between mb-4">
        <Tabs
          defaultValue={outcome || "Good"}
          onValueChange={(value) => updateSearchParams({ outcome: value })}
        >
          <TabsList>
            <TabsTrigger value="Good">Good</TabsTrigger>
            <TabsTrigger value="Okay">Okay</TabsTrigger>
            <TabsTrigger value="Not Good">Not Good</TabsTrigger>
          </TabsList>
        </Tabs>

        <AddBuddyInsightModal
          trigger={
            <Button className="bg-[#FF6D00] hover:bg-[#FF6D00] text-white px-7 rounded-full text-base">
              Add Insight
            </Button>
          }
        ></AddBuddyInsightModal>
      </section>

      {/* content */}
      <section className="grid items-center gap-4">
        {data?.length > 0 &&
          data?.map((item: any) => (
            <div
              key={item?._id}
              className="p-2 px-4 bg-primary rounded-xl flex justify-between items-center gap-4"
            >
              <div>
                <h3>{item?.message}</h3>
              </div>
              {/* actions */}
              <div className="flex items-center gap-2">
                <Switch
                  checked={item?.isActive}
                  onCheckedChange={() => handleActivation(item)}
                  className="data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-[#FF6D00] cursor-pointer"
                />

                <EditBuddyInsightModal
                  trigger={
                    <Button variant={"ghost"} size={"icon"}>
                      <PencilLine />
                    </Button>
                  }
                  item={item}
                />
                <DeleteModal
                  triggerBtn={
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 />
                    </Button>
                  }
                  action={handleDelete}
                  itemId={item._id}
                  actionBtnText="Confirm"
                ></DeleteModal>
              </div>
            </div>
          ))}

        {/* no data */}
        {data?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No insights found.</p>
          </div>
        )}
      </section>
    </div>
  );
}
