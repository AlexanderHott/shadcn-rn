import type { ReactNode } from "react";
import { LegendList } from "@legendapp/list";

import type {
  LegendListProps,
  LegendListRenderItemProps,
} from "@legendapp/list";

export interface GroupHeader<GroupByT> {
  type: "header";
  group: GroupByT;
}
export interface ListItem<ItemT> {
  type: "item";
  item: ItemT;
}
type TransoformedItemT<ItemT, GroupByT> =
  | ListItem<ItemT>
  | GroupHeader<GroupByT>;

function transformedData<ItemT, GroupByT>(
  data: readonly ItemT[],
  groupBy: (item: ItemT) => GroupByT,
  compareGroups: (groupA: GroupByT, groupB: GroupByT) => number,
) {
  const result: TransoformedItemT<ItemT, GroupByT>[] = [];
  let currentGroup: GroupByT | null = null;

  for (const item of data) {
    const itemGroup = groupBy(item);

    if (currentGroup === null || compareGroups(currentGroup, itemGroup) !== 0) {
      result.push({
        type: "header",
        group: itemGroup,
      });
      currentGroup = itemGroup;
    }

    result.push({
      type: "item",
      item,
    });
  }

  return result;
}

export interface GroupedListProps<ItemT, GroupByT>
  extends LegendListProps<ItemT> {
  groupBy: (item: ItemT) => GroupByT;
  compareGroups: (groupA: GroupByT, groupB: GroupByT) => number;
  headerRenderItem: (item: LegendListRenderItemProps<GroupByT>) => ReactNode;
  headerKeyExtractor?: (item: GroupByT) => string;
  headerEstimatedItemSize?: number;
  headerGetEstimatedItemSize?: (index: number, item: GroupByT) => number;
  HeaderItemSeparatorComponent?: (props: {
    leadingItem: GroupByT;
  }) => ReactNode;
  headerOnItemSizeChanged?:
    | ((info: {
        size: number;
        previous: number;
        index: number;
        itemKey: string;
        itemData: GroupByT;
      }) => void)
    | undefined;
}
export function GroupedList<ItemT, GroupByT>(
  props: Readonly<GroupedListProps<ItemT, GroupByT>>,
) {
  const {
    data,
    groupBy,
    compareGroups,
    keyExtractor,
    headerKeyExtractor,
    renderItem: RenderItem,
    headerRenderItem: HeaderRenderItem,
    estimatedItemSize,
    headerEstimatedItemSize,
    getEstimatedItemSize,
    headerGetEstimatedItemSize,
    ItemSeparatorComponent,
    HeaderItemSeparatorComponent,
    onItemSizeChanged,
    headerOnItemSizeChanged,
    ...rest
  } = props;

  const tdata = transformedData(data, groupBy, compareGroups);

  function renderItemNew(
    innerProps: LegendListRenderItemProps<TransoformedItemT<ItemT, GroupByT>>,
  ) {
    if (innerProps.item.type === "header") {
      const ps = { ...innerProps, item: innerProps.item.group };
      return <HeaderRenderItem {...ps} />;
    }

    if (!RenderItem) return null;
    const ps = {
      ...innerProps,
      item: innerProps.item.item,
    };
    return <RenderItem {...ps} />;
  }

  let keyExtractorNew;
  if (keyExtractor && headerKeyExtractor) {
    keyExtractorNew = (
      item: TransoformedItemT<ItemT, GroupByT>,
      index: number,
    ) =>
      item.type === "item"
        ? keyExtractor(item.item, index)
        : headerKeyExtractor(item.group);
  }

  let getEstimatedItemSizeNew;
  if (getEstimatedItemSize || estimatedItemSize) {
    getEstimatedItemSizeNew = (
      index: number,
      item: TransoformedItemT<ItemT, GroupByT>,
    ) =>
      item.type === "header"
        ? (headerGetEstimatedItemSize?.(index, item.group) ??
          headerEstimatedItemSize ??
          0)
        : (getEstimatedItemSize?.(index, item.item) ?? estimatedItemSize ?? 0);
  }

  let ItemSeparatorComponentNew;
  if (ItemSeparatorComponent) {
    ItemSeparatorComponentNew = (props: {
      leadingItem: TransoformedItemT<ItemT, GroupByT>;
    }) => {
      if (props.leadingItem.type === "header") {
        if (!HeaderItemSeparatorComponent) return null;
        return (
          <HeaderItemSeparatorComponent leadingItem={props.leadingItem.group} />
        );
      }
      return <ItemSeparatorComponent leadingItem={props.leadingItem.item} />;
    };
  }

  let onItemSizeChangedNew;
  if (onItemSizeChanged) {
    onItemSizeChangedNew = (info: {
      size: number;
      previous: number;
      index: number;
      itemKey: string;
      itemData: TransoformedItemT<ItemT, GroupByT>;
    }) =>
      info.itemData.type === "header"
        ? headerOnItemSizeChanged?.({ ...info, itemData: info.itemData.group })
        : onItemSizeChanged({ ...info, itemData: info.itemData.item });
  }

  return (
    <LegendList<TransoformedItemT<ItemT, GroupByT>>
      data={tdata}
      renderItem={renderItemNew}
      keyExtractor={keyExtractorNew}
      estimatedItemSize={60}
      showsVerticalScrollIndicator={false}
      getEstimatedItemSize={getEstimatedItemSizeNew}
      ItemSeparatorComponent={ItemSeparatorComponentNew}
      onItemSizeChanged={onItemSizeChangedNew}
      {...rest}
    />
  );
}
