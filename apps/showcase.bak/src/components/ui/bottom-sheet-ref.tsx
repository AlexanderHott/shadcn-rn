import type { ReactNode, RefObject } from "react";
import React, { useRef } from "react";
import { StyleSheet, Text } from "react-native";
import GBottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop as GBottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { observable } from "@legendapp/state";
import { use$ } from "@legendapp/state/react";

interface Store {
  children: ReactNode;
  ref: RefObject<GBottomSheet | null>;
}

export const store$ = observable<Store>({
  children: (
    <BottomSheetView style={{ padding: 36 }}>
      <Text>initial</Text>
    </BottomSheetView>
  ),

  ref: { current: null },
});

export function BottomSheetProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const ref = useRef<GBottomSheet>(null);
  store$.ref.set(ref);

  const bottomSheetChildren = use$(store$.children);

  return (
    <>
      {children}
      <GBottomSheet
        ref={ref}
        index={-1}
        enablePanDownToClose
        backdropComponent={BottomSheetBackdrop}
        enableDynamicSizing
        // snapPoints={["25%", "50%", "90%"]}
        style={{ zIndex: 1000 }}
      >
        {bottomSheetChildren}
      </GBottomSheet>
    </>
  );
}

type GorhomBottomSheetBackdropProps = React.ComponentProps<
  typeof GBottomSheetBackdrop
>;
export type BottomSheetBackdropProps = GorhomBottomSheetBackdropProps;
export const BottomSheetBackdrop = ({
  disappearsOnIndex = -1,
  appearsOnIndex = 1,
  ...rest
}: BottomSheetBackdropProps) => {
  return (
    <GBottomSheetBackdrop
      {...rest}
      disappearsOnIndex={disappearsOnIndex}
      appearsOnIndex={appearsOnIndex}
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: "black",
          opacity: 0.2,
        },
      ]}
    />
  );
};
