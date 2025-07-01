import { View } from "react-native";
import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";

import { Button, ButtonText } from "@/components/ui/button";
import { ScreenContainer } from "@/components/ui/container";
import { H1 } from "@/components/ui/text";
import { useColorScheme } from "@/lib/utils";

export default function ButtonShowcaseScreen() {
  const variants = [
    "default",
    "secondary",
    "outline",
    "ghost",
    "destructive",
  ] as const;
  const { isDarkColorScheme } = useColorScheme();
  return (
    <ScreenContainer edges={["bottom"]}>
      <View className="gap-4">
        <H1>Buttons</H1>
        {variants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            onPress={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            }
          >
            <ButtonText>{variant}</ButtonText>
          </Button>
        ))}
        <Button size="sm">
          <ButtonText>small</ButtonText>
        </Button>
        <Button size="lg">
          <ButtonText>large</ButtonText>
        </Button>
        <Button size="icon">
          <Feather
            name="plus"
            color={isDarkColorScheme ? "black" : "white"}
            size={20}
          />
        </Button>
      </View>
    </ScreenContainer>
  );
}
