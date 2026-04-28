"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const categories = ["Breakfast", "Lunch", "Dinner", "Snacks"];

export default function Categories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const id = searchParams.get("restaurant") || "";

  const [category, setCategory] = useState(selectedCategory);

  // Update URL search param on category change
  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
    const params = new URLSearchParams(window.location.search);
    params.set("category", cat);
    router.replace(`?${params.toString()}`);
  };

  // Sync state when URL changes externally
  useEffect(() => {
    if (selectedCategory !== category) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="flex items-center justify-between gap-2 mb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleCategoryClick(cat)}
            className={`py-2 px-4 rounded-full cursor-pointer font-medium text-center ${
              cat === category
                ? "bg-cyan-500 text-white"
                : "bg-[#0A3F5E] text-gray-200"
            }`}
          >
            {cat}
          </div>
        ))}
      </div>

      <div>
        <Link href={`/dashboard/restaurant-form/${id}`}>
          <button className="ml-auto flex items-center gap-1 bg-cyan-500 text-white text-md px-3 py-2 rounded-full cursor-pointer">
            <Plus size={14} /> Add New Item
          </button>
        </Link>
      </div>
    </div>
  );
}
