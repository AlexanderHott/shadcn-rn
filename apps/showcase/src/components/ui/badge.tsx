import type { VariantProps } from "class-variance-authority";
import type { TextProps, ViewProps } from "react-native";
import { createContext, useContext } from "react";
import { Text, View } from "react-native";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "flex self-center items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary ",
        secondary: "border-transparent bg-secondary",
        destructive: "border-transparent bg-destructive",
        outline: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const badgeTextVariants = cva("text-xs font-semibold ", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;

const BadgeContext = createContext<BadgeVariants | null>(null);
export function useBadge() {
  const ctx = useContext(BadgeContext);
  if (ctx === null) {
    throw new Error("`useBadge` must be used from within a `Badge` component.");
  }
  return ctx;
}

export type BadgeProps = ViewProps & VariantProps<typeof badgeVariants> & {};

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <BadgeContext.Provider value={{ variant }}>
      <View className={cn(badgeVariants({ variant }), className)} {...props} />
    </BadgeContext.Provider>
  );
}

export type BadgeTextProps = TextProps &
  VariantProps<typeof badgeTextVariants> & {};

export function BadgeText({ className, variant, ...props }: BadgeTextProps) {
  const badge = useBadge();
  return (
    <Text
      className={cn(
        badgeTextVariants({ variant: variant ?? badge.variant }),
        className,
      )}
      {...props}
    />
  );
}
