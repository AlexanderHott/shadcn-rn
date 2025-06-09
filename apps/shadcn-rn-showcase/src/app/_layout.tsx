import React from "react";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { Stack } from "expo-router";
//
// import "@/global.css";
//
// export default function RootLayout() {
//   return (
//     <>
//       {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
//       <Stack>
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       {/* <Stack screenOptions={{ headerShown: false }} /> */}
//       {/* <Text>Hi</Text> */}
//       {/* </GestureHandlerRootView> */}
//     </>
//   );
// }

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import "react-native-reanimated";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
