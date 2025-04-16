import { BookOpenText, LayoutDashboard, Inbox, SwatchBook, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../../components/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/",
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    url: "/admin/inbox",
    icon: Inbox,
  },
  {
    title: "Blogs",
    url: "/admin/blogs",
    icon: BookOpenText,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: SwatchBook,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
