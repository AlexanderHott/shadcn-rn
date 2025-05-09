import type {
  GestureResponderEvent,
  PressableProps,
  TextProps,
} from "react-native";
import React, {
  ComponentProps,
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Modal, Pressable, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GBottomSheet, {
  BottomSheetBackdrop as GBottomSheetBackdrop,
  BottomSheetFlashList as GBottomSheetFlashList,
  BottomSheetFlatList as GBottomSheetFlatList,
  BottomSheetHandle as GBottomSheetHandle,
  BottomSheetScrollView as GBottomSheetScrollView,
  BottomSheetSectionList as GBottomSheetSectionList,
  BottomSheetTextInput as GBottomSheetTextInput,
  BottomSheetView as GBottomSheetView,
} from "@gorhom/bottom-sheet";

import { Slot } from "@/components/ui/slot";

const BottomSheetContext = createContext<{
  ref: RefObject<GBottomSheet>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

function useBottomSheet() {
  const ctx = useContext(BottomSheetContext);
  if (ctx === null) {
    throw new Error("Error: using bottom sheet context outside of provider");
  }
  return ctx;
}

export type BottomSheetProps = { children: ReactNode };
export function BottomSheet(props: BottomSheetProps) {
  const ref = useRef<GBottomSheet>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <BottomSheetContext.Provider value={{ ref, modalOpen, setModalOpen }}>
      {props.children}
    </BottomSheetContext.Provider>
  );
}

export type BottomSheetModalProps = { children: ReactNode };
export function BottomSheetModal(props: BottomSheetModalProps) {
  const { modalOpen, setModalOpen, ref } = useBottomSheet();
  return (
    <Modal
      animationType="none"
      statusBarTranslucent
      transparent={true}
      visible={modalOpen}
      presentationStyle="overFullScreen"
      onRequestClose={() => ref.current?.close()}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GBottomSheet
          ref={ref}
          index={0}
          onClose={() => setModalOpen(false)}
          enablePanDownToClose
          backdropComponent={BottomSheetBackdrop}
          snapPoints={["50%"]}
        >
          {props.children}
        </GBottomSheet>
      </GestureHandlerRootView>
    </Modal>
  );
}

export type BottomSheetTriggerProps = PressableProps & { asChild?: boolean };
export const BottomSheetTrigger = (props: BottomSheetTriggerProps) => {
  const { setModalOpen, ref } = useBottomSheet();
  const { onPress, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot : Pressable;
  return (
    <Comp
      onPress={(e) => {
        setModalOpen?.(true);
        ref.current?.snapToIndex(0);
        onPress?.(e);
      }}
      {...rest}
    />
  );
};

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
          backgroundColor: colors.black,
          opacity: 0.2,
        },
      ]}
    />
  );
};

export type BottomSheetDragIndicatorProps = React.ComponentProps<
  typeof GBottomSheetHandle
>;

export const BottomSheetDragIndicator = ({
  children,
  ...props
}: BottomSheetDragIndicatorProps) => {
  return (
    <GBottomSheetHandle
      {...props}
      style={{
        width: "100%",
        alignItems: "center",
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        backgroundColor: colors.grey900,
      }}
    >
      {children}
    </GBottomSheetHandle>
  );
};

type BottomSheetContentProps = React.ComponentProps<typeof GBottomSheetView>;
export const BottomSheetContent = (props: BottomSheetContentProps) => {
  const { style, ...rest } = props;
  const flattened = StyleSheet.flatten(style);
  return (
    <GBottomSheetView style={[{ padding: 36 }, flattened]} {...rest}>
      {props.children}
    </GBottomSheetView>
  );
};

export type BottomSheetItemProps = PressableProps & {
  closeOnSelect?: boolean;
};
export const BottomSheetItem = ({
  children,
  closeOnSelect = true,
  onPress,
  ...props
}: BottomSheetItemProps) => {
  const { ref } = useBottomSheet();
  const onPressCb = useCallback(
    (e: GestureResponderEvent) => {
      if (closeOnSelect) {
        ref.current?.close();
      }
      onPress?.(e);
    },
    [onPress, closeOnSelect],
  );
  return (
    <Pressable
      {...props}
      onPress={onPressCb}
      role="button"
      style={{
        padding: 3,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 4,
        width: "100%",
      }}
    >
      {children}
    </Pressable>
  );
};

export const BottomSheetItemText = ({ ...props }: TextProps) => {
  return <Text {...props} />;
};

export type BottomSheetTextInputProps = ComponentProps<
  typeof GBottomSheetTextInput
>;
export function BottomSheetTextInput(props: BottomSheetTextInputProps) {
  const { style, onFocus, onBlur, ...rest } = props;
  const flattened = StyleSheet.flatten(style);
  const [focused, setFocused] = useState(props.autoFocus ?? false);

  return (
    <GBottomSheetTextInput
      style={[
        {
          color: "#fff",
          backgroundColor: colors.grey900,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderWidth: 1,
          width: "100%",
          borderColor: focused ? colors.white : colors.grey600,
        },
        flattened,
      ]}
      placeholderTextColor={colors.grey600}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      {...rest}
    />
  );
}

export const BottomSheetScrollView = GBottomSheetScrollView;
export const BottomSheetFlatList = GBottomSheetFlatList;
export const BottomSheetFlashList = GBottomSheetFlashList;
export const BottomSheetSectionList = GBottomSheetSectionList;
