import { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = () => {
  const [isFocused, setFocused] = useState(false)
  const [query, setQuery] = useState<string>('')
  const pathName = usePathname();

  return (
    <View className='flex-row w-full h-16 px-4 bg-black-100 rounded-2xl items-center'
      style={{
        borderWidth: 2,
        borderColor: isFocused ? '#ff9c01' : '#232533',
      }}>
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-lregular"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert('Missing query', "Please input something to search results across the database.")
          }

          if (pathName.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
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