import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '@/components/VideoCard';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import { StatusBar } from 'expo-status-bar';
import { images } from '@/constants';
import { useState } from 'react';
import useAppwrite from '@/lib/useAppwrite';
import { getSearchResults } from '@/lib/appwrite';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => getSearchResults(String(query)));
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={{
      backgroundColor: '#161622',
      height: '100%'
    }}
      edges={['top']}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.$id)}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-lregular text-sm text-gray-100">
                  Search results
                </Text>
                <Text className="text-2xl font-lbold text-white">
                  {query}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Try searching for something else"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default Search