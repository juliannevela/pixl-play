import { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import { View, Text, Image, TouchableOpacity, ViewStyle, Dimensions } from 'react-native'
import WebView from 'react-native-webview';

import { icons } from '@/constants'
import { VideoCardProps } from '@/types/types'
import { isEmbeddedVideo } from '@/utils/utils';

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }: VideoCardProps) => {
  const [play, setPlay] = useState<boolean>(false);
  const isEmbedded = isEmbeddedVideo(video);

  const itemStyle: ViewStyle = {
    height: Dimensions.get("window").width * 0.5625, // 16:9 aspect ratio
    width: "100%",
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
  };

  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
            <Image
              source={{ uri: avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>
          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text className='text-white font-lregular text-sm' numberOfLines={1}>{title}</Text>
            <Text className='text-xs text-gray-100 font-lregular' numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={icons.menu}
            className='w-5 h-5'
            resizeMode='contain'
          />
        </View>
      </View>

      {play ? (
        isEmbedded ? (
          <View
            style={itemStyle}>
            <WebView
              source={{ uri: video }}
              style={{
                flex: 1
              }}
              allowsInlineMediaPlayback={true}
              javaScriptEnabled={true}
              allowsFullscreenVideo={true}
              scalesPageToFit={true}
              startInLoadingState={true}
            />
          </View>
        ) : (
          <View
            style={itemStyle}>
            <Video
              source={{ uri: video }}
              style={{
                flex: 1,
                margin: 0,
                padding: 0
              }}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              shouldPlay
              onPlaybackStatusUpdate={(status) => {
                if ('finished' in status && status.finished) {
                  setPlay(false);
                }
              }}
              onError={(error) => {
                console.error("Video error:", error);
                setPlay(false);
              }}
            />
          </View>
        )
      ) : (
        <TouchableOpacity
          className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )
      }
    </View>
  )
}

export default VideoCard