import { SafeAreaView, ScrollView, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Button, ButtonText } from "@/components/ui/button";
import { H1 } from "@/components/ui/text";

export default function ButtonShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="m-4 gap-4">
          <H1>Buttons</H1>
          <Button>
            <ButtonText>Click me</ButtonText>
          </Button>
          <Button variant="secondary">
            <ButtonText>Click me</ButtonText>
          </Button>
          <Button variant="outline">
            <ButtonText>Click me</ButtonText>
          </Button>
          <Button variant="ghost">
            <ButtonText>Click me</ButtonText>
          </Button>
          <Button variant="destructive">
            <ButtonText>Click me</ButtonText>
          </Button>
          <Button size="sm">
            <ButtonText>Click me</ButtonText>
          </Button>
          <Button size="lg">
            <ButtonText>Click me</ButtonText>
          </Button>
          <Button size="icon">
            <Feather name="plus" color={"white"} size={20} />
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
