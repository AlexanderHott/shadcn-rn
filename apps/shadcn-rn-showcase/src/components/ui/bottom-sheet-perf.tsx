import {
  ComponentProps,
  createContext,
  Dispatch,
  PropsWithChildren,
  RefObject,
  useContext,
  useRef,
} from "react";
import { Pressable, PressableProps, View } from "react-native";
import GBottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { Slot } from "./slot";
import { Text } from "./text";

const BottomSheetContext = createContext<{
  ref: RefObject<GBottomSheet>;
} | null>(null);

function useBottomSheet() {
  const ctx = useContext(BottomSheetContext);
  if (ctx === null) {
    throw new Error("Error: using bottom sheet context outside of provider");
  }
  return ctx;
}

export function BottomSheetProvider(props: PropsWithChildren<{}>) {
  const bottomSheetRef = useRef<GBottomSheet>(null);

  return (
    <BottomSheetContext.Provider value={{ ref: bottomSheetRef }} {...props} />
  );
}

export type BottomSheetTriggerProps = PressableProps & { asChild?: boolean };
export const BottomSheetTrigger = (props: BottomSheetTriggerProps) => {
  const { ref } = useBottomSheet();
  const { onPress, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot : Pressable;
  return (
    <Comp
      onPress={(e) => {
        ref.current?.snapToIndex(0);
        onPress?.(e);
      }}
      {...rest}
    />
  );
};

export type BottomSheetProps = ComponentProps<typeof GBottomSheet>;
export const BottomSheet = (props: BottomSheetProps) => {
  return <GBottomSheet {...props} />;
};

export type BottomSheetContentProps = ComponentProps<typeof BottomSheetView>;
export const BottomSheetContent = (props: BottomSheetContentProps) => {
  return <BottomSheetView {...props} />;
};
