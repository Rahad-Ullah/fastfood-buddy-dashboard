"use client";

import { Label } from "@/components/ui/label";
import { FileImage } from "lucide-react";
import Image from "next/image";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { myFetch } from "@/app/utils/myFetch";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { revalidate } from "@/app/utils/revalidateTags";

interface ProfileProps {
  data: {
    name?: string;
    image?: string;
  };
}

export default function Profile({ data }: ProfileProps) {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!data?.image) {
      return;
    }

    const imageSrc = data.image.startsWith("http")
      ? data.image
      : `${process.env.NEXT_PUBLIC_IMAGE_URL}${data.image}`;

    setImage(imageSrc);
  }, [data]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);

    setImage((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return objectUrl;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      const res = await myFetch("/users/profile", {
        method: "PATCH",
        body: formData,
      });

      if (res.success) {
        toast.success("Profile updated successfully");
        await revalidate("profile");
        window.location.reload();
      } else {
        toast.error((res as any).error[0].message ?? "Upload failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#012846] p-8 rounded-xl text-white h-full">
      {/* Avatar */}
      <div
        className="relative w-36 h-36 cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <Image
          src={image ?? "/profile.png"}
          alt="Profile"
          fill
          className="rounded-full object-cover border-4 border-white"
          unoptimized
        />

        <Label className="absolute bottom-1 right-1 bg-[#E6FBFF] text-[#012846] p-2 rounded-full cursor-pointer shadow">
          <FileImage size={18} />
        </Label>

        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Profile Info */}
      <h2 className="mt-5 text-2xl font-semibold">
        {data?.name || "User Name"}
      </h2>

      {/* Update Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-xs mt-6 space-y-4">
        <Input
          type="text"
          name="name"
          defaultValue={data?.name}
          placeholder="Enter your name"
          className="text-white bg-transparent border-gray-400"
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF6D00] hover:bg-[#FF6D00] text-white h-11 rounded-full text-base"
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
}
