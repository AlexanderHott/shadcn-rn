import { Text } from "@/components/ui/text";
import { useState } from "react";
import { Button, Modal, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalShowcaseScreen() {
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView className="flex-1 p-4">
      <Button title="Open modal" onPress={() => setOpen(true)} />
      <Modal
        visible={open}
        className="bg-red-500"
        transparent
        onShow={() => console.log("shown")}
        onRequestClose={() => setOpen(false)}
      >
        <View className=" flex-1">
          <Text>GGG</Text>
          <Button title="Close modal" onPress={() => setOpen(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
