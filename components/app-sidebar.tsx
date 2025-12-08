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
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "@/generated/prisma/enums";
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

type NavigationItem = {
  title: string;
  url: string;
  accessRole?: Role[];
  icon?: React.ElementType;
  items?: NavigationItem[];
};

const data: Record<string, NavigationItem[]> = {
  navMain: [
    {
      title: "School",
      url: "#",
      accessRole: [Role.ADMIN, Role.TEACHER],
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
    {
      title: "Administration",
      url: "#",
      accessRole: [Role.ADMIN],
      items: [
        {
          title: "Users",
          url: "/admin/users",
          icon: UserIcon,
        },
      ],
    },
  ],
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session?.user;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/admin">
          <h1 className="text-lg font-semibold">Report System</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => {
          const role = user?.role;

          return (
            role &&
            item?.accessRole?.includes(role as string as Role) && (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item?.items?.map((item) => (
                      <SidebarMenuItem key={item.title} className={cn()}>
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
            )
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} isSidebar={true} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
