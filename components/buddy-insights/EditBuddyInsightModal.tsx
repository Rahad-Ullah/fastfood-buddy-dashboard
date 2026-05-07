"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { myFetch } from "@/app/utils/myFetch";
import { revalidate } from "@/app/utils/revalidateTags";

type FormValues = {
  message: string;
  outcome: "Good" | "Okay" | "Not Good";
};

export default function EditBuddyInsightModal({ trigger, item }: any) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      message: item?.message || "",
      outcome: item?.outcome || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await myFetch(`/v2/buddy-insights/${item._id}`, {
        method: "PATCH",
        body: data,
      });

      if (res.success) {
        toast.success(res.message || "Updated successfully");
        revalidate("buddy-insights");
        setOpen(false);
      } else {
        toast.error(res.message ?? "Failed to update insight");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again later");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="bg-[#062B44] border-none rounded-xl p-6 text-white max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-semibold">Edit Buddy Insight</h2>

          {/* Outcome Selection */}
          <div className="space-y-2">
            <label className="text-sm text-cyan-400 px-1">Outcome</label>
            <select
              {...register("outcome", { required: "Please select an outcome" })}
              className="w-full bg-[#062B44] border border-cyan-600 rounded-full px-4 py-3 text-sm text-orange-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 appearance-none"
            >
              <option value="Good">Good</option>
              <option value="Okay">Okay</option>
              <option value="Not Good">Not Good</option>
            </select>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label className="text-sm text-cyan-400 px-1">Message</label>
            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Type your message..."
              rows={5}
              className="w-full bg-transparent border border-cyan-600 rounded-2xl px-4 py-3 text-sm text-orange-400 placeholder:text-orange-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-sm ml-2">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white transition rounded-full py-6 font-semibold"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
