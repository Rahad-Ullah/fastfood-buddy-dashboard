"use client";

import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { UploadCloud } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { myFetch } from "@/app/utils/myFetch";
import { revalidate } from "@/app/utils/revalidateTags";

type FormValues = {
  name: string;
  image: File | null;
};

export default function AddRestaurantModal({ trigger }: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0] || null;

    onChange(file); // react-hook-form
    setValue("image", file); // optional but safe

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);

    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      const res = await myFetch("/restaurants/create", {
        method: "POST",
        body: formData,
      });

      if (res.success) {
        toast.success(res.message);
        revalidate("restaurants");
      } else {
        toast.error((res as any).error[0].message ?? "Upload failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "try again and again");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="bg-[#062B44] rounded-xl p-5 text-white">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          {/* Upload Box */}
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <div
                onClick={handleImageClick}
                className="border-2 border-dashed border-cyan-500 rounded-lg h-40 flex items-center justify-center cursor-pointer mb-6 relative overflow-hidden"
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    width={10}
                    height={10}
                  />
                ) : (
                  <div className="flex flex-col items-center text-cyan-400">
                    <UploadCloud size={36} />
                    <span className="mt-2 text-sm">Upload Logo</span>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, field.onChange)}
                />
              </div>
            )}
          />

          {/* Restaurant Name */}
          <label className="text-sm text-gray-300 mb-2 block">
            Restaurant Name
          </label>

          <input
            {...register("name", { required: "Restaurant name is required" })}
            type="text"
            placeholder="Type Your Restaurant Name"
            className="w-full bg-transparent border border-cyan-600 rounded-full px-4 py-3 text-sm text-orange-400 placeholder-orange-400 focus:outline-none mb-2"
          />

          {errors.name && (
            <p className="text-red-400 text-xs mb-4">{errors.name.message}</p>
          )}

          {/* Button */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition rounded-full py-3 font-semibold mt-4"
          >
            Add Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
