import { cn } from "@/lib/utils";
import type { TextProps as RNTextProps, ViewProps } from "react-native";
import { Text as RNText, View } from "react-native";
import type { LinkProps as ExpoLinkProps } from "expo-router";
import { Link as ExpoLink } from "expo-router";

const FONT_WEIGHTS: Record<string, string> = {
  "font-black": "Black",
  "font-extrabold": "ExtraBold",
  "font-bold": "Bold",
  "font-semibold": "SemiBold",
  "font-medium": "Medium",
  "font-normal": "Regular",
  "font-light": "Light",
  "font-extralight": "ExtraLight",
  "font-thin": "Thin",
};

const DEFAULT_FAMILY = "Geist";
const MONO_FAMILY = "GeistMono";
const DEFAULT_WEIGHT = "Regular";

function fontFamilyFix(className?: string) {
  if (!className) return `font-[${DEFAULT_FAMILY}-${DEFAULT_WEIGHT}]`;

  let classes = className.split(" ").filter((cls) => !cls.startsWith("font-"));
  const isMono = className?.includes("font-mono") ?? false;

  const fontPrefix = isMono ? MONO_FAMILY : DEFAULT_FAMILY;
  const weightKey = Object.keys(FONT_WEIGHTS).find((key) =>
    className?.includes(key),
  );
  const newFontClass = `font-[${fontPrefix}${weightKey ? `-${FONT_WEIGHTS[weightKey]}` : `-${DEFAULT_WEIGHT}`}]`;

  classes.push(newFontClass);
  return classes.join(" ");
}

export type TextProps = RNTextProps;
export function Text({ className, ...rest }: RNTextProps) {
  const newClassName = fontFamilyFix(className);
  return (
    <RNText className={cn("font-[Geist-Regular]", newClassName)} {...rest} />
  );
}

export type H1Props = TextProps;
export function H1({ className, ...rest }: H1Props) {
  return (
    <Text
      className={cn(
        "scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl",
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
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors",
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
        "mt-10 scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...rest}
    />
  );
}

export type PProps = TextProps;
export function P({ className, ...rest }: PProps) {
  return <Text className={cn("leading-7 mt-6", className)} {...rest} />;
}

export type LinkProps = ExpoLinkProps;
export function Link({ className, ...rest }: LinkProps) {
  return (
    <ExpoLink
      className={cn(
        "font-medium text-primary underline underline-offset-4 ",
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
    <View className="flex-row items-start mb-1">
      <Text selectable={false} className="mr-2">
        •
      </Text>
      <Text className={cn(className)} {...rest} />
    </View>
  );
}

export type OliProps = TextProps & { index: number };
export function Oli({ index, className, ...rest }: OliProps) {
  return (
    <View className="flex-row items-start mb-1">
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
      className={cn("mt-6 border-l-2 border-gray-300 pl-6 italic", className)}
      {...rest}
    />
  );
}
