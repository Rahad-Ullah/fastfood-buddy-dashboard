"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { myFetch } from "@/app/utils/myFetch";
import { toast } from "sonner";
import { revalidate } from "@/app/utils/revalidateTags";
import { useState } from "react";

type Inputs = {
  name: string;
  price: string;

  googleProductId: string;
  appleProductId: string;
  features: { value: string }[];
};

export default function SubscriptionModal({
  trigger,
  item,
}: {
  trigger: React.ReactNode;
  item?: any;
}) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: item?.name || "",
      price: item?.price || "",
      googleProductId: item?.googleProductId || "",
      appleProductId: item?.appleProductId || "",
      features: item?.features?.map((v: string) => {
        return {
          value: v,
        };
      }) || [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const features = data?.features?.map((item) => item.value);

    const payload = {
      name: data?.name,
      price: Number(data.price),
      features: features,
      googleProductId: data.googleProductId,
      appleProductId: data.appleProductId,
    };

    const id = item?._id ? "PATCH" : "POST";
    const url = item?._id ? `/packages/${item?._id}` : "/packages/create";

    try {
      const res = await myFetch(url, {
        method: id,
        body: payload,
      });

      if (res?.success) {
        toast.success(res?.message);
        revalidate("packages");
        reset();
      } else {
        toast.error((res as any).error[0].message ?? "Upload failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Occured try");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-[#00596B] text-white rounded-xl w-full min-w-xl mx-auto   gap-4">
        <h1>{item?._id ? "Edit Package" : "Add Package"}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input {...register("name")} type="text" placeholder="Enter name" />
          </div>

          <div>
            <Label>Price</Label>
            <Input {...register("price")} placeholder="Enter price" />
          </div>

          <div>
            <Label>AndroidProduct Id</Label>
            <Input
              {...register("googleProductId")}
              type="text"
              placeholder="Enter androidProduct Id"
            />
          </div>

          <div>
            <Label>IosProduct Id</Label>
            <Input
              {...register("appleProductId")}
              placeholder="Enter iosProduct Id"
            />
          </div>

          <div className="flex justify-between">
            <Label>Features</Label>

            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="border p-1 rounded-full cursor-pointer"
            >
              <Plus />
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <Input
                {...register(`features.${index}.value`)}
                placeholder="Enter feature"
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="p-1 rounded-full cursor-pointer"
              >
                <Minus />
              </button>
            </div>
          ))}

          <Button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded w-full "
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
