import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { H1, Link } from "@/components/ui/text";

const COMPONENTS = [
  { href: "/showcase/badge", name: "Badge" },
  { href: "/showcase/bottom-sheet", name: "Bottom Sheet" },
  { href: "/showcase/bottom-sheet-perf", name: "Bottom Sheet Perf" },
  { href: "/showcase/button", name: "Button" },
  { href: "/showcase/input", name: "Input" },
  { href: "/showcase/modal", name: "Modal" },
  { href: "/showcase/slot", name: "Slot" },
  { href: "/showcase/text", name: "Text" },
] satisfies {
  href: Href;
  name: string;
}[];

export default function Index() {
  return (
    <H1>shadcn/ui React Native</H1>
    // {/*   <SafeAreaView className="flex-1"> */}
    // {/*     <ScrollView> */}
    // {/*       <View className="p-4"> */}
    // {/*         <View className="flex flex-row items-center gap-4"> */}
    // {/*           <Logo /> */}
    // {/*           <H1>shadcn/ui React Native</H1> */}
    // {/*         </View> */}
    // {/*         <FlashList */}
    // {/*           data={COMPONENTS} */}
    // {/*           renderItem={({ item }) => <Link href={item.href}>{item.name}</Link>} */}
    // {/*           estimatedItemSize={20} */}
    // {/*         /> */}
    // {/*       </View> */}
    // {/*     </ScrollView> */}
    // {/*   </SafeAreaView> */}
  );
}

function Logo() {
  return (
    <Image
      source={require("../assets/images/icon.png")}
      style={{ width: 32, height: 32 }}
    />
  );
}
