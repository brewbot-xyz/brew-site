"use client";

import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsChevronDown, BsCircle, BsSearch } from "react-icons/bs";

import { Badge } from "@/app/components/badge";
import { Button } from "@/app/components/button";
import { Dialog, DialogTrigger } from "@/app/components/dialog";
import DiscordAppsIcon from "@/app/components/icons/discord-apps";
import Navbar from "@/app/components/navbar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/tabs";
import { useScrolled } from "@/hooks/use-scrolled";
import type { Command } from "@/lib/resources";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import CommandCard from "../components/commands/command-card";
import CommandDialog from "../components/commands/command-dialog";
import CommandSearch, {
  categoryMap,
} from "../components/commands/command-search";
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover";
import Loading from "../loading";

export default function Commands() {
  const scrolled = useScrolled();
  const [selected, setSelected] = useState<Command | null>(null);
  const [tabValue, setTabValue] = useState(Object.keys(categoryMap)[0]);
  const [open, setOpen] = useState(false);

  const {
    isLoading,
    data: categories,
    error,
  } = trpc.brew.commandCategories.useQuery();

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space" && e.ctrlKey) {
      const event = new CustomEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      document.querySelector("#searchTrigger")?.dispatchEvent(event);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const renderTabs = useMemo(
    () =>
      categories?.map((c) => (
        <TabsTrigger
          className="flex justify-between"
          key={c.name}
          value={c.name}
        >
          <span className="flex items-center gap-2">
            {_.get(categoryMap, c.name, <BsCircle />)}
            {_.startCase(c.name.toLowerCase().replace(/_+/, " "))}
          </span>
          <Badge variant="secondary">{c.commands.length}</Badge>
        </TabsTrigger>
      )),
    [categories],
  );

  if (isLoading || !categories) {
    return <Loading />;
  }
  if (error) {
    throw error;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center antialiased">
      <Dialog>
        <Navbar>
          <div className="flex w-full max-w-full justify-between px-4 md:px-10">
            <div className="flex items-center font-bold text-3xl">
              <DiscordAppsIcon className="mr-2" />
              <span
                className={cn(
                  "transition-all",
                  scrolled ? "opacity-0" : "flex md:hidden xl:flex",
                )}
              >
                Commands
              </span>
            </div>
            <DialogTrigger asChild id="searchTrigger">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Button
                  aria-label="Search Commands"
                  className="pointer-events-auto"
                  size="icon"
                  variant="secondary"
                >
                  <BsSearch />
                </Button>
              </div>
            </DialogTrigger>
          </div>
        </Navbar>

        <div className="fixed inset-x-0 top-0 z-50 flex w-full justify-between px-8 py-4 backdrop-blur-md md:hidden md:px-10">
          <span className="flex items-center font-bold text-3xl">Commands</span>
          <DialogTrigger asChild id="searchTrigger">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Button size="icon" variant="secondary">
                <BsSearch />
              </Button>
            </div>
          </DialogTrigger>
        </div>

        <CommandSearch categories={categories} setSelected={setSelected} />
      </Dialog>

      <Dialog
        onOpenChange={(open) => !open && setSelected(null)}
        open={!!selected}
      >
        <Tabs
          className="mt-20 mb-32 grid w-full grid-cols-1 justify-center gap-4 px-8 md:my-32 2xl:grid-cols-[4%_16%_60%_20%]"
          defaultValue={Object.keys(categoryMap)[0]}
          onValueChange={setTabValue}
          value={tabValue}
        >
          <div />
          <div className="hidden 2xl:block">
            <TabsList className="w-full" variant="greyscale">
              {renderTabs}
            </TabsList>
          </div>

          <div className="fixed inset-x-0 bottom-16 z-50 col-span-full mt-8 flex w-full items-center justify-center space-x-3 px-3 2xl:hidden">
            <Popover onOpenChange={setOpen} open={open}>
              <PopoverTrigger asChild>
                <Button
                  aria-expanded={open}
                  className="flex w-full justify-between md:max-w-sm"
                  role="combobox"
                  size="lg"
                  variant="secondary"
                >
                  <span className="flex items-center gap-2">
                    {_.get(categoryMap, tabValue, <BsCircle />)}
                    {_.startCase(tabValue.toLowerCase().replace(/_+/, " "))}
                  </span>
                  <span className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {categories.find((c) => c.name === tabValue)?.commands
                        .length || 0}
                    </Badge>
                    <BsChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full bg-transparent p-0 text-sm shadow-none outline-none md:max-w-sm">
                <TabsList
                  className="w-full"
                  onClick={() => setOpen(false)}
                  variant="greyscale"
                >
                  {categories.map((c) => (
                    <TabsTrigger
                      className="flex justify-between space-x-10"
                      key={c.name}
                      onClick={() => setTabValue(c.name)}
                      value={c.name}
                    >
                      <span className="flex items-center gap-2">
                        {_.get(categoryMap, c.name, <BsCircle />)}
                        {_.startCase(c.name.toLowerCase().replace(/_+/, " "))}
                      </span>
                      <Badge variant="secondary">{c.commands.length}</Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </PopoverContent>
            </Popover>
          </div>

          {categories.map((category) => (
            <TabsContent
              className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
              key={category.name}
              value={category.name}
            >
              {category.commands.map((cmd) => (
                <CommandCard cmd={cmd} key={cmd.name} onSelect={setSelected} />
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <CommandDialog selected={selected} />
      </Dialog>
    </div>
  );
}
