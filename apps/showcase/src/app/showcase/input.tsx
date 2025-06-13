import { Keyboard, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Input, InputField, InputLabel } from "@/components/ui/input";
import { H1 } from "@/components/ui/text";

export default function InputShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1">
      <Pressable onPress={() => Keyboard.dismiss()} className="flex-1">
        <View className="flex gap-4 p-4">
          <H1>Input</H1>
          <Input>
            <InputLabel>Username</InputLabel>
            <InputField placeholder="John Doe" />
          </Input>
          <Input>
            <InputLabel>Password</InputLabel>
            <InputField secureTextEntry placeholder="••••••••••••••••" />
          </Input>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
