import * as React from "react";

import {
  CalendarCog,
  CheckSquare,
  ClipboardCheck,
  FileText,
  FlaskConical,
  UserIcon,
} from "lucide-react";

import Link from "next/link";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "School",
      url: "#",
      items: [
        {
          title: "Enrollments",
          url: "/admin/enrollments",
          icon: CheckSquare,
        },
        {
          title: "Terms",
          url: "/admin/terms",
          icon: CalendarCog,
        },
        {
          title: "Attendances",
          url: "/admin/attendances",
          icon: ClipboardCheck,
        },
        {
          title: "Subjects",
          url: "/admin/subjects",
          icon: FlaskConical,
        },
        {
          title: "Works",
          url: "/admin/works",
          icon: FileText,
        },
        {
          title: "Students",
          url: "/admin/students",
          icon: UserIcon,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/admin">
          <h1 className="text-lg font-semibold">Report System</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        {item.icon && <item.icon className="mr-2 size-4" />}{" "}
                        {item.title}
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
