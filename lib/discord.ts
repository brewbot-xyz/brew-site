export const EMOJI_PATTERN = /(<a?:\w+:\d+>)/g;
export const OWNER_IDS = ["195932866134147072", "1201776746555527198"];

class DiscordClient {
  public readonly baseURL: string = "https://discord.com/api/v10";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const finalOptions = {
      baseURL: this.baseURL,
      ...options,
      headers: {
        Authorization: `Bot ${this.apiKey}`,
        ...options.headers,
      },
    };

    const response = await fetch(this.baseURL + url, finalOptions);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `[HTTP ERR] status: ${response.status}, body: ${errorBody}`
      );
    }
    return response.json();
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

const discord = new DiscordClient(process.env.DISCORD_TOKEN);
export default discord;
