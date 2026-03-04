"use client";

import * as React from "react";

import { GuildSwitcher } from "@/components/guild-switcher";
import { NavExpandable } from "@/components/nav-main";
import { NavMain } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BsAwardFill,
  BsGearFill,
  BsGearWideConnected,
  BsGrid1X2Fill,
  BsJoystick,
  BsMusicNoteList,
  BsShieldFillX,
  BsStars,
  BsTools,
} from "react-icons/bs";

const data = {
  navMain: [
    {
      name: "Dashboard",
      url: "#",
      icon: BsGrid1X2Fill,
    },
    {
      name: "Leaderboard",
      url: "#",
      icon: BsAwardFill,
    },
    {
      name: "Settings",
      url: "#",
      icon: BsGearFill,
    },
  ],
  expandable: [
    {
      title: "Antinuke",
      url: "#",
      icon: BsShieldFillX,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Minigame",
      url: "#",
      icon: BsJoystick,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Miscellaneous",
      url: "#",
      icon: BsStars,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Moderation",
      url: "#",
      icon: BsTools,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Music",
      url: "#",
      icon: BsMusicNoteList,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Utilities",
      url: "#",
      icon: BsGearWideConnected,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <GuildSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavExpandable items={data.expandable} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
