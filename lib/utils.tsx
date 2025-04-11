import { clsx, type ClassValue } from "clsx";
import Image from "next/image";
import Markdown from "react-markdown";
import { twMerge } from "tailwind-merge";

import React, { JSX } from "react";
import { EMOJI_PATTERN } from "./discord";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function parseInfo(text = "N/A", size = 20) {
  if (!text) return [<span key="empty">N/A</span>];

  const parts = text.split(EMOJI_PATTERN);

  const elements: JSX.Element[] = [];
  let content: JSX.Element[] = [];

  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      const extension = part.startsWith("<a:") ? "gif" : "png";
      const emojiId = part.match(/\d+/g)?.pop();
      content.push(
        <Image
          className={cn(`size-[${size}px]`)}
          key={index}
          src={`https://cdn.discordapp.com/emojis/${emojiId}.${extension}?size=128`}
          alt={emojiId || "emoji"}
          width={size}
          height={size}
          draggable={false}
          priority
        />
      );
    } else {
      if (part) {
        const subparts = part.split("\n");
        subparts.forEach((subpart, subindex) => {
          content.push(
            <Markdown key={`${index}-${subindex}`}>{subpart}</Markdown>
          );
          if (subindex < subparts.length - 1) {
            elements.push(
              <span
                key={`${index}-${subindex}-newline`}
                className="flex space-x-1.5 items-start"
              >
                {content}
              </span>
            );
            content = [];
          }
        });
      }
    }
  });

  if (content.length > 0) {
    elements.push(
      <span key="content" className="flex space-x-1.5 items-center">
        {content}
      </span>
    );
  }

  return elements;
}
