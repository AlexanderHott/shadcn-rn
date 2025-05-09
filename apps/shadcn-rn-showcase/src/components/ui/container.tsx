import { View, ViewProps } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

import { cn } from "@/lib/utils";

export type RowProps = ViewProps;
export function Row({ className, ...rest }: RowProps) {
  return <View className={cn("", className)} {...rest} />;
}

export type ColProps = ViewProps;
export function Col({ className, ...rest }: RowProps) {
  return <View className={cn("", className)} {...rest} />;
}

type ScreenContainerProps = SafeAreaViewProps;
export function ScreenContainer({ className, ...rest }: ScreenContainerProps) {
  return <SafeAreaView className={cn("", className)} {...rest} />;
}
