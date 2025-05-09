import { UUID } from "node:crypto";

export interface Shard {
  shard_id: number;
  is_ready: boolean;
  server_count: number;
  user_count: number;
  uptime: number;
  latency: number[];
  last_updated: number;
}

export interface Command {
  key: UUID;
  name: string;
  description: string;
  aliases: string[];
  params: string[];
  info: string | "N/A";
  syntax: string;
}

export interface Category {
  name: keyof typeof CategoryName;
  commands: Command[];
}

export interface User {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  verified?: boolean;
  email?: string;
  flags?: number;
  banner?: string;
  accent_color?: number;
  locale?: string;
  premium_type?: number;
  public_flags?: number;
  avatar_decoration_data?: AvatarDecorationData;
}

export interface AvatarDecorationData {
  sku_id: string;
  asset: string;
}

export enum CategoryName {
  UTILITIES,
  MODERATION,
  ANTINUKE,
  MINIGAME,
  MUSIC,
  MISCELLANEOUS,
}

export enum Material {
  WHEAT = "wheat",
  WOOD = "wood",
  APPLE = "apple",
  GRAPES = "grapes",
  STRAWBERRY = "strawberry",
  BANANA = "banana",
  ROCK = "rock",
  GLASS = "glass",
  MILK = "milk",
  PLANT_FIBER = "plant fiber",
}

export interface Guild {
  id: string;
  name: string;
  iconUrl: string;
  owner: boolean;
  permissions: string;
  features: string[];
  memberCount: number;
}

export interface APIGuild {
  id: string;
  name: string;
  icon?: string;
  icon_hash?: string;
  splash?: string;
  discovery_splash?: string;
  owner?: boolean;
  owner_id: string;
  permissions?: string;
  region?: string; // Deprecated
  afk_channel_id?: string;
  afk_timeout: number;
  widget_enabled?: boolean;
  widget_channel_id?: string;
  verification_level: number;
  default_message_notifications: number;
  explicit_content_filter: number;
  roles: unknown[];
  emojis: unknown[];
  features: string[];
  mfa_level: number;
  application_id?: string;
  system_channel_id?: string;
  system_channel_flags: number;
  rules_channel_id?: string;
  max_presences?: number | null;
  max_members?: number;
  vanity_url_code?: string;
  description?: string;
  banner?: string;
  premium_tier: number;
  premium_subscription_count?: number;
  preferred_locale: string;
  public_updates_channel_id?: string;
  max_video_channel_users?: number;
  max_stage_video_channel_users?: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  welcome_screen?: unknown;
  nsfw_level: number;
  stickers?: unknown[];
  premium_progress_bar_enabled: boolean;
  safety_alerts_channel_id?: string;
  incidents_data?: unknown;
}
