import { H1, Link, Text } from "@/components/ui/text";
import { geist } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { Href } from "expo-router";
import { Image, View, Text as RNText, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COMPONENTS = [
  { href: "/showcase/badge", name: "Badge" },
  { href: "/showcase/bottom-sheet", name: "Bottom Sheet" },
  { href: "/showcase/modal", name: "Modal" },
  { href: "/showcase/text", name: "Text G" },
] satisfies {
  href: Href;
  name: string;
}[];

const classnames = [
  "font-black",
  "font-[Geist-Black]",
  "font-extrabold",
  "font-[Geist-ExtraBold]",
  "font-bold",
  "font-[Geist-Bold]",
  "font-semibold",
  "font-[Geist-SemiBold]",
  "font-medium",
  "font-[Geist-Medium]",
  "font-normal",
  "font-[Geist-Regular]",
  "font-light",
  "font-[Geist-Light]",
  "font-extralight",
  "font-[Geist-ExtraLight]",
  "font-thin",
  "font-[Geist-Thin]",
];

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="p-4">
          <View className="flex flex-row gap-4 items-center">
            <Logo />
            <H1>shadcn/ui React Native G</H1>
          </View>
          {classnames.map((classname) => (
            <View key={classname}>
              <RNText className={classname}>G RN {classname}</RNText>
              <H1 className={classname}>G H1 {classname}</H1>
              <Text className={classname}>G {classname}</Text>
            </View>
          ))}

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
