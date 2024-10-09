import { useState } from "react";
import { FlatList, ViewToken } from "react-native";

import { TrendingProps } from "@/types/types";
import TrendingItem from "./TrendingItem";

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  /**
   * Sets the active item in the trending list when the user scrolls to a new item
   * @param {import("react-native").ViewToken} info - The currently viewable item
   */
  const handleViewableItemsChange = ({ viewableItems }: { viewableItems: ViewToken[] }): void => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key as string)
    }
  }

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => String(item.$id)}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={handleViewableItemsChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{
        x: 170,
        y: 0
      }}
    />
  );
};

export default Trending;