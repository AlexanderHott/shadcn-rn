import { Badge, BadgeText } from "@/components/ui/badge";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VARIANTS = ["default", "secondary", "destructive", "outline"] as const;

export default function BadgeShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <FlashList
          data={VARIANTS}
          keyExtractor={(item) => item}
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
