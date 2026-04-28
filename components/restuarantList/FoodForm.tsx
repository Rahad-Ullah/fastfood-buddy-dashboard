"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddRestaurantModal from "../modal/AddRestaurantModal";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { myFetch } from "@/app/utils/myFetch";
import JsonFile from "./JsonFile";
import { revalidate } from "@/app/utils/revalidateTags";
import { useRouter } from "next/navigation";

type FormValues = {
  name: string;
  category: "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "";
  impactSpeed: "Fast" | "Moderate" | "Slow" | "";
  digestionSpeed: "Fast" | "Moderate" | "Slow" | "";
  spike: "Often spikes" | "Spikes later" | "Often spikes later" | "";
  fact: string;
  reason: string;
  absorption: string;
  description: string;
  typicalServing: {
    carbs: number;
    fat: number;
    protein: number;
    fiber: number;
  };
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
      const res = await myFetch(`/foods/${restaurantId}`);
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
      impactSpeed: "",
      digestionSpeed: "",
      spike: "",
      fact: "",
      reason: "",
      absorption: "",
      description: "",
      typicalServing: {
        carbs: 0,
        fat: 0,
        protein: 0,
        fiber: 0,
      },
    },
  });

  useEffect(() => {
    if (!details) return;

    reset({
      name: details.name ?? "",
      category: details.category ?? "",
      impactSpeed: details.impactSpeed ?? "",
      digestionSpeed: details.digestionSpeed ?? "",
      spike: details.spike ?? "",
      fact: details.fact ?? "",
      reason: details.reason ?? "",
      absorption: details.absorption ?? "",
      description: details.description ?? "",
      typicalServing: {
        carbs: details.typicalServing?.carbs ?? 0,
        fat: details.typicalServing?.fat ?? 0,
        protein: details.typicalServing?.protein ?? 0,
        fiber: details.typicalServing?.fiber ?? 0,
      },
    });
  }, [details, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = {
      ...data,
      ...(!details?._id && { restaurant: restaurantId }),
    };

    const id = details?._id ? "PATCH" : "POST";
    const url = details?._id ? `/foods/${details._id}` : "/foods/create";

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
    <div>
      {/* Add Restaurant */}
      <div className="flex justify-end mb-4">
        <AddRestaurantModal
          trigger={
            <Button className="bg-[#FF6D00] hover:bg-[#FF6D00] text-white px-7 h-10 rounded-full text-lg">
              <Plus /> Add Restaurant
            </Button>
          }
        />
      </div>
      {!details?._id && <JsonFile restaurantId={restaurantId} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-7">
        {/* Category & Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        {/* Impact & Digestion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Impact Speed</Label>
            <Controller
              name="impactSpeed"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fast">Fast</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Slow">Slow</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label>Digestion Speed</Label>
            <Controller
              name="digestionSpeed"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select digestion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fast">Fast</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Slow">Slow</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label>Spikes Info</Label>
            <Controller
              name="spike"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select digestion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Often spikes">Often spikes</SelectItem>
                    <SelectItem value="Spikes later">Spikes later</SelectItem>
                    <SelectItem value="Often spikes later">
                      Often spikes later
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        {/* Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>What usually happens</Label>
            <Controller
              name="fact"
              control={control}
              render={({ field }) => (
                <Textarea {...field} rows={3} placeholder="Type here" />
              )}
            />
          </div>

          <div>
            <Label>Why this matters?</Label>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Textarea {...field} rows={3} placeholder="Type here" />
              )}
            />
          </div>
        </div>
        {/* Digestion Profile */}
        <div className="space-y-3">
          <Label>Absorption</Label>
          <Input
            {...register("absorption")}
            placeholder="e.g. Moderate absorption"
          />

          <Label>Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Textarea {...field} rows={3} />}
          />
        </div>
        {/* Nutrients */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </div>
        {/* Submit */}
        <button type="submit" className="authButtonStyle">
          {details?._id ? "Update" : "Add Now"}
        </button>
      </form>
    </div>
  );
}
