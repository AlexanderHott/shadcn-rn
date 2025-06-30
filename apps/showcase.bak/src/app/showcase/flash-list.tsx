import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

import { P } from "@/components/ui/text";

const items = Array.from({ length: 10_000 }).map((_, i) => ({
  id: i.toString(),
  title: `Item: ${i + 1}`,
}));

export default function ListShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <FlashList
          data={items}
          renderItem={({ item }) => <P>{item.title}</P>}
          keyExtractor={(item) => item.id}
          estimatedItemSize={17}
        />
      </View>
    </SafeAreaView>
  );
}
