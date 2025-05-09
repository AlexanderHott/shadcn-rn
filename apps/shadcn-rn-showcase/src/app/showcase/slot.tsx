import React, { ReactNode } from "react";
import { Button as RNButton, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "@/components/ui/button";
import { H1, P } from "@/components/ui/text";
import { cn, composeEventHandlers } from "@/lib/utils";

type ButtonProps = TouchableOpacityProps & { asChild?: boolean };
function Button({ asChild, ...rest }: ButtonProps) {
  const Comp = asChild ? Slot : TouchableOpacity;

  return <Comp {...rest} />;
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === "style") {
      overrideProps[propName] = StyleSheet.flatten([
        slotPropValue,
        childPropValue,
      ]);
    } else if (propName === "className") {
      overrideProps[propName] = cn(slotPropValue, childPropValue);
    }
  }

  return { ...slotProps, ...overrideProps };
}

type AnyProps = Record<string, any>;
type SlotProps = { children?: ReactNode } & AnyProps;
function Slot({ children, ...rest }: SlotProps) {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, mergeProps(rest, children.props));
  }

  if (React.Children.count(children) > 1) {
    throw new Error("Only one child allowed.");
  }

  return null;
}
// const Slottable = ({ children }: { children: React.ReactNode }) => {
//   return <>{children}</>;
// };
//
// function isSlottable(
//   child: React.ReactNode
// ): child is React.ReactElement<React.ComponentProps<typeof Slottable>, typeof Slottable> {
//   return React.isValidElement(child) && child.type === Slottable;
// }

function LogButton({ onPress, ...rest }: ButtonProps) {
  return (
    <Button
      {...rest}
      onPress={composeEventHandlers(onPress, () => console.log("log press"))}
    />
  );
}

export default function SlotShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <H1>Slot</H1>
        <Button onPress={() => console.log("not slotted")}>
          <P>Not Slotted</P>
        </Button>
        <Button asChild onPress={() => console.log("slotted")}>
          <RNButton
            title="Slotted"
            onPress={() => console.log("slotted child")}
          />
        </Button>
        <LogButton asChild>
          <RNButton
            title="Log"
            onPress={() => console.log("log child press")}
          />
        </LogButton>
      </View>
    </SafeAreaView>
  );
}
