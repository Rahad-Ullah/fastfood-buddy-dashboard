"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { myFetch } from "@/app/utils/myFetch";
import JsonFile from "./JsonFile";
import { revalidate } from "@/app/utils/revalidateTags";
import { useRouter } from "next/navigation";

type FormValues = {
  name: string;
  category: "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "";
  // typicalServing: {
  //   carbs: number;
  //   fat: number;
  //   protein: number;
  //   fiber: number;
  // };
};

export default function RestuarantForm({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const [details, setDetails] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch(`/v2/foods/${restaurantId}`);
      setDetails(res?.data);
    };
    fetchData();
  }, [restaurantId]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: details?.name || "",
      category: "",
      // typicalServing: {
      //   carbs: 0,
      //   fat: 0,
      //   protein: 0,
      //   fiber: 0,
      // },
    },
  });

  useEffect(() => {
    if (!details) return;

    reset({
      name: details.name ?? "",
      category: details.category ?? "",
      // typicalServing: {
      //   carbs: details.typicalServing?.carbs ?? 0,
      //   fat: details.typicalServing?.fat ?? 0,
      //   protein: details.typicalServing?.protein ?? 0,
      //   fiber: details.typicalServing?.fiber ?? 0,
      // },
    });
  }, [details, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = {
      ...data,
      ...(!details?._id && { restaurant: restaurantId }),
    };

    const id = details?._id ? "PATCH" : "POST";
    const url = details?._id ? `/v2/foods/${details._id}` : "/v2/foods/create";

    try {
      const res = await myFetch(url, {
        method: id,
        body: payload,
      });

      if (res.success) {
        toast.success(res.message);
        revalidate("food");
        router.back();
      } else {
        toast.error((res as any).error[0].message ?? "Upload failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "try again");
    }
  };

  return (
    <section className="max-w-2xl mx-auto">
      {!details?._id && <JsonFile restaurantId={restaurantId} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-7">
        <h1 className="text-2xl font-semibold text-white">Edit Food Item</h1>
        {/* Category & Name */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>Item Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label>Item Name</Label>
            <Input
              {...register("name", { required: "Food name is required" })}
              placeholder="Type food name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
        </div>

        {/* Nutrients */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(["carbs", "fat", "protein", "fiber"] as const).map((item) => (
            <div key={item}>
              <Label className="capitalize">{item}</Label>
              <Controller
                name={`typicalServing.${item}`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="Enter grams"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : Number(e.target.value),
                      )
                    }
                  />
                )}
              />
            </div>
          ))}
        </div> */}

        {/* Submit */}
        <button type="submit" className="authButtonStyle">
          {details?._id ? "Update" : "Add Now"}
        </button>
      </form>
    </section>
  );
}
