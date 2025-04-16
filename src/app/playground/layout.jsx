import { SidebarProvider, SidebarTrigger } from "../../../components/components/ui/sidebar"
import { AppSidebar } from "../admin/components/app-sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
