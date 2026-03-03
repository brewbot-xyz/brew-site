import "server-only";
import { env } from "./env";

type DiscordErrorBody =
  | { message?: string; code?: number; errors?: unknown }
  | unknown;

export class DiscordClient {
  public readonly baseURL: string = "https://discord.com/api/v10";
  private authHeader: string;

  constructor(token: string) {
    this.authHeader = `Bot ${token}`;
  }

  private buildUrl(path: string) {
    return path.startsWith("http") ? path : `${this.baseURL}${path}`;
  }

  async request<T>(
    path: string,
    options: RequestInit & { timeoutMs?: number } = {},
  ): Promise<T> {
    const { timeoutMs = 10_000, ...init } = options;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(this.buildUrl(path), {
        ...init,
        signal: controller.signal,
        headers: {
          Authorization: this.authHeader,
          // only set JSON content-type when caller didn't provide it
          ...(init.body && !(init.headers as any)?.["Content-Type"]
            ? { "Content-Type": "application/json" }
            : null),
          ...(init.headers ?? {}),
        },
      });

      // Handle 204
      if (res.status === 204) return undefined as T;

      const contentType = res.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");

      const body: DiscordErrorBody = isJson
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        // Minimal, structured error (don’t dump huge bodies by default)
        const msg =
          typeof body === "string"
            ? body.slice(0, 500)
            : ((body as any)?.message ?? "Discord API request failed");

        const err = new Error(
          `[DiscordClient] ${res.status} ${res.statusText}: ${msg}`,
        );
        (err as any).status = res.status;
        (err as any).body = body;
        throw err;
      }

      return body as T;
    } finally {
      clearTimeout(timeout);
    }
  }

  async get<T>(url: string, options = {}) {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  async post<T>(url: string, options = {}) {
    return this.request<T>(url, { ...options, method: "POST" });
  }

  async put<T>(url: string, options = {}) {
    return this.request<T>(url, { ...options, method: "PUT" });
  }

  async delete<T>(url: string, options = {}) {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }
}

const discord = new DiscordClient(env.DISCORD_TOKEN);
export default discord;
