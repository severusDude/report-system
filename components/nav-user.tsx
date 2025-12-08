"use client";

import { toast } from "sonner";
import {
  BadgeCheck,
  BoxIcon,
  ChevronsUpDown,
  HomeIcon,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import { Session, User } from "@/lib/auth";
import { getImageProps } from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/services/auth-service";
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
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Role } from "@/generated/prisma/enums";
import { authClient } from "@/lib/auth-client";

interface NavUserProps {
  user: User;
  imageProps: ReturnType<typeof getImageProps>["props"];
  handleSignOut: () => void;
  onNavigate?: () => void;
}

// Shared dropdown menu component
function NavUserDropdown({
  user,
  imageProps,
  handleSignOut,
  isMobile,
  onNavigate,
  ...props
}: NavUserProps & { isMobile: boolean } & DropdownMenuContentProps) {
  const showAdminLink = user.role === Role.ADMIN || user.role === Role.TEACHER;

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      side={isMobile ? "bottom" : "right"}
      align="end"
      sideOffset={4}
      {...props}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage {...imageProps} />
            <AvatarFallback className="rounded-lg">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
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
          <Link href="/" onClick={onNavigate}>
            <HomeIcon />
            Home
          </Link>
        </DropdownMenuItem>
        {showAdminLink && (
          <DropdownMenuItem asChild>
            <Link href="/admin" onClick={onNavigate}>
              <BoxIcon />
              Administration
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/profile" onClick={onNavigate}>
            <BadgeCheck />
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

// Sidebar version
function NavUserSidebar({
  user,
  imageProps,
  handleSignOut,
  props,
}: NavUserProps & { props?: DropdownMenuContentProps }) {
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
                <AvatarImage {...imageProps} />
                <AvatarFallback className="rounded-lg">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </AvatarFallback>
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
            imageProps={imageProps}
            handleSignOut={handleSignOut}
            isMobile={isMobile}
            {...props}
          />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// Navbar version
function NavUserStandalone({
  user,
  imageProps,
  handleSignOut,
  props,
}: NavUserProps & { props?: DropdownMenuContentProps }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage {...imageProps} />
            <AvatarFallback className="rounded-lg">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
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
        imageProps={imageProps}
        handleSignOut={handleSignOut}
        isMobile={false}
        {...props}
      />
    </DropdownMenu>
  );
}

export function NavUser({
  session,
  isSidebar = true,
  props,
  onNavigate,
}: {
  session: Session;
  isSidebar?: boolean;
  props?: DropdownMenuContentProps;
  onNavigate?: () => void;
}) {
  const { refetch } = authClient.useSession();
  const router = useRouter();

  const imageProps = getImageProps({
    src: session.user.image ?? "/user.svg",
    alt: "user-avatar",
    width: 40,
    height: 40,
  }).props;

  async function handleSignOut() {
    try {
      if (!session.session) {
        console.warn("Unable to get session or user is not signed in");
        return;
      }

      const result = await signOut();

      if (!result.success) {
        throw new Error(result.message || "Failed to sign out");
      }

      toast.success("Signed out successfully");
      refetch();
      router.push("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to sign out";
      console.error("Sign out error:", error);
      toast.error(errorMessage);
    }
  }

  const componentProps = {
    user: session.user,
    imageProps,
    handleSignOut,
    props,
    onNavigate,
  };

  return isSidebar ? (
    <NavUserSidebar {...componentProps} />
  ) : (
    <NavUserStandalone {...componentProps} />
  );
}
