import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractImageFromContent(content: string): string | null {
  if (!content) return null;
  // Match Markdown image: ![...](url)
  const mdMatch = content.match(/!\[.*?\]\((.*?)\)/);
  if (mdMatch) return mdMatch[1];

  // Match HTML image: <img src="url" ... />
  const htmlMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
  if (htmlMatch) return htmlMatch[1];

  return null;
}
