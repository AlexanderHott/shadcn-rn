import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { Button, ButtonText } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Col, Row, ScreenContainer } from "@/components/ui/container";
import { Google } from "@/components/ui/icons";
import { Input, InputField, InputLabel } from "@/components/ui/input";
import { P } from "@/components/ui/text";

export default function BadgeShowcaseScreen() {
  return (
    <ScreenContainer edges={["bottom"]}>
      <Card>
        <CardHeader>
          <Row>
            <Col className="flex-1">
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </Col>
            <Link href={".."} asChild>
              <Button variant="ghost">
                <ButtonText>Sign Up</ButtonText>
              </Button>
            </Link>
          </Row>
        </CardHeader>
        <CardContent>
          <View className="flex flex-col gap-6">
            <View className="grid gap-2">
              <Input>
                <InputLabel>Email</InputLabel>
                <InputField placeholder="m@example.com" />
              </Input>
            </View>
            <View className="grid gap-2">
              <Input>
                <Row className="items-center">
                  <InputLabel>Password</InputLabel>
                  <Link
                    href=".."
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    <P>Forgot your password?</P>
                  </Link>
                </Row>
                <InputField secureTextEntry />
              </Input>
            </View>
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full">
            <ButtonText>Login</ButtonText>
          </Button>
          <Button variant="outline" className="w-full">
            <ButtonText>Login with Google</ButtonText>
            <Google />
          </Button>
        </CardFooter>
      </Card>
    </ScreenContainer>
  );
}
