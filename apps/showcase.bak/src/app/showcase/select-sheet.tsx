import type { PressableProps } from "react-native";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  BottomSheet,
  BottomSheetScrollView,
  useSheetRef,
} from "@/components/ui/bottom-sheet";
import { Button, ButtonText } from "@/components/ui/button";
import { H2, P } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export default function BadgeShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <SheetSelect />
      </View>
    </SafeAreaView>
  );
}

const ITEMS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
];

export function useSingleSelect<T>(
  defaultValue?: T,
  compareFn: (a: T, b: T) => boolean = (a, b) => a === b,
) {
  const [selected, setSelected] = useState<T | undefined>(defaultValue);

  function isSelected(value: T) {
    return selected !== undefined && compareFn(selected, value);
  }

  function toggle(value: T) {
    if (isSelected(value)) {
      setSelected(undefined);
    } else {
      setSelected(value);
    }
  }

  function clear() {
    setSelected(undefined);
  }

  function isEmpty() {
    return selected === undefined;
  }

  return [selected, { toggle, clear, isSelected, isEmpty }] as const;
}

export function useSingleSelectAlways<T>(
  defaultValue: T,
  compareFn: (a: T, b: T) => boolean = (a, b) => a === b,
) {
  const [selected, setSelected] = useState<T>(defaultValue);

  function isSelected(value: T) {
    return compareFn(selected, value);
  }

  function toggle(value: T) {
    setSelected(value);
  }

  return [selected, { toggle, isSelected }] as const;
}

export function useMultiSelect<T>(defaultValue?: readonly T[]) {
  const [selectedItems, setSelectedItems] = useState<readonly T[]>(
    defaultValue ?? [],
  );

  function isSelected(value: T) {
    return selectedItems.includes(value);
  }
  function toggle(value: T) {
    if (isSelected(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  }

  function clear() {
    setSelectedItems([]);
  }

  function isEmpty() {
    return selectedItems.length === 0;
  }

  return [selectedItems, { toggle, clear, isSelected, isEmpty }] as const;
}

interface SelectSheetProps<T> {
  items: T[];
  toggle: (value: T) => void;
  isSelected: (value: T) => boolean;
  keyExtractor: (item: T) => string;
  labelExtractor: (item: T) => string;
  isEmpty: () => boolean;
  closeOnSelect?: boolean;
}
function SelectSheet<T>(props: SelectSheetProps<T>) {
  const ref = useSheetRef();

  return (
    <>
      <Button onPress={() => ref.current?.present()}>
        <ButtonText>Open Me</ButtonText>
      </Button>

      <BottomSheet
        ref={ref}
        enableDynamicSizing
        animationConfigs={{ duration: 250 }}
      >
        <BottomSheetScrollView>
          <View className="flex flex-row flex-wrap gap-2 p-8">
            {props.items.map((item) => (
              <SelectItem
                onPress={() => {
                  props.toggle(item);
                  if (props.closeOnSelect && !props.isEmpty()) {
                    ref.current?.dismiss();
                  }
                }}
                label={props.labelExtractor(item)}
                selected={props.isSelected(item)}
                key={props.keyExtractor(item)}
              >
                item
              </SelectItem>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
}

function SheetSelect() {
  // const [item, setItem] = useState<string | undefined>(undefined);
  const [item, ssMethods] = useSingleSelect<string>();
  const [items, msMethods] = useMultiSelect<string>();

  return (
    <>
      <P>Selected Item: {item ?? "nothing"}</P>
      <SelectSheet
        closeOnSelect
        items={ITEMS}
        toggle={ssMethods.toggle}
        isSelected={ssMethods.isSelected}
        isEmpty={ssMethods.isEmpty}
        keyExtractor={(item) => item}
        labelExtractor={(item) => item}
      />

      <P>Selected Item: {items.join(", ") || "nothing"}</P>
      <SelectSheet
        items={ITEMS}
        isEmpty={msMethods.isEmpty}
        toggle={msMethods.toggle}
        isSelected={msMethods.isSelected}
        keyExtractor={(item) => item}
        labelExtractor={(item) => item}
      />
    </>
  );
}

interface SelectItem extends PressableProps {
  label: string;
  selected: boolean;
}
function SelectItem(props: Readonly<SelectItem>) {
  const { label, selected, ...rest } = props;
  return (
    <Pressable
      {...rest}
      className={cn(
        "flex h-32 w-32 items-center justify-center rounded border border-neutral-300",
        selected ? "border-blue-600 bg-blue-50" : "",
      )}
    >
      <H2>{label}</H2>
    </Pressable>
  );
}
