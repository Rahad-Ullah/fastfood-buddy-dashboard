"use client";

import { useState } from "react";
import { myFetch } from "@/app/utils/myFetch";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function BuddyInsights({ data }: { data: { content: string } }) {
  const [content, setContent] = useState(data?.content || "");

  const handleOnSave = async () => {
    if (!content?.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      const termsPost = await myFetch("/v1/disclaimer", {
        method: "POST",
        body: { type: "buddy-insights", content: content },
      });

      if (termsPost?.success) {
        toast.success("Updated successfully");
      } else {
        toast.error(termsPost?.message || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <section className="p-3">
      <div className="max-w-4xl mx-auto">
        <Label className="text-xl font-semibold mb-3">Buddy Insights</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your insights here..."
          className="min-h-40"
        />
        <Button
          onClick={() => handleOnSave()}
          className="bg-[#FF6D00] hover:bg-[#FF6D00] text-white px-7 h-10 mt-5 rounded-full text-lg cursor-pointer"
        >
          Save & Publish
        </Button>
      </div>
    </section>
  );
}
