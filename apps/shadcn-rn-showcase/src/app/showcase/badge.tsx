import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

import { Badge, BadgeText } from "@/components/ui/badge";

const VARIANTS = ["default", "secondary", "destructive", "outline"] as const;

export default function BadgeShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <FlashList
          data={VARIANTS}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item }) => (
            <Badge variant={item}>
              <BadgeText>Badge</BadgeText>
            </Badge>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
