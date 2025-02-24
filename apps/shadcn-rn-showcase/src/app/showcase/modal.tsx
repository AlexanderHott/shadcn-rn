import { Button, ButtonText } from "@/components/ui/button";
import { H1 } from "@/components/ui/text";
import { useState } from "react";
import { Modal, StyleSheet, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const INITIAL_SCALE = 0.75;
const DURATION = 150;
export default function ModalShowcaseScreen() {
  const [open, setOpen] = useState(false);
  const scale = useSharedValue(INITIAL_SCALE);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const openModal = () => {
    setOpen(true);
    scale.value = withTiming(1, { duration: DURATION });
    opacity.value = withTiming(1, { duration: DURATION });
  };
  const closeModal = () => {
    scale.value = withTiming(INITIAL_SCALE, { duration: DURATION });
    opacity.value = withTiming(0, { duration: DURATION }, (finished) => {
      if (finished) {
        runOnJS(setOpen)(false);
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <Button onPress={openModal}>
        <ButtonText> Open modal</ButtonText>
      </Button>
      <Modal
        visible={open}
        className="bg-red-500"
        transparent
        onRequestClose={closeModal}
      >
        <GestureHandlerRootView className="flex-1">
          <Animated.View
            style={[
              {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#00000080",
              },
              animatedBackgroundStyle,
            ]}
          >
            <Pressable onPress={closeModal} style={StyleSheet.absoluteFill} />
            <Animated.View
              style={[
                animatedStyle,
                {
                  backgroundColor: "white",
                  padding: 16,
                  borderRadius: 4,
                },
              ]}
            >
              <H1>Modal</H1>
              <Button onPress={closeModal}>
                <ButtonText>Close modal</ButtonText>
              </Button>
            </Animated.View>
          </Animated.View>
        </GestureHandlerRootView>
      </Modal>
    </SafeAreaView>
  );
}
