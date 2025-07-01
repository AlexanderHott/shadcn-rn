import type { VariantProps } from "class-variance-authority";
import type { ComponentRef } from "react";
import type {
  PressableProps,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from "react-native";
import { createContext, forwardRef, useContext } from "react";
import {
  Pressable,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import { cva } from "class-variance-authority";

import type { TextProps } from "@/components/ui/text";
import { Text } from "@/components/ui/text";
import { cn, useColorScheme } from "@/lib/utils";

export type TouchableOpacityProps = RNTouchableOpacityProps;

export const TouchableOpacity = forwardRef<
  ComponentRef<typeof RNTouchableOpacity>,
  TouchableOpacityProps
>(({ activeOpacity = 0.75, ...props }, ref) => {
  return (
    <RNTouchableOpacity ref={ref} activeOpacity={activeOpacity} {...props} />
  );
});

/**
 * Since nativewind doesn't support 'inline-flex', we need to apply 'self-center' to make the button not stretch fully. You can override this behavior with the 'self-*' classes on the button, or change the code below.
 */
const buttonVariants = cva(
  "flex items-center justify-center gap-2 whitespace-nowrap rounded-md self-center overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-destructive",
        outline: "border border-input bg-background",
        secondary: "bg-secondary",
        ghost: "",
        // link: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
const buttonTextVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-primary",
      secondary: "text-secondary-foreground",
      ghost: "text-primary",
      // link: "text-primary underline-offset-4 underline",
    },
    size: {
      default: "",
      sm: "text-xs",
      lg: "text-base",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const RIPPLES = {
  light: {
    default: "hsla(0, 0%, 90%, 0.3)",
    destructive: "hsla(0, 0%, 10%, 0.3)",
    outline: "hsla(0, 0%, 10%, 0.3)",
    secondary: "hsla(0, 0%, 10%, 0.3)",
    ghost: "hsla(0, 0%, 10%, 0.3)",
  },
  dark: {
    default: "hsla(0, 0%, 10%, 0.3)",
    destructive: "hsla(0, 0%, 90%, 0.3)",
    outline: "hsla(0, 0%, 90%, 0.3)",
    secondary: "hsla(0, 0%, 90%, 0.3)",
    ghost: "hsla(0, 0%, 90%, 0.3)",
  },
} as const;

export type ButtonVariants = VariantProps<typeof buttonVariants>;
const ButtonContext = createContext<ButtonVariants | null>(null);
export function useButton() {
  const ctx = useContext(ButtonContext);
  if (ctx === null) {
    throw new Error(
      "`useButton` must be used from within a `Button` component.",
    );
  }
  return ctx;
}

export type ButtonProps = PressableProps & VariantProps<typeof buttonVariants>;

export const Button = forwardRef<ComponentRef<typeof Pressable>, ButtonProps>(
  ({ className, size, variant, ...props }, ref) => {
    const { colorScheme } = useColorScheme();
    const ripple = RIPPLES[colorScheme][variant ?? "default"];
    return (
      <ButtonContext.Provider value={{ size, variant }}>
        <Pressable
          android_ripple={{
            color: ripple,
            borderless: true,
            foreground: true,
          }}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </ButtonContext.Provider>
    );
  },
);
Button.displayName = "Button";

export type ButtonTextProps = TextProps &
  VariantProps<typeof buttonTextVariants>;

export function ButtonText({
  className,
  size,
  variant,
  ...props
}: ButtonTextProps) {
  const button = useButton();
  return (
    <Text
      className={cn(
        buttonTextVariants({
          variant: variant ?? button.variant,
          size: size ?? button.size,
          className,
        }),
      )}
      {...props}
    />
  );
}

ButtonText.displayName = "ButtonText";
