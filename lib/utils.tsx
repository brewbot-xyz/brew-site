import { type ClassValue, clsx } from "clsx";
import Image from "next/image";
import type { JSX } from "react";
import Markdown from "react-markdown";
import { twMerge } from "tailwind-merge";
import { EMOJI_PATTERN } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function parseEmoji(text: string, size = 20, key?: string) {
  const ext = text.charAt(1) === "a" ? "gif" : "png";
  const emojiId = text.match(/\d+/g)?.pop();
  const emojiName = text.match(/:(\w+):/)?.[1] ?? "emoji";
  return (
    <Image
      alt={emojiName}
      className={cn(`size-[${size}px]`)}
      draggable={false}
      height={size}
      key={key ? `${key}:${emojiId}` : undefined}
      src={`https://cdn.discordapp.com/emojis/${emojiId}.${ext}?size=128`}
      unoptimized={ext === "gif"}
      width={size}
    />
  );
}

export function parseInfo(text = "N/A", size = 20) {
  if (!text) return [<span key="empty">N/A</span>];

  const parts = text.split(EMOJI_PATTERN);

  const elements: JSX.Element[] = [];
  let content: JSX.Element[] = [];

  let cursor = 0;

  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      const k = `emoji:${cursor}`;
      content.push(parseEmoji(part, size, k));
      cursor += part.length;
      return;
    }

    if (!part) return;

    const subparts = part.split("\n");
    subparts.forEach((subpart, subindex) => {
      const start = cursor;

      if (subpart) {
        content.push(<Markdown key={`md:${start}`}>{subpart}</Markdown>);
      }

      cursor += subpart.length;

      if (subindex < subparts.length - 1) {
        cursor += 1;

        elements.push(
          <span className="flex items-start space-x-1.5" key={`br:${start}`}>
            {content}
          </span>,
        );
        content = [];
      }
    });
  });

  if (content.length > 0) {
    elements.push(
      <span className="flex items-center space-x-1.5" key={`tail:${cursor}`}>
        {content}
      </span>,
    );
  }

  return elements;
}
