import type { UUID } from "node:crypto";

export interface Shard {
  is_ready: boolean;
  last_updated: number;
  latency: number[];
  server_count: number;
  shard_id: number;
  uptime: number;
  user_count: number;
}

export interface Command {
  aliases: string[];
  description: string;
  info: string | "N/A";
  key: UUID;
  name: string;
  params: string[];
  syntax: string;
}

export interface Category {
  commands: Command[];
  name: keyof typeof CategoryName;
}

export interface User {
  accent_color?: number;
  avatar?: string;
  avatar_decoration_data?: AvatarDecorationData;
  banner?: string;
  bot?: boolean;
  discriminator: string;
  email?: string;
  flags?: number;
  global_name?: string;
  id: string;
  locale?: string;
  mfa_enabled?: boolean;
  premium_type?: number;
  public_flags?: number;
  system?: boolean;
  username: string;
  verified?: boolean;
}

export interface AvatarDecorationData {
  asset: string;
  sku_id: string;
}

export enum CategoryName {
  UTILITIES = 0,
  MODERATION = 1,
  ANTINUKE = 2,
  MINIGAME = 3,
  MUSIC = 4,
  MISCELLANEOUS = 5,
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
  features: string[];
  iconUrl: string;
  id: string;
  memberCount: number;
  name: string;
  owner: boolean;
  permissions: string;
}

export interface APIGuild {
  afk_channel_id?: string;
  afk_timeout: number;
  application_id?: string;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  banner?: string;
  default_message_notifications: number;
  description?: string;
  discovery_splash?: string;
  emojis: unknown[];
  explicit_content_filter: number;
  features: string[];
  icon?: string;
  icon_hash?: string;
  id: string;
  incidents_data?: unknown;
  max_members?: number;
  max_presences?: number | null;
  max_stage_video_channel_users?: number;
  max_video_channel_users?: number;
  mfa_level: number;
  name: string;
  nsfw_level: number;
  owner?: boolean;
  owner_id: string;
  permissions?: string;
  preferred_locale: string;
  premium_progress_bar_enabled: boolean;
  premium_subscription_count?: number;
  premium_tier: number;
  public_updates_channel_id?: string;
  region?: string; // Deprecated
  roles: unknown[];
  rules_channel_id?: string;
  safety_alerts_channel_id?: string;
  splash?: string;
  stickers?: unknown[];
  system_channel_flags: number;
  system_channel_id?: string;
  vanity_url_code?: string;
  verification_level: number;
  welcome_screen?: unknown;
  widget_channel_id?: string;
  widget_enabled?: boolean;
}

export interface DemoUser {
  id: string;
  name: string;
  avatarUrl: string;
}
