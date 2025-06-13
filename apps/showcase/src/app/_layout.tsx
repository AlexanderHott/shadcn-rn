import type { ReactNode } from "react";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import "@/global.css";

export default function RootLayout() {
  return (
    <Providers>
      <Stack />
    </Providers>
  );
}

interface ProviderProps {
  children: ReactNode;
}
function Providers(props: Readonly<ProviderProps>) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>{props.children}</BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
