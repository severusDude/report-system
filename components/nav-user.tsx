"use client";

import { toast } from "sonner";
import {
  BoxIcon,
  ChevronsUpDown,
  HomeIcon,
  LogOut,
  UserRoundPenIcon,
} from "lucide-react";

import Link from "next/link";
import { getImageProps } from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/services/auth-service";
import { ImgProps } from "next/dist/shared/lib/get-img-props";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Separate component for sidebar version to isolate the useSidebar hook
function NavUserSidebar({
  user,
  props,
  handleSignOut,
  align,
  side,
}: {
  user: { name: string; email: string };
  props: ImgProps;
  handleSignOut: () => void;
  align?: DropdownMenuContentProps["align"];
  side?: DropdownMenuContentProps["side"];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage {...props} />
                <AvatarFallback className="rounded-lg">LF</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <NavUserDropdown
            user={user}
            props={props}
            handleSignOut={handleSignOut}
            isMobile={isMobile}
            align={align}
            side={side}
          />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// Separate component for navbar version
function NavUserStandalone({
  user,
  props,
  handleSignOut,
  align,
  side,
}: {
  user: { name: string; email: string };
  props: ImgProps;
  handleSignOut: () => void;
  align?: DropdownMenuContentProps["align"];
  side?: DropdownMenuContentProps["side"];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage {...props} />
            <AvatarFallback className="rounded-lg">LF</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <NavUserDropdown
        user={user}
        props={props}
        handleSignOut={handleSignOut}
        isMobile={false}
        align={align}
        side={side}
      />
    </DropdownMenu>
  );
}

// Shared dropdown menu component
function NavUserDropdown({
  user,
  props,
  handleSignOut,
  isMobile,
  align,
  side,
}: {
  user: { name: string; email: string };
  props: ImgProps;
  handleSignOut: () => void;
  isMobile: boolean;
  align?: DropdownMenuContentProps["align"];
  side?: DropdownMenuContentProps["side"];
}) {
  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      side={isMobile ? "bottom" : side}
      align={align}
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage {...props} />
            <AvatarFallback className="rounded-lg">LF</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/">
            <HomeIcon />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin">
            <BoxIcon />
            Console
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserRoundPenIcon />
            Account
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSignOut}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export function NavUser({
  user,
  align = "start",
  side = "right",
  isSidebar = true,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  align?: DropdownMenuContentProps["align"];
  side?: DropdownMenuContentProps["side"];
  isSidebar?: boolean;
}) {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const { props } = getImageProps({
    src: user.avatar || "/user.svg",
    alt: "user-avatar",
    width: 40,
    height: 40,
  });

  async function handleSignOut() {
    try {
      if (!session) {
        console.warn("Unable to get session or user is not signed in");
        return;
      }

      const result = await signOut();

      if (!result.success) {
        throw new Error(result.message || "Failed to sign out");
      }

      toast.success("Signed out successfully");
      router.push("/");
    } catch (error) {
      let errorMessage = "Failed to sign out";
      console.error(`${errorMessage}: `, error);

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  }

  // Return the appropriate component based on context
  if (isSidebar) {
    return (
      <NavUserSidebar
        user={user}
        props={props}
        handleSignOut={handleSignOut}
        align={align}
        side={side}
      />
    );
  }

  return (
    <NavUserStandalone
      user={user}
      props={props}
      handleSignOut={handleSignOut}
      align={align}
      side={side}
    />
  );
}
