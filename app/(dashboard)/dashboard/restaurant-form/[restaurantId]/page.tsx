import RestuarantForm from "@/components/restuarantList/FoodForm";

export default async function Page({
  params,
}: {
  params: { restaurantId: string };
}) {
  const { restaurantId } = await params;

  return (
    <div className="max-w-5xl mx-auto">
      <RestuarantForm restaurantId={restaurantId} />
    </div>
  );
}
