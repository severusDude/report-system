import { Edit, HomeIcon, MoonIcon, SearchIcon } from "lucide-react";

import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { Role } from "@/generated/prisma/enums";
import { NavUser } from "@/components/nav-user";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type Data = {
  student: {
    nisn: string;
    name: string;
    gender: string;
    birthPlace: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    address: string;
    imageUrl: string;
  };
  enrollments: {
    name: string;
    grade: string;
    teacher: {
      name: string;
      email: string;
    };
    attendances: {
      session: number;
      date: string;
      status: "present" | "absent" | "sick" | "on_leave";
    }[];
  }[];
};

const data: Data = {
  student: {
    nisn: "1234567890",
    name: "John Doe",
    gender: "male",
    birthPlace: "Jakarta",
    dateOfBirth: "2000-01-01",
    phoneNumber: "08123456789",
    email: "student@example.com",
    address: "Jl. Contoh, Jakarta",
    imageUrl: "https://via.placeholder.com/150",
  },
  enrollments: [
    {
      name: "Math",
      grade: "A",
      teacher: {
        name: "Mr. Smith",
        email: "z3r0o@example.com",
      },
      attendances: [
        {
          session: 1,
          date: "2023-01-01",
          status: "present",
        },
        {
          session: 2,
          date: "2023-01-02",
          status: "absent",
        },
        {
          session: 3,
          date: "2023-01-03",
          status: "sick",
        },
      ],
    },
    {
      name: "English",
      grade: "B",
      teacher: {
        name: "Ms. Johnson",
        email: "rj4t2@example.com",
      },
      attendances: [
        {
          session: 1,
          date: "2023-01-01",
          status: "present",
        },
        {
          session: 2,
          date: "2023-01-02",
          status: "absent",
        },
        {
          session: 3,
          date: "2023-01-03",
          status: "on_leave",
        },
      ],
    },
  ],
};

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = {
    name: session?.user.name ?? "",
    email: session?.user.email ?? "",
    avatar: session?.user.image ?? "",
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20vw",
        } as React.CSSProperties
      }
    >
      <Sidebar
        collapsible="icon"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      >
        <Sidebar
          collapsible="none"
          className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <HomeIcon />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <Sidebar collapsible="none">
          <SidebarContent>
            <SidebarGroup className="flex flex-col gap-2">
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu className="flex flex-col gap-2">
                  <SidebarMenuItem className="flex justify-between items-start">
                    <Avatar className="outline w-24 h-24">
                      <AvatarImage src="/user.svg" alt="user-icon" />
                    </Avatar>
                    {session?.user.role !== Role.PARENT && (
                      <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/students">
                          <Edit />
                        </Link>
                      </Button>
                    )}
                  </SidebarMenuItem>
                  <SidebarMenuItem className="flex flex-col">
                    <h1 className="text-lg font-semibold">
                      {data.student.name}
                    </h1>
                    <p className="text-sm text-secondary-foreground">
                      {data.student.email}
                    </p>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="flex flex-col gap-1 text-sm font-normal text-gray-500">
                    <p>{data.student.nisn}</p>
                    <p>
                      {new Date(data.student.dateOfBirth).toLocaleDateString(
                        "id-ID"
                      )}
                    </p>
                    <p>{data.student.phoneNumber}</p>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <Separator />
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  <SidebarMenuItem></SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={user} />
          </SidebarFooter>
        </Sidebar>
      </Sidebar>
      <SidebarInset>
        <header className="bg-background sticky top-0 flex justify-between items-center border-b p-4">
          <div className="flex shrink-0 gap-2 items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inbox</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex shrink-0 gap-2 items-center">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin/students">
                <MoonIcon />
              </Link>
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
            />
          ))} */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
