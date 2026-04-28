import { myFetch } from "@/app/utils/myFetch";
import FoodForm from "../../../../components/restuarantList/FoodForm";
import RestaurantList from "@/components/restuarantList/RestuarantList";
import SingleRestaurantDetails from "@/components/restuarantList/SingleRestaurantDetails";
import Link from "next/link";

const Home = async ({
  searchParams,
}: {
  searchParams: { restaurant: string; category: string };
}) => {
  const res = await myFetch("/restaurants", {
    tags: ["restaurants"],
  });

  const { restaurant = "", category = "" } = await searchParams;
  const params = new URLSearchParams();

  if (restaurant) params.append("restaurant", restaurant);
  if (category) {
    params.append("category", category);
  }

  const singleDetails = await myFetch(`/foods?${params.toString()}`, {
    tags: ["food"],
  });

  return (
    <div className="grid grid-cols-[30%_70%]">
      <div>
        <RestaurantList data={res?.data} />
      </div>
      <div>
        <SingleRestaurantDetails details={singleDetails?.data} />
      </div>
    </div>
  );
};

export default Home;
