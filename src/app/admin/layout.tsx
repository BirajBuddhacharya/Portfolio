import Sidebar from "@/components/admin/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppBreadCrumbs from "@/components/admin/AppBreadCrumbs";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <SidebarProvider className="w-full">
      <Sidebar />
      <main className="w-full bg-neutral min-h-[100vh]">
        <div className="flex gap-2 p-3">
          <SidebarTrigger />
          <AppBreadCrumbs />
        </div>
        <div className="sm:px-8 md:px-12 px-4 py-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
