import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

import { Button, ButtonText } from "@/components/ui/button";
import { Col, ScreenContainer } from "@/components/ui/container";
import { H1, H2 } from "@/components/ui/text";

const IMPACT_STYLES = [
  {
    name: "Default",
    style: undefined,
  },
  { name: "Heavy", style: Haptics.ImpactFeedbackStyle.Heavy },
  { name: "Light", style: Haptics.ImpactFeedbackStyle.Light },
  { name: "Medium", style: Haptics.ImpactFeedbackStyle.Medium },
  { name: "Rigid", style: Haptics.ImpactFeedbackStyle.Rigid },
  { name: "Soft", style: Haptics.ImpactFeedbackStyle.Soft },
  // Haptics.NotificationFeedbackType.Error;
  // Haptics.NotificationFeedbackType.Success;
  // Haptics.NotificationFeedbackType.Warning;
] satisfies {
  style?: Haptics.ImpactFeedbackStyle;
  name: string;
}[];

const NOTIFICATION_STYLES = [
  {
    name: "Default",
    style: undefined,
  },
  { name: "Success", style: Haptics.NotificationFeedbackType.Success },
  { name: "Warning", style: Haptics.NotificationFeedbackType.Warning },
  { name: "Error", style: Haptics.NotificationFeedbackType.Error },
] satisfies {
  style?: Haptics.NotificationFeedbackType;
  name: string;
}[];

const ANDROID_STYLES = [
  { name: "Clock_Tick", style: Haptics.AndroidHaptics.Clock_Tick },
  { name: "Confirm ", style: Haptics.AndroidHaptics.Confirm },
  { name: "Context_Click ", style: Haptics.AndroidHaptics.Context_Click },
  { name: "Drag_Start ", style: Haptics.AndroidHaptics.Drag_Start },
  { name: "Gesture_End ", style: Haptics.AndroidHaptics.Gesture_End },
  { name: "Gesture_Start ", style: Haptics.AndroidHaptics.Gesture_Start },
  { name: "Keyboard_Press ", style: Haptics.AndroidHaptics.Keyboard_Press },
  { name: "Keyboard_Release ", style: Haptics.AndroidHaptics.Keyboard_Release },
  { name: "Keyboard_Tap ", style: Haptics.AndroidHaptics.Keyboard_Tap },
  { name: "Long_Press ", style: Haptics.AndroidHaptics.Long_Press },
  { name: "No_Haptics ", style: Haptics.AndroidHaptics.No_Haptics },
  { name: "Reject ", style: Haptics.AndroidHaptics.Reject },
  {
    name: "Segment_Frequent_Tick ",
    style: Haptics.AndroidHaptics.Segment_Frequent_Tick,
  },
  { name: "Segment_Tick ", style: Haptics.AndroidHaptics.Segment_Tick },
  { name: "Text_Handle_Move ", style: Haptics.AndroidHaptics.Text_Handle_Move },
  { name: "Toggle_Off ", style: Haptics.AndroidHaptics.Toggle_Off },
  { name: "Toggle_On ", style: Haptics.AndroidHaptics.Toggle_On },
  { name: "Virtual_Key ", style: Haptics.AndroidHaptics.Virtual_Key },
  {
    name: "Virtual_Key_Release ",
    style: Haptics.AndroidHaptics.Virtual_Key_Release,
  },
] satisfies {
  style: Haptics.AndroidHaptics;
  name: string;
}[];

export default function HapticShowcase() {
  return (
    // <ScreenContainer edges={["bottom"]} className="gap-8"> */}
    <SafeAreaView edges={["bottom"]}>
      <ScrollView>
        <Col>
          <H1>Impact</H1>
          <H2>On Press</H2>
          {IMPACT_STYLES.map((hapticStyle) => (
            <Button
              key={hapticStyle.name}
              onPress={() => Haptics.impactAsync(hapticStyle.style)}
            >
              <ButtonText>{hapticStyle.name}</ButtonText>
            </Button>
          ))}
          <H2>On Press In</H2>
          {IMPACT_STYLES.map((hapticStyle) => (
            <Button
              key={hapticStyle.name}
              onPressIn={() => Haptics.impactAsync(hapticStyle.style)}
            >
              <ButtonText>{hapticStyle.name}</ButtonText>
            </Button>
          ))}
          <H2>On Long Press</H2>
          {IMPACT_STYLES.map((hapticStyle) => (
            <Button
              key={hapticStyle.name}
              onLongPress={() => Haptics.impactAsync(hapticStyle.style)}
            >
              <ButtonText>{hapticStyle.name}</ButtonText>
            </Button>
          ))}
          <H1>Notification</H1>
          <H2>On Press</H2>
          {NOTIFICATION_STYLES.map((hapticStyle) => (
            <Button
              key={hapticStyle.name}
              onPress={() => Haptics.notificationAsync(hapticStyle.style)}
            >
              <ButtonText>{hapticStyle.name}</ButtonText>
            </Button>
          ))}
          <H1>Selection</H1>
          <H2>On Press</H2>
          <Button onPress={() => Haptics.selectionAsync()}>
            <ButtonText>Selection</ButtonText>
          </Button>
          <H1>Android</H1>
          <H2>On Press</H2>
          {ANDROID_STYLES.map((hapticStyle) => (
            <Button
              key={hapticStyle.name}
              onPress={() =>
                Haptics.performAndroidHapticsAsync(hapticStyle.style)
              }
            >
              <ButtonText>{hapticStyle.name}</ButtonText>
            </Button>
          ))}
        </Col>
      </ScrollView>
    </SafeAreaView>
    // </ScreenContainer>
  );
}
