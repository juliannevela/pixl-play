import { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { SearchInputProps } from "@/types/types";

const SearchInput = ({ initialQuery }: SearchInputProps) => {
  const [isFocused, setFocused] = useState(false);
  const [query, setQuery] = useState<string>("");
  const pathName = usePathname();

  return (
    <View
      className='h-16 w-full flex-row items-center rounded-2xl bg-black-100 px-4'
      style={{
        borderWidth: 2,
        borderColor: isFocused ? "#ff9c01" : "#232533",
      }}
    >
      <TextInput
        className='mt-0.5 flex-1 font-lregular text-base text-white'
        value={query}
        placeholder='Search a video topic'
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across the database."
            );
          }

          if (pathName.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className='h-5 w-5'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
