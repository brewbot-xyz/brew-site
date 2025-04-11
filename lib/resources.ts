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
