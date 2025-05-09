import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetItem,
  BottomSheetModal,
  BottomSheetTrigger,
} from "@/components/ui/bottom-sheet";

export default function BottomSheetShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1 p-8">
      <Text>bottom sheet showcase</Text>
      <BottomSheet>
        <BottomSheetTrigger>
          <Text>Open sheet</Text>
        </BottomSheetTrigger>
        <BottomSheetModal>
          <BottomSheetContent>
            <BottomSheetItem onPress={() => console.log("hi")} closeOnSelect>
              <Text>Hi from sheet</Text>
            </BottomSheetItem>
          </BottomSheetContent>
        </BottomSheetModal>
      </BottomSheet>
    </SafeAreaView>
  );
}
