import { Calendar, Group, Home, BookOpen, Search, Settings, Speech } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarGroupLabel
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

// Menu items.
const groupedItems = [
  {
    group: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/admin/",
        icon: Home,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: Search,
      },
    ],
  },
  {
    group: "Content",
    items: [
      {
        title: "Blogs",
        url: "/admin/blogs",
        icon: BookOpen,
      },
      {
        title: "Projects",
        url: "/admin/projects",
        icon: Calendar,
      },
      {
        title: "Testimonials",
        url: "/admin/testimonials",
        icon: Speech,
      },
    ],
  },
  {
    group: "Configuration",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

const user = {
  name: "Biraj Buddhacharya",
  email: "birajbuddhacharya@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/123456789?v=4"
}

export default function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <Link href="/">
        <SidebarHeader className="flex gap-3 justify-start p-4 flex-row items-center">
          <Avatar className="h-8 w-7">
            <AvatarImage src='/img/logo.png' alt={user.name} />
            <AvatarFallback className="">A</AvatarFallback>
          </Avatar>
          <div className="font-polysans font-medium text-xl">
            Alchemy Place
          </div>
        </SidebarHeader>
      </Link>
      <SidebarContent className="">
        {groupedItems.map((group) => (
          <SidebarGroup key={group.group} className="px-2">
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 p-4">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight ">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar >
  )
}
