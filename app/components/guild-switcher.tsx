"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/components/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar"
import { trpc } from "@/lib/trpc"

export function GuildSwitcher() {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const params = useParams()
  const { data: guilds, isLoading } = trpc.discord.protectedGuilds.useQuery()
  const [activeGuildId, setActiveGuildId] = React.useState<string>()

  React.useEffect(() => {
    if (guilds?.length) {
      const guildId = params.guildId as string
      const guildExists = guilds.some(g => g.id === guildId)
      setActiveGuildId(guildExists ? guildId : guilds[0].id)
    }
  }, [guilds, params.guildId])

  if (isLoading || !guilds?.length) {
    return null
  }

  const activeGuild = guilds.find((g) => g.id === activeGuildId) || guilds[0]

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
                <AvatarImage src={activeGuild.iconUrl} alt={activeGuild.name} />
                <AvatarFallback className="rounded-lg">{activeGuild.name[0]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeGuild.name}</span>
                <span className="truncate text-xs">{activeGuild.owner ? "Owner" : "Member"}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Guilds
            </DropdownMenuLabel>
            {guilds.map((guild) => (
              <DropdownMenuItem
                key={guild.id}
                onClick={() => {
                  setActiveGuildId(guild.id)
                  router.push(`/dashboard/${guild.id}`)
                }}
                className="gap-2 p-2"
              >
                <Avatar className="h-6 w-6 rounded-md">
                  <AvatarImage src={guild.iconUrl} alt={guild.name} />
                  <AvatarFallback className="rounded-md">{guild.name[0]}</AvatarFallback>
                </Avatar>
                {guild.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add guild</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 