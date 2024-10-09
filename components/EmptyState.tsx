import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { EmptyStateProps } from "@/types/types";

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-xl font-lbold text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-llight text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;