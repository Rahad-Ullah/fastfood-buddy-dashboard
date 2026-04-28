import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import dayjs from "dayjs";
import Image from "next/image";

export default function UsersDetailsModal({
  trigger,
  item,
}: {
  trigger: React.ReactNode;
  item: any;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="bg-[#00596B] text-white rounded-xl w-full max-w-sm mx-auto p-6 flex flex-col items-center gap-4">
        {/* Avatar */}
        <Image
          src={
            item?.image
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.image}`
              : "/profile.png"
          }
          alt={item?.name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover"
          unoptimized
        />

        {/* User Info */}
        <div className="text-center flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{item?.name}</h2>
          <p className="text-sm text-gray-200">{item?.email}</p>
          <p className="text-sm text-gray-200">
            Registration Date: {dayjs(item?.date).format("DD MMM YYYY")}
          </p>
          <p className="text-sm text-gray-200">Status: {item?.status}</p>
        </div>

        {/* Block Button */}
        <button className="bg-orange-500 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors">
          {/* <Lock className="w-4 h-4" /> */}
          {item?.status}
        </button>
      </DialogContent>
    </Dialog>
  );
}
