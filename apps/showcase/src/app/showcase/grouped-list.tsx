import type { ReactNode } from "react";
import type { PressableProps } from "react-native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  compareAsc,
  format,
  isSameDay,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";

import type { LegendListRenderItemProps } from "@legendapp/list";
import {
  BottomSheet,
  BottomSheetScrollView,
  useSheetRef,
} from "@/components/ui/bottom-sheet";
import { Button, ButtonText } from "@/components/ui/button";
import { GroupedList } from "@/components/ui/grouped-list";
import { Input, InputField } from "@/components/ui/input";
import { H2 } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useSingleSelectAlways } from "./select-sheet";

function getRandomElement<T>(array: readonly T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(delta: number) {
  const now = new Date();
  const daysRange = delta * 2; // Generate dates from 7 days ago to 7 days in the future
  const randomDays = Math.floor(Math.random() * daysRange) - 7;
  const randomHours = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
  const randomMinutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, or 45 minutes

  const date = new Date(now);
  date.setDate(date.getDate() + randomDays);
  date.setHours(randomHours, randomMinutes, 0, 0);

  return date;
}

function generateFakeData(count = 50, delta = 7) {
  const titles = [
    "Morning Meeting",
    "Lunch Break",
    "Project Review",
    "Client Call",
    "Team Standup",
    "Code Review",
    "Design Session",
    "Budget Planning",
    "Training Workshop",
    "One-on-One",
    "Product Demo",
    "Strategy Session",
    "Sprint Planning",
    "Retrospective",
    "All Hands",
    "User Interview",
    "System Maintenance",
    "Data Analysis",
    "Report Writing",
    "Presentation",
    "Brainstorming",
    "Quality Assurance",
    "Release Planning",
    "Customer Support",
    "Documentation",
  ];

  const descriptions = [
    "Discuss project requirements and timeline",
    "Review progress and blockers with the team",
    "Analyze user feedback and metrics",
    "Plan upcoming features and improvements",
    "Address technical debt and optimizations",
    "Coordinate with stakeholders",
    "Review design mockups and prototypes",
    "Prepare quarterly business review",
    "Conduct performance evaluations",
    "Troubleshoot production issues",
    "Update project documentation",
    "Gather requirements from users",
    "Test new feature implementations",
    "Discuss marketing strategies",
    "Review security protocols",
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `item-${index + 1}`,
    title: getRandomElement(titles),
    description: getRandomElement(descriptions),
    date: getRandomDate(delta),
    // Add some optional extra properties
    priority: getRandomElement(["low", "medium", "high"]),
    category: getRandomElement(["work", "personal", "meeting", "task"]),
    completed: Math.random() > 0.7, // 30% chance of being completed
  }));
}

const data = generateFakeData(10_0, 1_0);

function formatDate(date: Date) {
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else if (isTomorrow(date)) {
    return "Tomorrow";
  } else {
    return format(date, "EEEE, MMMM d, yyyy");
  }
}

function DateHeader(props: LegendListRenderItemProps<Date>) {
  return (
    <View className="border-b border-gray-300 bg-gray-200 px-4 py-3">
      <Text className="font-semibold text-base text-gray-800">
        {formatDate(props.item)}
      </Text>
    </View>
  );
}
function CategoryHeader(props: LegendListRenderItemProps<string>) {
  return (
    <View className="border-b border-gray-300 bg-gray-200 px-4 py-3">
      <Text className="font-semibold text-base text-gray-800">
        {props.item}
      </Text>
    </View>
  );
}

function ItemComponent(
  props: LegendListRenderItemProps<(typeof data)[number]>,
) {
  const item = props.item;
  return (
    <View className="ml-2 border-b border-gray-100 bg-white px-4 py-3">
      <Text className="mb-1 font-medium text-base text-gray-800">
        {item.title}
      </Text>
      {item.description && (
        <Text className="mb-1 text-sm text-gray-600">{item.description}</Text>
      )}
      <Text className="text-xs text-gray-400">
        {format(new Date(item.date), "h:mm a")}
      </Text>
    </View>
  );
}

type Item = (typeof data)[number];

interface Attribute<ItemT, Key extends keyof ItemT> {
  title: string;
  groupBy: (item: ItemT) => ItemT[Key];
  compareFn: (a: ItemT[Key], b: ItemT[Key]) => number;
  headerRenderItem: (item: LegendListRenderItemProps<ItemT[Key]>) => ReactNode;
}

const attributes = [
  {
    title: "Date",
    groupBy: (item: Item) => item.date,
    compareFn: (a, b) => (isSameDay(a, b) ? 0 : compareAsc(a, b)),
    headerRenderItem: DateHeader,
  } satisfies Attribute<Item, "date">,
  {
    title: "Category",
    groupBy: (item: Item) => item.category,
    compareFn: (a, b) => a.localeCompare(b),
    headerRenderItem: CategoryHeader,
  } satisfies Attribute<Item, "category">,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] satisfies Attribute<Item, any>[];

export default function GroupedListShowcase() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [attr, methods] = useSingleSelectAlways<Attribute<Item, any>>(
    attributes[0],
    (a, b) => a.title.localeCompare(b.title) === 0,
  );

  const [text, setText] = useState("");

  const sortedData = [...data]
    .filter((item) => item.title.toLowerCase().includes(text.toLowerCase()))
    .sort((a, b) => attr.compareFn(attr.groupBy(a), attr.groupBy(b)));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Input>
        <InputField value={text} onChangeText={(t) => setText(t)} />
      </Input>
      <SelectSheet
        closeOnSelect
        items={attributes}
        toggle={methods.toggle}
        isSelected={methods.isSelected}
        isEmpty={() => false}
        keyExtractor={(item) => item.title}
        labelExtractor={(item) => item.title}
      />
      <View className="flex-1 p-4">
        <GroupedList
          data={sortedData}
          groupBy={attr.groupBy}
          compareGroups={attr.compareFn}
          headerRenderItem={attr.headerRenderItem}
          renderItem={ItemComponent}
          keyExtractor={(item) => item.id}
          headerKeyExtractor={(item) => item as string}
          estimatedItemSize={82}
          headerEstimatedItemSize={43}
        />
      </View>
    </SafeAreaView>
  );
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
        <ButtonText>Filter By</ButtonText>
      </Button>

      <BottomSheet
        ref={ref}
        enableDynamicSizing
        animationConfigs={{ duration: 250 }}
      >
        <BottomSheetScrollView>
          <View className="flex flex-col gap-2 p-8">
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
        "flex h-16 w-full items-center justify-center rounded border border-neutral-300",
        selected ? "border-blue-600 bg-blue-50" : "",
      )}
    >
      <H2>{label}</H2>
    </Pressable>
  );
}
