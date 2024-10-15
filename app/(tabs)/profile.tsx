import { View, Text, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { EmptyState, VideoCard } from "@/components";
import { icons, images } from "@/constants";
import useAppwrite from "@/lib/useAppwrite";
import { getAllPosts, getCurrentUser } from "@/lib/appwrite";

const Profile = () => {
  const { data: posts } = useAppwrite(getAllPosts);
  const {
    data: { username, avatar },
  } = useAppwrite(getCurrentUser);

  // console.log(username);
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
          <View className='items-center justify-center gap-4 p-6'>
            <View className='mb-0 w-full items-end'>
              <Image
                source={icons.logout}
                className='h-6 w-6'
              />
            </View>
            <View className='mt-0 flex flex-col items-center justify-center gap-3'>
              <Image
                source={{
                  uri: avatar,
                }}
                width={56}
                height={56}
                className='rounded-lg border-2 border-secondary'
              />
              <Text className='font-lregular text-lg text-white'>
                {username}
              </Text>
            </View>
            <View className='mb-6 flex flex-row items-center justify-between gap-8'>
              <View className='items-center justify-center p-1'>
                <Text className='font-lbold text-white'>10</Text>
                <Text className='font-llight text-white'>Posts</Text>
              </View>
              <View className='items-center justify-center p-1'>
                <Text className='font-lbold text-white'>1.2k</Text>
                <Text className='font-llight text-white'>Views</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No videos found for this profile'
            buttonTitle='Back to Explore'
            redirect={"/home"}
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

export default Profile;
