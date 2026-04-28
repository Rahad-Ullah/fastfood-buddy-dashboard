import Image from "next/image";
import { Toaster } from "sonner";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001526] gap-20 p-6">
      <div className="flex justify-end items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={600}
          height={800}
          className="w-80 h-120 object-cover" // Keep the image responsive
        />
      </div>
      <div className="flex justify-start items-start">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
