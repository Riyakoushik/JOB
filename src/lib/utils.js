import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Heuristic-based English detection
 * Checks for common English stop words and high frequency characters.
 */
export function isEnglish(text) {
  if (!text || text.trim() === '') return true; // Allow empty text
  const lower = text.toLowerCase();
  const commonEn = [' the ', ' and ', ' of ', ' to ', ' in ', ' is ', ' with ', ' for ', ' you ', ' on '];
  const hasCommon = commonEn.some(word => lower.includes(word));
  const nonAscii = /[^\x00-\x7F]/.test(text);
  // If it has common English words and mostly ASCII, it's likely English.
  // If it has NO common English words but is mostly ASCII, we give it a chance but flag it.
  return hasCommon || !nonAscii;
}
