import { SafeAreaView, ScrollView, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Button, ButtonText } from "@/components/ui/button";
import { H1 } from "@/components/ui/text";

export default function ButtonShowcaseScreen() {
  return (
    <SafeAreaView className="w-full flex-1 items-center bg-white">
      <ScrollView className="w-full">
        <View className="m-4 gap-4">
          <H1>Buttons</H1>
          <Button className="">
            <ButtonText>Click me</ButtonText>
          </Button>
          <Button variant="secondary" className="self-end">
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
