import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "../share/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex gap-6">
      <aside className="bg-white">
        <Sidebar />
      </aside>
      <main className="flex-1 h-screen pt-7 pr-7 ">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div
          className="overflow-y-auto scroll-smooth p-4 hide-scrollbar "
          style={{ height: "calc(100vh - 75px)" }}
        >
          {children}
        </div>
      </main>
    </section>
  );
}
