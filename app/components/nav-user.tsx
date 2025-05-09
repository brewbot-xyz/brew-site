"use client";

{
  /* <UserButton __experimental_asProvider>
<SidebarMenuButton
size="lg"
className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
>
<div className="grid flex-1 text-left text-sm leading-tight">
  <span className="truncate font-medium">{user.fullName || "User Name"}</span>
  <span className="truncate text-xs">{user.primaryEmailAddress?.emailAddress || "User Email"}</span>
</div>
<ChevronsUpDown className="ml-auto size-4" />
</SidebarMenuButton>
  <UserButton.__experimental_Outlet __experimental_asStandalone/>
</UserButton> */
}

import { ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/components/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                <AvatarFallback className="rounded-full">
                  {user.fullName
                    ?.split(" ")
                    .map((name) => name[0])
                    .join("") || ""}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.fullName}</span>
                <span className="truncate text-xs">@{user.username}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 bg-transparent rounded-none border-none shadow-none"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={12}
          >
            <UserButton __experimental_asProvider>
              <UserButton.__experimental_Outlet
                __experimental_asStandalone
                showName={false}

                appearance={{
                  elements: {
                    button__manageAccount: {
                      display: "none",
                    },
                    userButtonPopoverFooter: {
                      display: "none",
                    },
                    userPreviewSecondaryIdentifier: {
                      visibility: "hidden",
                      "&::before": {
                        content: `"${user.primaryEmailAddress?.emailAddress}"`,
                        visibility: "visible",
                      },
                    },
                  },
                }}
              />
            </UserButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
