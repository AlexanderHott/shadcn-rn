import { FlashList } from "@shopify/flash-list";
import { Href, Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COMPONENTS = [
  { href: "/showcase/badge", name: "Badge" },
  { href: "/showcase/bottom-sheet", name: "Bottom Sheet" },
  { href: "/showcase/text", name: "Text" },
] satisfies {
  href: Href;
  name: string;
}[];

export default function Index() {
  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="flex flex-row gap-4 items-center">
        <Logo />
        <Text className="text-2xl font-bold">shadcn/ui React Native</Text>
      </View>

      <FlashList
        data={COMPONENTS}
        renderItem={({ item }) => <Link href={item.href}>{item.name}</Link>}
        estimatedItemSize={20}
      />
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
