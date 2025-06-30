import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { Button, ButtonText, TouchableOpacity } from "@/components/ui/button";
import { Input, InputField, InputLabel } from "@/components/ui/input";
import { H1, H3, P } from "@/components/ui/text";

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
      <H1>Modal</H1>
      <Button onPress={openModal}>
        <ButtonText> Open modal</ButtonText>
      </Button>
      <Modal visible={open} transparent onRequestClose={closeModal}>
        <GestureHandlerRootView className="flex-1">
          <Animated.View
            className="flex-1 items-center justify-center bg-black/50"
            style={animatedBackgroundStyle}
          >
            <Pressable onPress={closeModal} style={StyleSheet.absoluteFill} />
            <Animated.View
              className="relative m-8 flex rounded bg-white p-8"
              style={animatedStyle}
            >
              <View className="flex gap-4">
                <View className="flex gap-1">
                  <H3>Edit profile</H3>
                  <P className="text-muted-foreground">
                    Make changes to your profile here. Click save when you're
                    done.
                  </P>
                </View>
                <Input>
                  <InputLabel>Username</InputLabel>
                  <InputField placeholder="John Doe" />
                </Input>
                <Input>
                  <InputLabel>Password</InputLabel>
                  <InputField secureTextEntry placeholder="••••••••••••••••" />
                </Input>

                <View className="flex flex-row items-center justify-end gap-4">
                  <Button
                    onPress={closeModal}
                    className=""
                    variant={"secondary"}
                  >
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                  <Button onPress={closeModal} className="">
                    <ButtonText>Submit</ButtonText>
                  </Button>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => closeModal()}
                className="absolute right-2 top-2"
              >
                <Feather name="x" size={16} color={"#333"} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </GestureHandlerRootView>
      </Modal>
    </SafeAreaView>
  );
}
