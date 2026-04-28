"use client";

import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { JoditEditor } from "./JodiEditor";
import { myFetch } from "@/app/utils/myFetch";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function PrivacyPolicy({
  terms,
}: {
  terms: { content: string };
}) {
  const editor = useRef(null);
  const isLargeScreen = useMediaQuery({ minWidth: 1536 });

  const [content, setContent] = useState(terms?.content || "");

  const handleOnSave = async (value: string) => {
    if (!value?.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      const termsPost = await myFetch("/disclaimer", {
        method: "POST",
        body: { type: "terms-and-conditions", content: value },
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
      <div>
        <JoditEditor
          className="border-none text-white"
          ref={editor}
          value={content}
          config={{
            height: isLargeScreen ? 600 : 470,
            theme: "custom",
            readonly: false,
          }}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleOnSave(content)}
          className="bg-[#FF6D00] hover:bg-[#FF6D00] text-white px-7 h-10 mt-5 rounded-full text-lg cursor-pointer"
        >
          Save & Change
        </Button>
      </div>
    </section>
  );
}
