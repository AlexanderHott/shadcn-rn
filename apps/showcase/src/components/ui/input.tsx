import type { RefObject } from "react";
import type {
  TextInputProps as RNTextInputProps,
  ViewProps,
} from "react-native";
import { createContext, useContext, useRef } from "react";
import { Pressable, TextInput as RNTextInput, View } from "react-native";

import type { TextProps } from "@/components/ui/text";
import { P } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const InputContext = createContext<{
  ref: RefObject<RNTextInput | null>;
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
  const ref = useRef<RNTextInput>(null);
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
  // onFocus,
  // onBlur,
  ...rest
}: InputFieldProps) {
  const { ref } = useInput();

  return (
    <RNTextInput
      ref={ref}
      className={cn(
        "flex h-10 w-full flex-shrink rounded-md border border-border bg-background px-3 py-2 font-normal text-base text-primary shadow placeholder:text-muted-foreground focus:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      // onFocus={(e) => {
      //   focused.value = true;
      //   onFocus?.(e);
      // }}
      // onBlur={(e) => {
      //   focused.value = false;
      //   onBlur?.(e);
      // }}
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
      <P
        className={cn("font-medium text-sm leading-none", className)}
        {...rest}
      />
    </Pressable>
  );
}
