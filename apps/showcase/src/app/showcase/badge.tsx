import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

import { Badge, BadgeText } from "@/components/ui/badge";
import { ScreenContainer } from "@/components/ui/container";

const VARIANTS = ["default", "secondary", "destructive", "outline"] as const;

export default function BadgeShowcaseScreen() {
  return (
    <ScreenContainer edges={["bottom"]}>
      <FlashList
        data={VARIANTS}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item }) => (
          <Badge variant={item}>
            <BadgeText>Badge - {item}</BadgeText>
          </Badge>
        )}
      />
    </ScreenContainer>
  );
}
