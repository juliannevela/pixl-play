import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { images } from "@/constants";

import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";

import useAppwrite from "@/lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#161622',
        height: '100%',
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
                  Welcome Back
                </Text>
                <Text className="text-2xl font-lbold text-white">
                  MerakiStudio
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

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-lregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts} />

            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first to create a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;