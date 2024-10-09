import { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "@/constants";
import { FormFieldProps } from "@/types/types";

const SearchInput = ({ title, value, handleChangeText, otherStyles, ...props }: FormFieldProps) => {
  const [isFocused, setFocused] = useState(false)

  return (
    <View className='flex-row w-full h-16 px-4 bg-black-100 rounded-2xl items-center'
      style={{
        borderWidth: 2,
        borderColor: isFocused ? '#ff9c01' : '#232533',
      }}>
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-lregular"
        value={value}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={handleChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <TouchableOpacity
        onPress={() => { }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;