"use client";

import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsChevronDown, BsCircle, BsSearch } from "react-icons/bs";

import { Badge } from "@/app/components/badge";
import { Button } from "@/app/components/button";
import { Dialog, DialogTrigger } from "@/app/components/dialog";
import DiscordAppsIcon from "@/app/components/icons/discord-apps";
import Navbar from "@/app/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/tabs";
import { Command } from "@/lib/resources";
import { trpc } from "@/lib/trpc";

import { Popover, PopoverContent, PopoverTrigger } from "../components/popover";
import Loading from "../loading";
import CommandCard from "./command-card";
import CommandDialog from "./command-dialog";
import CommandSearch, { categoryMap } from "./command-search";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

export default function Commands() {
  const scrolled = useScrolled();
  const [selected, setSelected] = useState<Command | null>(null);
  const [tabValue, setTabValue] = useState(Object.keys(categoryMap)[0]);
  const [open, setOpen] = useState(false);

  const { isLoading, data: categories, error } = trpc.brew.commandCategories.useQuery();

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
        <TabsTrigger key={c.name} value={c.name} className="flex justify-between">
          <span className="flex items-center gap-2">
            {_.get(categoryMap, c.name, <BsCircle />)}
            {_.startCase(c.name.toLowerCase().replace(/_+/, " "))}
          </span>
          <Badge variant="secondary">{c.commands.length}</Badge>
        </TabsTrigger>
      )),
    [categories],
  );

  if (isLoading || !categories) return <Loading />;
  if (error) throw error;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center antialiased">
      <Dialog>
        <Navbar>
          <div className="flex w-full max-w-full justify-between px-4 md:px-10">
            <div className="flex items-center text-3xl font-bold">
              <DiscordAppsIcon className="mr-2" />
              <span
                className={cn("transition-all", scrolled ? "opacity-0" : "flex md:hidden xl:flex")}
              >
                Commands
              </span>
            </div>
            <DialogTrigger asChild id="searchTrigger">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Button
                  className="pointer-events-auto"
                  variant="secondary"
                  size="icon"
                  aria-label="Search Commands"
                >
                  <BsSearch />
                </Button>
              </div>
            </DialogTrigger>
          </div>
        </Navbar>

        <div className="md:hidden fixed inset-x-0 top-0 z-50 flex w-full justify-between px-8 py-4 md:px-10 backdrop-blur-md">
          <span className="flex items-center text-3xl font-bold">Commands</span>
          <DialogTrigger asChild id="searchTrigger">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Button variant="secondary" size="icon">
                <BsSearch />
              </Button>
            </div>
          </DialogTrigger>
        </div>

        <CommandSearch categories={categories} setSelected={setSelected} />
      </Dialog>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          defaultValue={Object.keys(categoryMap)[0]}
          className="mt-20 mb-32 md:my-32 grid w-full grid-cols-1 justify-center gap-4 px-8 2xl:grid-cols-[4%_16%_60%_20%]"
        >
          <div />
          <div className="hidden 2xl:block">
            <TabsList variant="greyscale" className="w-full">
              {renderTabs}
            </TabsList>
          </div>

          <div className="mt-8 space-x-3 col-span-full flex w-full px-3 fixed inset-x-0 bottom-16 z-50 justify-center items-center 2xl:hidden">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  size="lg"
                  role="combobox"
                  aria-expanded={open}
                  className="flex w-full md:max-w-sm justify-between"
                >
                  <span className="flex items-center gap-2">
                    {_.get(categoryMap, tabValue, <BsCircle />)}
                    {_.startCase(tabValue.toLowerCase().replace(/_+/, " "))}
                  </span>
                  <span className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {categories.find((c) => c.name === tabValue)?.commands.length || 0}
                    </Badge>
                    <BsChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-full md:max-w-sm text-sm bg-transparent outline-none shadow-none">
                <TabsList variant="greyscale" className="w-full" onClick={() => setOpen(false)}>
                  {categories.map((c) => (
                    <TabsTrigger
                      key={c.name}
                      value={c.name}
                      onClick={() => setTabValue(c.name)}
                      className="flex justify-between space-x-10"
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
              key={category.name}
              value={category.name}
              className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {category.commands.map((cmd) => (
                <CommandCard key={cmd.name} cmd={cmd} onSelect={setSelected} />
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <CommandDialog selected={selected} />
      </Dialog>
    </div>
  );
}
