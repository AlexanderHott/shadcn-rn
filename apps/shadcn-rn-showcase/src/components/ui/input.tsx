import { createContext, RefObject, useContext, useRef } from "react";
import {
  Pressable,
  TextInput as RNTextInputComponent,
  TextInputProps as RNTextInputProps,
  View,
  ViewProps,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { Text, TextProps } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const RNTextInput = Animated.createAnimatedComponent(RNTextInputComponent);

const InputContext = createContext<{
  ref: RefObject<RNTextInputComponent>;
} | null>(null);
export function useInput() {
  const ctx = useContext(InputContext);
  if (ctx === null) {
    throw new Error(
      "You must use `useInput` from within an `Input` component.",
    );
  }
  return ctx;
}

export type InputProps = ViewProps;
export function Input({ className, ...rest }: ViewProps) {
  const ref = useRef<RNTextInputComponent>(null);
  return (
    <InputContext.Provider value={{ ref }}>
      <View className={cn("flex flex-col gap-1", className)} {...rest} />
    </InputContext.Provider>
  );
}

export type InputFieldProps = RNTextInputProps;
export function InputField({
  className,
  autoFocus,
  onFocus,
  onBlur,
  ...rest
}: InputFieldProps) {
  const { ref } = useInput();
  const focused = useSharedValue(autoFocus);
  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: focused.value ? "hsl(0 0% 0%)" : "hsl(0 0% 89.8%)",
  }));

  return (
    <RNTextInput
      ref={ref}
      className={cn(
        "flex h-10 w-full flex-shrink rounded-md border bg-background px-3 py-2 font-normal text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      style={animatedStyle}
      onFocus={(e) => {
        focused.value = true;
        onFocus?.(e);
      }}
      onBlur={(e) => {
        focused.value = false;
        onBlur?.(e);
      }}
      autoFocus={autoFocus}
      {...rest}
    />
  );
}

export type InputLabelProps = TextProps;
export function InputLabel({ className, ...rest }: InputLabelProps) {
  const { ref } = useInput();
  return (
    <Pressable onPress={() => ref.current?.focus()}>
      <Text
        className={cn("font-medium text-sm leading-none", className)}
        {...rest}
      />
    </Pressable>
  );
}
