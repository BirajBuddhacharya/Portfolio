import { SidebarProvider, SidebarTrigger } from "../../../components/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen overflow-hidden bg-neutral">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
