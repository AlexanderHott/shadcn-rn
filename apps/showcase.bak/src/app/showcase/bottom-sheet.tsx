import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetView } from "@gorhom/bottom-sheet";

import { BottomSheet, useSheetRef } from "@/components/ui/bottom-sheet";
import { Button, ButtonText } from "@/components/ui/button";

export default function BottomSheetShowase() {
  const ref1 = useSheetRef();
  const ref2 = useSheetRef();
  const snapPoints = ["50%", "90%"];

  return (
    <SafeAreaView>
      <Button onPress={() => ref1.current?.present()}>
        <ButtonText>Open sheet 1</ButtonText>
      </Button>
      <Button onPress={() => ref2.current?.present()}>
        <ButtonText>Open sheet 2</ButtonText>
      </Button>

      <BottomSheet ref={ref1} snapPoints={snapPoints}>
        <BottomSheetView className="p-8">
          <Text>Hi 1</Text>
          <Button onPress={() => ref2.current?.present()}>
            <ButtonText>open sheet 2</ButtonText>
          </Button>
          <Button onPress={() => ref1.current?.dismiss()}>
            <ButtonText>close sheet</ButtonText>
          </Button>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet ref={ref2} snapPoints={snapPoints}>
        <BottomSheetView className="p-8">
          <Text>Hi 2</Text>

          <Button onPress={() => ref2.current?.dismiss()}>
            <ButtonText>close sheet 2</ButtonText>
          </Button>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
