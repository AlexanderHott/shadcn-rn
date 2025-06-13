import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
) {
  console.log("outer", { originalEventHandler, ourEventHandler });
  return function handleEvent(event: E) {
    console.log("inner", { originalEventHandler, ourEventHandler });
    originalEventHandler?.(event);

    // if (!(event).defaultPrevented) {
    return ourEventHandler?.(event);
    // }
  };
}
