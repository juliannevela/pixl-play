import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { EmptyStateProps } from "@/types/types";

const EmptyState = ({
  title,
  subtitle,
  buttonTitle,
  redirect,
}: EmptyStateProps) => {
  return (
    <View className='flex items-center justify-center px-4'>
      <Image
        source={images.empty}
        resizeMode='contain'
        className='h-[216px] w-[270px]'
      />

      <Text className='font-lbold text-xl text-gray-100'>{title}</Text>
      <Text className='mt-2 text-center font-llight text-xl text-white'>
        {subtitle}
      </Text>

      <CustomButton
        title={buttonTitle}
        handlePress={() => router.push(redirect)}
        containerStyles='w-full my-5'
      />
    </View>
  );
};

export default EmptyState;
