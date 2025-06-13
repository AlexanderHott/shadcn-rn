import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  BottomSheet,
  BottomSheetModal,
  BottomSheetTrigger,
  BottomSheetView,
} from "@/components/ui/bottom-sheet-modal";

export default function BadgeShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <BottomSheet>
          <BottomSheetTrigger>
            <Text>Hi</Text>
          </BottomSheetTrigger>
          <BottomSheetModal>
            <BottomSheetView style={{ padding: 36 }}>
              <Text>Hi from sheet</Text>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}
