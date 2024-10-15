import { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { VideoCard, SearchInput, EmptyState } from "@/components";
import useAppwrite from "@/lib/useAppwrite";
import { getSearchResults } from "@/lib/appwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() =>
    getSearchResults(String(query))
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#161622",
        height: "100%",
      }}
      edges={["top"]}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.$id)}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 flex px-4'>
            <Text className='font-lregular text-sm text-gray-100'>
              Search results
            </Text>
            <Text className='font-llight text-2xl text-white'>{query}</Text>

            <View className='mb-8 mt-6'>
              <SearchInput initialQuery={String(query)} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Try searching for something else'
          />
        )}
      />

      <StatusBar
        backgroundColor='#161622'
        style='light'
      />
    </SafeAreaView>
  );
};

export default Search;
