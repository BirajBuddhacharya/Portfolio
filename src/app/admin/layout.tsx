import Sidebar from "@/components/admin/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <SidebarProvider className="w-full">
      <Sidebar />
      <main className="w-full h-full bg-neutral min-h-[100vh]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
