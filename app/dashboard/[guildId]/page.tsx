"use client";

import { AppSidebar } from "@/app/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/breadcrumb";
import { Separator } from "@/app/components/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/app/components/sidebar";
import { trpc } from "@/lib/trpc";
import { useParams } from "next/navigation";

export default function GuildDashboard() {
  const params = useParams();
  const guildId = params.guildId as string;

  const {
    data: guild,
    isLoading,
    isError,
  } = trpc.discord.protectedGuilds.useQuery(undefined, {
    select: (guilds) => guilds.find((g) => g.id === guildId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !guild) {
    return <div>Error loading guild data</div>;
  }

  return (
    // <SidebarProvider>
    //   <AppSidebar />
    //   <SidebarInset>
    //     <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    //       <div className="flex items-center gap-2 px-4">
    //         <SidebarTrigger className="-ml-1" />
    //         <Separator orientation="vertical" className="mr-2 h-4" />
    //         <Breadcrumb>
    //           <BreadcrumbList>
    //             <BreadcrumbItem className="hidden md:block">
    //               <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
    //             </BreadcrumbItem>
    //             <BreadcrumbSeparator className="hidden md:block" />
    //             <BreadcrumbItem>
    //               <BreadcrumbPage>{guild.name}</BreadcrumbPage>
    //             </BreadcrumbItem>
    //           </BreadcrumbList>
    //         </Breadcrumb>
    //         <div className="ml-auto flex items-center gap-2">
    //           <span role="img" aria-label="flag">🇬🇧</span>
    //           <span>English</span>
    //           <Avatar className="h-8 w-8">
    //             <AvatarImage src={guild.iconUrl} alt={guild.name} />
    //             <AvatarFallback>{guild.name[0]}</AvatarFallback>
    //           </Avatar>
    //         </div>
    //       </div>
    //     </header>
    //     <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
    //       <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
    //         {/* Timezone */}
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Timezone</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="flex flex-col gap-2">
    //               <span className="text-muted-foreground">Change the default timezone of MEE6 in your server.</span>
    //               <select className="bg-muted rounded px-3 py-2 w-48">
    //                 <option>UTC</option>
    //                 <option>PST</option>
    //                 <option>EST</option>
    //                 <option>CET</option>
    //               </select>
    //             </div>
    //           </CardContent>
    //         </Card>
    //         {/* Default Embed Color */}
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Default embed color <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded">New!</span></CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="flex items-center gap-4">
    //               <div className="w-12 h-12 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
    //                 <span className="text-white font-bold">MEE6</span>
    //               </div>
    //               <div>
    //                 <div className="font-semibold">Example title of an embed</div>
    //                 <div className="text-muted-foreground">Example description of an embed</div>
    //               </div>
    //               <Button variant="ghost" className="ml-auto">Change</Button>
    //             </div>
    //           </CardContent>
    //         </Card>
    //         {/* Commands */}
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Commands</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="flex flex-col gap-2">
    //               <span className="text-muted-foreground">You can change the prefix used to trigger the bot.</span>
    //               <input className="bg-muted rounded px-3 py-2 w-24" defaultValue="!" />
    //               <div className="flex gap-2 mt-2 flex-wrap">
    //                 <span className="bg-muted px-2 py-1 rounded text-xs">!rank @user</span>
    //                 <span className="bg-muted px-2 py-1 rounded text-xs">!help</span>
    //                 <span className="bg-muted px-2 py-1 rounded text-xs">!give-xp @user 1337</span>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //         {/* Slash Commands */}
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Slash Commands</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="flex items-center justify-between">
    //               <span>Enable Slash Commands</span>
    //               <Switch defaultChecked />
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </div>
    //     </div>
    //   </SidebarInset>
    // </SidebarProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
