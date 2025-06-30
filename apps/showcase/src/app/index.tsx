import type { Href } from "expo-router";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LegendList } from "@legendapp/list";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H1, Link, P } from "@/components/ui/text";

interface NavItem {
  href: Href;
  name: string;
  content: string;
}
const COMPONENTS = [
  {
    href: "/showcase/badge",
    name: "Badge",
    content: "Displays a badge or a component that looks like a badge.",
  },
  {
    href: "/showcase/bottom-sheet",
    name: "Bottom Sheet",
    content: "Display content that complements the main content of the screen.",
  },
  {
    href: "/showcase/bottom-sheet-modal",
    name: "Bottom Sheet Modal",
    content: "Display content that complements the main content of the screen.",
  },
  {
    href: "/showcase/button",
    name: "Button",
    content: "Displays a button or a component that looks like a button.",
  },
  {
    href: "/showcase/compiler-check",
    name: "Compiler Check",
    content: "Check to see if the react compiler (forget) is enabled",
  },
  {
    href: "/showcase/card",
    name: "Card",
    content: "Displays a card with header, content, and footer.",
  },
  {
    href: "/showcase/grouped-list",
    name: "Grouped List",
    content: "Displays a list with different item types.",
  },
  {
    href: "/showcase/input",
    name: "Input",
    content:
      "Displays a form input field or a component that looks like an input field.",
  },
  {
    href: "/showcase/flash-list",
    name: "FlashList",
    content: "Displays items in a performant list.",
  },
  {
    href: "/showcase/legend-list",
    name: "LegendList",
    content: "Displays items in a performant list.",
  },
  {
    href: "/showcase/modal",
    name: "Modal",
    content:
      "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
  },
  {
    href: "/showcase/select-sheet",
    name: "Sheet Select",
    content: "Displays a selection choice with a bottom sheet.",
  },
  {
    href: "/showcase/slot",
    name: "Slot",
    content: "A utility component for the `asChild` pattern",
  },
  { content: "Typography set", href: "/showcase/text", name: "Text" },
] satisfies NavItem[];

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex gap-4">
        <LegendList
          ListHeaderComponent={
            <View className="flex flex-row items-center gap-4 p-4">
              <Logo />
              <H1>shadcn/ui React Native</H1>
            </View>
          }
          data={COMPONENTS}
          keyExtractor={(item) => item.href}
          renderItem={({ item }) => <ShowcaseLink item={item} />}
          ItemSeparatorComponent={() => <View className="h-4 w-full" />}
          estimatedItemSize={121}
          recycleItems
        />
      </View>
    </SafeAreaView>
  );
}

function Logo() {
  return (
    <Image
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      source={require("../assets/images/icon.png") as number}
      style={{ width: 32, height: 32 }}
    />
  );
}

function ShowcaseLink({ item }: { item: NavItem }) {
  return (
    <Link href={item.href} className="px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <P>{item.content}</P>
        </CardContent>
      </Card>
    </Link>
  );
}
