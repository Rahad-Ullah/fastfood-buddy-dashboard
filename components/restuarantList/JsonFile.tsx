"use client";

import { myFetch } from "@/app/utils/myFetch";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Image from "next/image";

type UploadResult = {
  insertedCount: number;
  totalCount: number;
};

export default function JsonFile({ restaurantId }: { restaurantId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState<UploadResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUploadFile = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    if (!restaurantId) {
      toast.error("Restaurant not selected");
      return;
    }

    const formData = new FormData();
    formData.append("data", file);
    formData.append("restaurant", restaurantId);

    try {
      const res = await myFetch("/foods/import", {
        method: "POST",
        body: formData,
      });

      if (res?.success) {
        setUploadData(res.data);
        toast.success(res.message ?? "File uploaded successfully");
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
      } else {
        toast.error((res as any).error[0].message ?? "Upload failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again");
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="border-2 border-dashed border-[#0097B5] flex items-center justify-center p-12 text-white cursor-pointer rounded-lg"
      >
        {
          <div className="relative flex flex-col justify-center items-center gap-5 w-full h-full space-y-2 rounded-lg">
            {/* Cancel Button */}
            {file && (
              <button
                onClick={() => {
                  setFile(null);
                  setUploadData(null);
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
                title="Remove file"
              >
                ✕
              </button>
            )}

            {/* Upload Image */}
            <div>
              <Image
                src="/upload.png"
                alt="upload"
                width={32}
                height={24}
                className="w-8 h-6"
                sizes="100vh"
              />
            </div>

            {/* File Name / Placeholder */}
            <p className="text-[#00C1E8] font-medium text-center">
              {file?.name ?? "Upload CSV / PDF"}
            </p>
          </div>
        }
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".json"
        onChange={handleChange}
      />

      <div className="flex gap-7 text-white mt-5">
        {file && (
          <div>
            <Button
              onClick={handleUploadFile}
              type="button"
              className="bg-[#FF6D00] hover:bg-[#FF6D00] text-white px-7 h-10 rounded-full text-lg"
            >
              Upload File
            </Button>
          </div>
        )}
        {uploadData && (
          <div className="  text-white shadow-md">
            <h1 className="bg-[#00243F] font-semibold text-md  text-cyan-300 p-2 rounded">
              Uploaded {uploadData?.insertedCount} Items of{" "}
              {uploadData?.totalCount}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
