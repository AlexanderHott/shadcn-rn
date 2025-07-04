import * as React from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";

import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";

const Sheet = React.forwardRef<
  BottomSheetModal,
  React.ComponentPropsWithoutRef<typeof BottomSheetModal>
>(
  (
    { index = 0, backgroundStyle, style, handleIndicatorStyle, ...props },
    ref,
  ) => {
    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      ),
      [],
    );
    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        backgroundStyle={
          backgroundStyle ?? {
            backgroundColor: "#eee",
          }
        }
        style={
          style ?? {
            borderWidth: 1,
            borderColor: "#555",
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
          }
        }
        handleIndicatorStyle={
          handleIndicatorStyle ?? {
            backgroundColor: "#444",
          }
        }
        backdropComponent={renderBackdrop}
        {...props}
      />
    );
  },
);

function useSheetRef() {
  return React.useRef<BottomSheetModal>(null);
}

export { Sheet, useSheetRef };
