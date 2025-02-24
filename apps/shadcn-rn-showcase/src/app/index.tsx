import { H1, Link } from "@/components/ui/text";
import { FlashList } from "@shopify/flash-list";
import { Href } from "expo-router";
import { Image, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COMPONENTS = [
  { href: "/showcase/badge", name: "Badge" },
  { href: "/showcase/bottom-sheet", name: "Bottom Sheet" },
  { href: "/showcase/button", name: "Button" },
  { href: "/showcase/modal", name: "Modal" },
  { href: "/showcase/text", name: "Text" },
] satisfies {
  href: Href;
  name: string;
}[];

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="p-4">
          <View className="flex flex-row gap-4 items-center">
            <Logo />
            <H1>shadcn/ui React Native</H1>
          </View>
          <FlashList
            data={COMPONENTS}
            renderItem={({ item }) => <Link href={item.href}>{item.name}</Link>}
            estimatedItemSize={20}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
