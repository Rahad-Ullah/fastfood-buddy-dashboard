"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import DeleteModal from "../modal/DeleteModal";
import { toast } from "sonner";
import { myFetch } from "@/app/utils/myFetch";
import { revalidate } from "@/app/utils/revalidateTags";

export default function ItemName({ details }: any) {
  const router = useRouter();

    const handleDelete = async (id: string) => {
      toast.loading("Deleting...", { id: "delete" });
      if (!id) {
        toast.error("Please select item name", { id: "delete" });
        return;
      }
      try {
        const res = await myFetch(`/v1/foods/${id}`, {
          method: "DELETE",
        });

        if (res.success) {
          toast.success(res.message, { id: "delete" });
          revalidate("food");
          window.location.reload();
        } else {
          toast.error((res as any).error[0].message ?? "Upload failed", {
            id: "delete",
          });
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Try again ", {
          id: "delete",
        });
      }
    };

  return (
    <div className="col-span-12 bg-[#00243F] rounded-lg p-3">
      <h4 className="text-md mb-2 text-cyan-400">Item Name</h4>
      <ul className="space-y-1 text-sm">
        {details?.map((item: any, i: number) => (
          <li
            key={i}
            className={`flex justify-between items-center gap-4 px-3 py-2 text-white hover:bg-[#0A3F5E] text-md rounded cursor-pointer`}
          >
            <div>{item?.name}</div>
            <div className="flex items-center gap-1">
              <Button
                onClick={() =>
                  router.push(`/dashboard/restaurant-form/${item?._id}`)
                }
                variant={"ghost"}
                size={"icon"}
              >
                <PencilLine />
              </Button>
              <DeleteModal
                itemId={item?._id}
                triggerBtn={
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="text-red-400"
                  >
                    <Trash2 />
                  </Button>
                }
                action={handleDelete}
              ></DeleteModal>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
