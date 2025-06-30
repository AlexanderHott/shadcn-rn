import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { P } from "@/components/ui/text";

export default function BadgeShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            {/* <CardAction>Card Action</CardAction> */}
          </CardHeader>
          <CardContent>
            <P>Card Content</P>
          </CardContent>
          <CardFooter>
            <P>Card Footer</P>
          </CardFooter>
        </Card>
      </View>
    </SafeAreaView>
  );
}
