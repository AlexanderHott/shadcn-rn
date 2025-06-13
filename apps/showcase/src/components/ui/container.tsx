import type { ViewProps } from "react-native";
import type { SafeAreaViewProps } from "react-native-safe-area-context";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";

export function Row(props: ViewProps) {
  const { className, ...rest } = props;
  return <View className={cn("flex flex-row gap-2", className)} {...rest} />;
}

export function Col(props: ViewProps) {
  const { className, ...rest } = props;
  return <View className={cn("flex flex-col gap-2", className)} {...rest} />;
}

type ScreenContainerProps = SafeAreaViewProps;
export function ScreenContainer({ className, ...rest }: ScreenContainerProps) {
  return (
    <SafeAreaView
      className={cn("flex flex-col gap-2 p-4", className)}
      {...rest}
    />
  );
}
