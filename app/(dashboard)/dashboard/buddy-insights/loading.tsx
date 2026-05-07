import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center gap-4 h-[90vh] text-white">
      <Loader className="animate-spin size-6" />
      <h1 className="text-xl font-semibold ">Loading...</h1>
    </div>
  );
};

export default LoadingPage;
