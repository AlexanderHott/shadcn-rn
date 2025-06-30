import type { ComponentProps } from "react";
import { useRef } from "react";
import {
  BottomSheetBackdrop as GBottomSheetBackdropComponent,
  BottomSheetModal as GBottomSheetModalComponent,
  BottomSheetScrollView as GBottomSheetScrollViewComponent,
} from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";

import type {
  BottomSheetDraggableView,
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetFooterContainer,
  BottomSheetHandle,
  BottomSheetSectionList,
  BottomSheetTextInput,
  BottomSheetView,
  BottomSheetVirtualizedList,
} from "@gorhom/bottom-sheet";
import { cn } from "@/lib/utils";

export {
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetVirtualizedList,
  BottomSheetHandle,
  BottomSheetFooter,
  BottomSheetFooterContainer,
  BottomSheetDraggableView,
  BottomSheetSectionList,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export type BottomSheetScrollViewProps = ComponentProps<
  typeof GBottomSheetScrollViewComponent
>;
export const BottomSheetScrollView = cssInterop(
  GBottomSheetScrollViewComponent,
  { className: { target: "style" } },
);
export type BottomSheetFlashListProps = ComponentProps<
  typeof BottomSheetFlashList
>;
export type BottomSheetFlatListProps = ComponentProps<
  typeof BottomSheetFlatList
>;
export type BottomSheetVirtualizedListProps = ComponentProps<
  typeof BottomSheetVirtualizedList
>;
export type BottomSheetHandleProps = ComponentProps<typeof BottomSheetHandle>;
export type BottomSheetFooterProps = ComponentProps<typeof BottomSheetFooter>;
export type BottomSheetFooterContainerProps = ComponentProps<
  typeof BottomSheetFooterContainer
>;
export type BottomSheetDraggableViewProps = ComponentProps<
  typeof BottomSheetDraggableView
>;
export type BottomSheetSectionListProps = ComponentProps<
  typeof BottomSheetSectionList
>;
export type BottomSheetTextInputProps = ComponentProps<
  typeof BottomSheetTextInput
>;
export type BottomSheetViewProps = ComponentProps<typeof BottomSheetView>;

const GBottomSheetBackdrop = cssInterop(GBottomSheetBackdropComponent, {
  className: {
    target: "style",
    nativeStyleToProp: {
      opacity: "opacity",
    },
  },
});
export type BottomSheetBackdropProps = ComponentProps<
  typeof GBottomSheetBackdrop
>;
export function BottomSheetBackdrop(props: BottomSheetBackdropProps) {
  const {
    disappearsOnIndex = -1,
    appearsOnIndex = 1,
    className,
    ...rest
  } = props;
  return (
    <GBottomSheetBackdrop
      disappearsOnIndex={disappearsOnIndex}
      appearsOnIndex={appearsOnIndex}
      className={cn("absolute inset-0 opacity-50", className)}
      {...rest}
    />
  );
}

const GBottomSheetModal = cssInterop(GBottomSheetModalComponent, {
  className: { target: "style" },
  containerClassName: { target: "containerStyle" },
  backgroundClassName: { target: "backgroundStyle" },
  handleIndicatorClassName: { target: "handleIndicatorStyle" },
  handleClassName: { target: "handleStyle" },
});
type GBottomSheetModalProps = React.ComponentProps<
  typeof GBottomSheetModalComponent
>;
export function BottomSheet(props: GBottomSheetModalProps) {
  return (
    <GBottomSheetModal backdropComponent={BottomSheetBackdrop} {...props} />
  );
}

export type BottomSheetRef = React.RefObject<GBottomSheetModalComponent>;
export function useSheetRef() {
  return useRef<GBottomSheetModalComponent>(null);
}
