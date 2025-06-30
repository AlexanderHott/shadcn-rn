import type { ClassValue } from "clsx";
import type { LucideIcon } from "lucide-react-native";
import clsx from "clsx";
import {
  cssInterop,
  useColorScheme as useNativewindColorScheme,
} from "nativewind";
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

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();
  return {
    colorScheme: colorScheme ?? "dark",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
