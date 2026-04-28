"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import ItemName from "./ItemName";
import Categories from "./Categoryes";
import ItemDetailsRightside from "./ItemDetailsRightside";

export default function SingleRestaurantDetails({ details }: any) {
  const hasData = details?.length > 0;

  return (
    <div className="rounded-xl p-4 text-white w-full max-w-5xl">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 w-4 h-4" />
        <Input
          placeholder="Search Item"
          className="w-full bg-[#00243F] rounded-full py-5 pl-10 pr-4 text-sm outline-none"
        />
      </div>

      {/* Categories */}
      <Categories />

      {/* Content */}
      {hasData ? (
        <div className="grid grid-cols-12 gap-4">
          <ItemName details={details} />
          <ItemDetailsRightside data={details} />
        </div>
      ) : (
        <div className="flex items-center justify-center  mt-20 text-xl rounded-lg">
          <span className="">No data found. Please Add New Item.</span>
        </div>
      )}
    </div>
  );
}
