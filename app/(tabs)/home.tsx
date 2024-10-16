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
import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {
  const globalContext = useGlobalContext();
  if (!globalContext) {
    throw new Error('Global context is null.')
  }
  const { user } = globalContext;
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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
          <View className='my-6 flex space-y-6 px-4'>
            <View className='mb-6 flex flex-row items-start justify-between'>
              <View>
                <Text className='font-lregular text-sm text-gray-100'>
                  Welcome Back
                </Text>
                <Text className='font-lbold text-2xl text-white'>
                  {user?.username}
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='h-10 w-9'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput initialQuery="" />

            <View className='w-full flex-1 pb-8 pt-5'>
              <Text className='mb-3 font-lregular text-lg text-gray-100'>
                Latest Videos
              </Text>

              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Be the first to create a video'
            buttonTitle='Create Video'
            redirect={"/create"}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />

      <StatusBar
        backgroundColor='#161622'
        style='light'
      />
    </SafeAreaView>
  );
};

export default Home;
