import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://brewbot.xyz/",
      lastModified: new Date("2025-05-25T08:35:34.000Z"),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://brewbot.xyz/commands",
      lastModified: new Date("2025-05-25T08:35:34.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://brewbot.xyz/status",
      lastModified: new Date("2025-05-25T08:35:34.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://brewbot.xyz/faq",
      lastModified: new Date("2025-05-25T08:35:34.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
