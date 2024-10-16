import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { EmptyState, VideoCard, InfoBox } from "@/components";
import { icons } from "@/constants";
import useAppwrite from "@/lib/useAppwrite";
import { getUserPosts, signOut } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Profile = () => {
  const globalContext = useGlobalContext();
  if (!globalContext) {
    throw new Error("Global context is null");
  }

  const { user, setUser, setIsLoggedIn } = globalContext;
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  /**
   * Signs the user out of the application by signing out of the appwrite
   * account, setting isLoggedIn to false, and setting the user to null.
   * Then, redirects the user to the sign-in page.
   */
  const handleLogout = async () => {
    await signOut();
    setIsLoggedIn(false);
    setUser(null);

    router.replace('/sign-in')
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
          <View className='mb-12 mt-6 w-full items-center justify-center px-4'>
            <TouchableOpacity
              className='mb-10 w-full items-end'
              onPress={handleLogout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='h-6 w-6'
              />
            </TouchableOpacity>
            <View className='h-16 w-16 items-center justify-center rounded-lg border border-secondary'>
              <Image
                source={{
                  uri: user?.avatar,
                }}
                resizeMode='cover'
                className='h-[90%] w-[90%] rounded-lg'
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className='mt-5 flex-row'>
              <InfoBox
                title={`${posts.length || 0}`}
                subTitle='Posts'
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title='1.2k'
                subTitle='Followers'
                titleStyles="text-xl"
              />
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
