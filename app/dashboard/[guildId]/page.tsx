"use client";

import _ from "lodash";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Plus,
  Save,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import moment from "moment-timezone";
import { motion, useAnimationControls } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { BsCheckLg, BsCopy, BsQuestionCircle } from "react-icons/bs";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEnd,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationStart,
} from "@/components/ui/pagination";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { trpc } from "@/lib/trpc";

export default function Page() {
  const [copyFocus, setCopyFocus] = useState(false);
  const controls = useAnimationControls();

  const params = useParams();
  const guildId = params.guildId as string;

  const { guild, counts, prefix, setPrefix, serverVars, isLoading, isError } =
    useDashboardData(guildId);

  const [value, setValue] = useState("");

  // Configuration panel state
  const [expandedSections, setExpandedSections] = useState({
    welcome: false,
    goodbye: false,
    antinuke: false,
    aliases: false,
    ranking: false,
    autoresponders: false,
  });

  const [localConfig, setLocalConfig] = useState({
    welcome_config: {},
    goodbye_config: {},
    antinuke_config: {},
    aliases: {},
    rank_config: {},
    autoresponders_config: {},
  });

  const [newItems, setNewItems] = useState({
    alias: { key: "", value: "" },
    welcome: { channel: "", text: "" },
    goodbye: { channel: "", text: "" },
  });

  const [aliasPage, setAliasPage] = useState(1);
  const chunkedAliases = _.chunk(Object.entries(localConfig.aliases), 5);
  const totalPages = chunkedAliases.length;
  const currentChunk = chunkedAliases[aliasPage - 1] || [];

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setAliasPage(page);
    }
  };

  const goToFirst = () => setAliasPage(1);
  const goToLast = () => setAliasPage(totalPages);
  const goToPrevious = () => goToPage(aliasPage - 1);
  const goToNext = () => goToPage(aliasPage + 1);

  useEffect(() => {
    if (prefix) setValue(prefix);
  }, [prefix]);

  // Parse server data when it loads
  useEffect(() => {
    if (serverVars) {
      setLocalConfig({
        welcome_config: serverVars.welcome_config ? JSON.parse(serverVars.welcome_config) : {},
        goodbye_config: serverVars.goodbye_config ? JSON.parse(serverVars.goodbye_config) : {},
        antinuke_config: serverVars.antinuke_config ? JSON.parse(serverVars.antinuke_config) : {},
        aliases: serverVars.aliases ? JSON.parse(serverVars.aliases) : {},
        rank_config: serverVars.rank_config ? JSON.parse(serverVars.rank_config) : {},
        autoresponders_config: serverVars.autoresponders_config
          ? JSON.parse(serverVars.autoresponders_config)
          : {},
      });
    }
  }, [serverVars]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value && value !== prefix) {
      setPrefix.mutate({ guildId, prefix: value });
    }
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const ConfigEntrySchema = z.object({
    channel: z.number().int().positive(),
    text: z.string().min(1),
  });

  const WelcomeConfigSchema = z.record(
    z.string().regex(/^\d+$/, "Key must be a numeric string"),
    ConfigEntrySchema,
  );

  const rawWelcomeConfig = JSON.parse(serverVars?.welcome_config || "{}");
  console.log(rawWelcomeConfig);
  const parsedWelcomeConfig = WelcomeConfigSchema.safeParse(rawWelcomeConfig);
  console.log(parsedWelcomeConfig);

  // Configuration panel functions
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateNestedConfig = (configType, key, value) => {
    setLocalConfig((prev) => ({
      ...prev,
      [configType]: {
        ...prev[configType],
        [key]: value,
      },
    }));
  };

  const removeFromConfig = (configType, key) => {
    setLocalConfig((prev) => {
      const newConfig = { ...prev[configType] };
      delete newConfig[key];
      return {
        ...prev,
        [configType]: newConfig,
      };
    });
  };

  const addAlias = () => {
    if (newItems.alias.key && newItems.alias.value) {
      updateNestedConfig("aliases", newItems.alias.key, newItems.alias.value);
      setNewItems((prev) => ({ ...prev, alias: { key: "", value: "" } }));
    }
  };

  const addWelcomeMessage = () => {
    if (newItems.welcome.channel && newItems.welcome.text) {
      const channelId = newItems.welcome.channel;
      updateNestedConfig("welcome_config", channelId, {
        channel: parseInt(channelId),
        text: newItems.welcome.text,
      });
      setNewItems((prev) => ({ ...prev, welcome: { channel: "", text: "" } }));
    }
  };

  const addGoodbyeMessage = () => {
    if (newItems.goodbye.channel && newItems.goodbye.text) {
      const channelId = newItems.goodbye.channel;
      updateNestedConfig("goodbye_config", channelId, {
        channel: parseInt(channelId),
        text: newItems.goodbye.text,
      });
      setNewItems((prev) => ({ ...prev, goodbye: { channel: "", text: "" } }));
    }
  };

  const saveGuildConfigMutation = trpc.brew.setServerVars.useMutation();

  const saveConfiguration = async () => {
    const configToSave = {
      welcome_config: JSON.stringify(localConfig.welcome_config),
      goodbye_config: JSON.stringify(localConfig.goodbye_config),
      antinuke_config: JSON.stringify(localConfig.antinuke_config),
      aliases: JSON.stringify(localConfig.aliases),
      rank_config: JSON.stringify(localConfig.rank_config),
      autoresponders_config: JSON.stringify(localConfig.autoresponders_config),
    };

    console.log("Config to save:", configToSave);
    // Implement your save logic here using your existing mutation patterns

    const asd = await saveGuildConfigMutation.mutateAsync({ guildId, config: configToSave });
    console.log("Save result:", asd);
  };

  const ConfigSection = ({ title, icon: Icon, sectionKey, children }) => (
    <div className="bg-secondary rounded-xl overflow-hidden">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-primary-foreground" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {expandedSections[sectionKey] ? (
          <ChevronDown className="w-5 h-5 text-secondary-foreground" />
        ) : (
          <ChevronRight className="w-5 h-5 text-secondary-foreground" />
        )}
      </button>

      {expandedSections[sectionKey] && (
        <div className="p-6 border-t border-secondary-foreground/10">{children}</div>
      )}
    </div>
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading guild data</div>;

  return (
    <div className="flex flex-1 flex-col gap-4 p-8 md:px-24 pt-0">
      <div className="grid auto-rows-min gap-4">
        <h1 className="text-xl font-bold">Server Info</h1>
        <div className="bg-secondary rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-secondary-foreground">
            <div>
              <h2 className="uppercase font-semibold text-xs ">Members</h2>
              <p className="font-bold text-2xl text-white">{guild?.memberCount}</p>
            </div>
            {counts &&
              Object.entries(counts).map(([key, value]) => (
                <div key={key}>
                  <h2 className="uppercase font-semibold text-xs ">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h2>
                  <p className="font-bold text-2xl text-white">{value}</p>
                </div>
              ))}

            <div>
              <button
                className="flex items-center gap-2 "
                onClick={() => {
                  navigator.clipboard.writeText(guildId);
                  setCopyFocus(true);
                  controls.start({
                    scale: 1.36,
                    transition: { duration: 0.2 },
                  });
                  setTimeout(() => {
                    setCopyFocus(false);
                    controls.start({
                      scale: 1,
                      transition: { duration: 0.2 },
                    });
                  }, 1000);
                }}
              >
                <motion.div initial={{ scale: 1 }} animate={controls}>
                  {copyFocus ? <BsCheckLg className="size-4" /> : <BsCopy className="size-4" />}
                </motion.div>
                Copy Server ID
              </button>
              <Link href="https://docs.brewbot.xyz" className="flex items-center gap-2">
                <BsQuestionCircle className="size-4" />
                <span>Read the Docs</span>
              </Link>
            </div>
          </div>
        </div>

        <h1 className="text-xl font-bold">Bot Settings</h1>
        <div className="bg-secondary rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-secondary-foreground">
            <div>
              <form className="space-y-2" onSubmit={handleSubmit}>
                <h2 className="uppercase font-semibold text-xs">Command Prefix</h2>
                <Input
                  size="sm"
                  placeholder="Enter bot prefix"
                  className="text-white"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    <span className="font-bold text-white">{value}</span>ban @user
                  </Badge>
                  <Badge variant="secondary">
                    <span className="font-bold text-white">{value}</span>help
                  </Badge>
                  <Badge variant="secondary">
                    <span className="font-bold text-white">{value}</span>rank @user
                  </Badge>
                </div>
              </form>
            </div>
            <div>
              <form className="space-y-2" onSubmit={handleSubmit}>
                <h2 className="uppercase font-semibold text-xs">Timezone</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full text-white bg-secondary hover:bg-secondary/80">
                      {moment.tz.guess() || "Select Timezone"}
                      <ChevronDown className="ml-auto" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    {moment.tz.names().map((tz) => (
                      <DropdownMenuItem key={tz}>{tz}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Badge className="gap-1" variant="secondary">
                  The current time is:
                  <span className="font-bold text-white">
                    {moment().tz("America/New_York").format("h:mm A")}
                  </span>
                </Badge>
              </form>
            </div>
            <div>
              <form className="space-y-2" onSubmit={handleSubmit}>
                <h2 className="uppercase font-semibold text-xs">Command Prefix</h2>
                <Input
                  size="sm"
                  placeholder="Enter bot prefix"
                  className="text-white"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>

        {/* New Configuration Sections */}
        <h1 className="text-xl font-bold">Advanced Configuration</h1>

        <div className="space-y-4">
          {/* Welcome Messages */}
          <ConfigSection title="Welcome Messages" icon={Users} sectionKey="welcome">
            <div className="space-y-4">
              {Object.entries(localConfig.welcome_config).map(([channelId, settings]) => (
                <div key={channelId} className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <label className="text-sm font-medium text-secondary-foreground">
                        Channel ID
                      </label>
                      <p className="text-white font-mono">{channelId}</p>
                    </div>
                    <button
                      onClick={() => removeFromConfig("welcome_config", channelId)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-secondary-foreground block mb-2">
                      Welcome Message
                    </label>
                    <textarea
                      value={settings.text || ""}
                      onChange={(e) =>
                        updateNestedConfig("welcome_config", channelId, {
                          ...settings,
                          text: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-secondary text-white rounded border border-secondary-foreground/20 focus:border-primary focus:outline-none resize-none"
                      rows={2}
                      placeholder="Enter welcome message..."
                    />
                    <p className="text-xs text-secondary-foreground mt-1">
                      Variables: {"{user.mention}"}, {"{user.name}"}, {"{user}"}
                    </p>
                  </div>
                </div>
              ))}

              <div className="bg-secondary/50 p-4 rounded-lg border-2 border-dashed border-secondary-foreground/20">
                <h4 className="text-white font-medium mb-3">Add New Welcome Message</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Channel ID"
                    value={newItems.welcome.channel}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        welcome: { ...prev.welcome, channel: e.target.value },
                      }))
                    }
                    className="text-white"
                    size="sm"
                  />
                  <Input
                    placeholder="Welcome message"
                    value={newItems.welcome.text}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        welcome: { ...prev.welcome, text: e.target.value },
                      }))
                    }
                    className="text-white"
                    size="sm"
                  />
                </div>
                <button
                  onClick={addWelcomeMessage}
                  className="mt-3 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Welcome Message
                </button>
              </div>
            </div>
          </ConfigSection>

          {/* Goodbye Messages */}
          <ConfigSection title="Goodbye Messages" icon={MessageSquare} sectionKey="goodbye">
            <div className="space-y-4">
              {Object.entries(localConfig.goodbye_config).map(([channelId, settings]) => (
                <div key={channelId} className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <label className="text-sm font-medium text-secondary-foreground">
                        Channel ID
                      </label>
                      <p className="text-white font-mono">{channelId}</p>
                    </div>
                    <button
                      onClick={() => removeFromConfig("goodbye_config", channelId)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-secondary-foreground block mb-2">
                      Goodbye Message
                    </label>
                    <textarea
                      value={settings.text || ""}
                      onChange={(e) =>
                        updateNestedConfig("goodbye_config", channelId, {
                          ...settings,
                          text: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-secondary text-white rounded border border-secondary-foreground/20 focus:border-primary focus:outline-none resize-none"
                      rows={2}
                      placeholder="Enter goodbye message..."
                    />
                  </div>
                </div>
              ))}

              <div className="bg-secondary/50 p-4 rounded-lg border-2 border-dashed border-secondary-foreground/20">
                <h4 className="text-white font-medium mb-3">Add New Goodbye Message</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Channel ID"
                    value={newItems.goodbye.channel}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        goodbye: { ...prev.goodbye, channel: e.target.value },
                      }))
                    }
                    className="text-white"
                    size="sm"
                  />
                  <Input
                    placeholder="Goodbye message"
                    value={newItems.goodbye.text}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        goodbye: { ...prev.goodbye, text: e.target.value },
                      }))
                    }
                    className="text-white"
                    size="sm"
                  />
                </div>
                <button
                  onClick={addGoodbyeMessage}
                  className="mt-3 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Goodbye Message
                </button>
              </div>
            </div>
          </ConfigSection>

          {/* Command Aliases */}
          <ConfigSection
            title={`Command Aliases (${Object.keys(localConfig.aliases).length})`}
            icon={Settings}
            sectionKey="aliases"
          >
            <div className="space-y-4">
              <div className="grid gap-3">
                {currentChunk.map(([alias, command]) => (
                  <div
                    key={alias}
                    className="flex items-center gap-4 bg-secondary/50 p-3 rounded-lg"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-secondary-foreground block mb-1">
                          Alias
                        </label>
                        <Input
                          value={alias}
                          onChange={(e) => {
                            if (e.target.value !== alias) {
                              const newAliases = { ...localConfig.aliases };
                              delete newAliases[alias];
                              newAliases[e.target.value] = command;
                              setLocalConfig((prev) => ({ ...prev, aliases: newAliases }));
                            }
                          }}
                          className="text-white"
                          size="sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-secondary-foreground block mb-1">
                          Command
                        </label>
                        <Input
                          value={command}
                          onChange={(e) => updateNestedConfig("aliases", alias, e.target.value)}
                          className="text-white"
                          size="sm"
                        />
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => {
                        removeFromConfig("aliases", alias);
                        // Handle page adjustment if current page becomes empty
                        const newTotal = Math.ceil(
                          (Object.keys(localConfig.aliases).length - 1) / 5,
                        );
                        if (aliasPage > newTotal && newTotal > 0) {
                          setAliasPage(newTotal);
                        }
                      }}
                      className="mt-6 text-red-400 hover:text-red-300"
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>
                ))}

                <hr className="border-secondary-foreground/10" />

                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationStart
                          href="#"
                          onClick={goToFirst}
                          className={
                            aliasPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={goToPrevious}
                          className={
                            aliasPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" className="cursor-default">
                          {aliasPage}/{totalPages}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={goToNext}
                          className={
                            aliasPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEnd
                          href="#"
                          onClick={goToLast}
                          className={
                            aliasPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}

                {/* Show message when no aliases exist */}
                {Object.keys(localConfig.aliases).length === 0 && (
                  <div className="text-center text-secondary-foreground py-8">
                    No aliases configured
                  </div>
                )}
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg border-2 border-dashed border-secondary-foreground/20">
                <h4 className="text-white font-medium mb-3">Add New Alias</h4>
                <div className="flex gap-4">
                  <Input
                    placeholder="Alias (e.g., 'c')"
                    value={newItems.alias.key}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        alias: { ...prev.alias, key: e.target.value },
                      }))
                    }
                    className="text-white"
                    size="sm"
                  />
                  <Input
                    placeholder="Command (e.g., 'craft')"
                    value={newItems.alias.value}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        alias: { ...prev.alias, value: e.target.value },
                      }))
                    }
                    className="text-white"
                    size="sm"
                  />
                  <Button onClick={addAlias}>
                    <Plus className="w-6 h-6" />
                    Add Alias
                  </Button>
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* Anti-Nuke Settings */}
          <ConfigSection title="Anti-Nuke Protection" icon={Shield} sectionKey="antinuke">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Anti-Nuke Status</h4>
                  <p className="text-secondary-foreground text-sm">
                    Current status: {serverVars?.antinuke_status || "disabled"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serverVars?.antinuke_status === "enabled"}
                    onChange={(e) => {
                      console.log("Toggle antinuke status:", e.target.checked);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary-foreground/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {localConfig.antinuke_config &&
                Object.keys(localConfig.antinuke_config).length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(localConfig.antinuke_config)
                      .filter(([key, settings]) => typeof settings === "object" && settings.status)
                      .map(([key, settings]) => (
                        <div key={key} className="bg-secondary/50 p-4 rounded-lg">
                          <h5 className="text-white font-medium capitalize mb-3">
                            {key.replace("_", " ")} Protection
                          </h5>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-secondary-foreground text-sm">Enabled</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={settings.status === "enabled"}
                                  onChange={(e) =>
                                    updateNestedConfig("antinuke_config", key, {
                                      ...settings,
                                      status: e.target.checked ? "enabled" : "disabled",
                                    })
                                  }
                                  className="sr-only peer"
                                />
                                <div className="w-8 h-4 bg-secondary-foreground/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>

                            {settings.threshold !== undefined && (
                              <div>
                                <label className="text-secondary-foreground text-sm block mb-1">
                                  Threshold
                                </label>
                                <Input
                                  type="number"
                                  value={settings.threshold}
                                  onChange={(e) =>
                                    updateNestedConfig("antinuke_config", key, {
                                      ...settings,
                                      threshold: parseInt(e.target.value),
                                    })
                                  }
                                  className="text-white"
                                  size="sm"
                                  min="1"
                                  max="10"
                                />
                              </div>
                            )}

                            {settings.punishment && (
                              <div>
                                <label className="text-secondary-foreground text-sm block mb-1">
                                  Punishment
                                </label>
                                <select
                                  value={settings.punishment}
                                  onChange={(e) =>
                                    updateNestedConfig("antinuke_config", key, {
                                      ...settings,
                                      punishment: e.target.value,
                                    })
                                  }
                                  className="w-full p-2 bg-secondary text-white rounded border border-secondary-foreground/20 focus:border-primary focus:outline-none text-sm"
                                >
                                  <option value="kick">Kick</option>
                                  <option value="ban">Ban</option>
                                  <option value="strip">Strip Roles</option>
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
            </div>
          </ConfigSection>

          {/* Ranking System */}
          <ConfigSection title="Ranking System" icon={Bell} sectionKey="ranking">
            <div className="space-y-4">
              {localConfig.rank_config && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Ranking Enabled</h4>
                      <p className="text-secondary-foreground text-sm">
                        Enable or disable the ranking system
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localConfig.rank_config.enabled || false}
                        onChange={(e) =>
                          updateNestedConfig("rank_config", "enabled", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-secondary-foreground/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-secondary-foreground block mb-2">
                        XP Rate
                      </label>
                      <Input
                        type="number"
                        value={localConfig.rank_config.rate || 1}
                        onChange={(e) =>
                          updateNestedConfig("rank_config", "rate", parseInt(e.target.value))
                        }
                        className="text-white"
                        size="sm"
                        min="1"
                        max="10"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-secondary-foreground block mb-2">
                        Rank Channel
                      </label>
                      <Input
                        type="text"
                        value={localConfig.rank_config.channel || ""}
                        onChange={(e) =>
                          updateNestedConfig(
                            "rank_config",
                            "channel",
                            parseInt(e.target.value) || "",
                          )
                        }
                        className="text-white"
                        size="sm"
                        placeholder="Channel ID"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-secondary-foreground block mb-2">
                      Rank Up Message
                    </label>
                    <textarea
                      value={localConfig.rank_config.message || ""}
                      onChange={(e) => updateNestedConfig("rank_config", "message", e.target.value)}
                      className="w-full p-3 bg-secondary text-white rounded border border-secondary-foreground/20 focus:border-primary focus:outline-none resize-none"
                      rows={2}
                      placeholder="Message when user ranks up..."
                    />
                  </div>
                </>
              )}
            </div>
          </ConfigSection>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={saveConfiguration}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
          >
            <Save className="w-5 h-5" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
