import type { ReactNode } from "react";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Moon, Sun } from "@/components/ui/icons";

import "@/global.css";

import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import type { Theme } from "@react-navigation/native";
import { Button } from "@/components/ui/button";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/utils";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const LIGHT_THEME = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
} satisfies Theme;
const DARK_THEME = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
} satisfies Theme;

export default function RootLayout() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "index",

            headerRight: () => (
              <Button
                onPress={() =>
                  setColorScheme(isDarkColorScheme ? "light" : "dark")
                }
                variant="ghost"
              >
                {isDarkColorScheme ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            ),
          }}
        />
      </Stack>
      {/* <PortalHost /> */}
    </ThemeProvider>
  );
}

// export default function RootLayout() {
//   const { isDarkColorScheme, setColorScheme } = useColorScheme();
//   return (
//     <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
//       {/* <Providers> */}
//       <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
//       <Stack>
//         <Stack.Screen
//           name="index"
//           options={{
//             headerRight: () => (
//               <Button
//                 onPress={() =>
//                   setColorScheme(isDarkColorScheme ? "light" : "dark")
//                 }
//                 variant="ghost"
//               >
//                 {isDarkColorScheme ? <Sun size={20} /> : <Moon size={20} />}
//               </Button>
//             ),
//           }}
//         />
//       </Stack>
//     </ThemeProvider>
//     // </Providers>
//   );
// }

interface ProviderProps {
  children: ReactNode;
}
function Providers(props: Readonly<ProviderProps>) {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <BottomSheetModalProvider>{props.children}</BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
