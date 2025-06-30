import type { LinkProps as ExpoLinkProps } from "expo-router";
import type { TextProps as RNTextProps, ViewProps } from "react-native";
import { Text as RNText, View } from "react-native";
import { Link as ExpoLink } from "expo-router";

import { cn } from "@/lib/utils";

export type TextProps = RNTextProps;
export function Text({ className, ...rest }: RNTextProps) {
  return <RNText className={className} {...rest} />;
}

export type H1Props = TextProps;
export function H1({ className, ...rest }: H1Props) {
  return (
    <Text
      className={cn(
        "scroll-m-20 font-semibold text-4xl tracking-tight text-foreground lg:text-5xl",
        className,
      )}
      {...rest}
    />
  );
}

export type H2Props = TextProps;
export function H2({ className, ...rest }: H1Props) {
  return (
    <Text
      className={cn(
        "scroll-m-20 border-b border-border pb-2 font-semibold text-3xl tracking-tight text-foreground",
        className,
      )}
      {...rest}
    />
  );
}

export type H3Props = TextProps;
export function H3({ className, ...rest }: H1Props) {
  return (
    <Text
      className={cn(
        "scroll-m-20 font-semibold text-2xl tracking-tight text-foreground",
        className,
      )}
      {...rest}
    />
  );
}

export type PProps = TextProps;
export function P({ className, ...rest }: PProps) {
  return (
    <Text
      className={cn("font-normal leading-5 text-foreground", className)}
      {...rest}
    />
  );
}

export type LinkProps = ExpoLinkProps;
export function Link({ className, ...rest }: LinkProps) {
  return (
    <ExpoLink
      className={cn(
        "font-medium text-primary underline underline-offset-4",
        className,
      )}
      {...rest}
    />
  );
}

export type UlProps = ViewProps;
export function Ul({ className, ...rest }: UlProps) {
  return <View className={cn("pl-4", className)} {...rest} />;
}

export type OlProps = ViewProps;
export function Ol({ className, ...rest }: OlProps) {
  return <View className={cn("pl-4", className)} {...rest} />;
}

export type LiProps = TextProps;
export function Li({ className, ...rest }: LiProps) {
  return (
    <View className="mb-1 flex-row items-start">
      <Text selectable={false} className="mr-2 text-foreground">
        •
      </Text>
      <Text className={cn(className, "text-foreground")} {...rest} />
    </View>
  );
}

export type OliProps = TextProps & { index: number };
export function Oli({ index, className, ...rest }: OliProps) {
  return (
    <View className="mb-1 flex-row items-start">
      <Text selectable={false} className="mr-2">
        {index}.
      </Text>
      <Text className={cn(className)} {...rest} />
    </View>
  );
}

export type BlockquoteProps = TextProps;
export function Blockquote({ className, ...rest }: BlockquoteProps) {
  return (
    <Text
      className={cn(
        "native:mt-4 native:pl-3 mt-6 border-l-2 border-border pl-6 text-base italic text-foreground",
        className,
      )}
      {...rest}
    />
  );
}
