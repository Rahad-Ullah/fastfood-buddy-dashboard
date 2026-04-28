"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemName({ details }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("name") || "";

  const [category, setCategory] = useState(selectedCategory);

  // Update URL search param on category change
  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
    const params = new URLSearchParams(window.location.search);
    params.set("name", cat);
    router.replace(`?${params.toString()}`);
  };

  // Sync state when URL changes externally
  useEffect(() => {
    if (selectedCategory !== category) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="col-span-4 bg-[#00243F] rounded-lg p-3">
      <h4 className="text-md mb-2 text-cyan-400">Item Name</h4>
      <ul className="space-y-1 text-sm">
        {details?.map((item: any, i: number) => (
          <li
            key={i}
            onClick={() => handleCategoryClick(item?._id)}
            className={`px-3 py-2 text-white text-md rounded cursor-pointer ${
              item?._id === category
                ? "bg-cyan-500 text-black"
                : "hover:bg-[#0A3F5E]"
            }`}
          >
            {item?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
