import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function geist(bool: boolean) {
  let x = "Regular";
  if (bool) {
    x = "Bold";
  }
  return `font-[Geist-${x}]`;
}
