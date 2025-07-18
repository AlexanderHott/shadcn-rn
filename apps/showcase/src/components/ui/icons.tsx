import type { LucideIcon } from "lucide-react-native";
import { Moon, Sun } from "lucide-react-native";
import { cssInterop } from "nativewind";

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

iconWithClassName(Sun);
iconWithClassName(Moon);

export { Sun, Moon };
