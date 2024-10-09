import * as Animatable from 'react-native-animatable';
import { useState } from 'react';
import { Image, ImageBackground, TouchableOpacity } from 'react-native';
import VideoPlayer from 'expo-video-player';

import { TrendingItemProps } from '@/types/types'
import { icons } from '@/constants'
import { zoomIn, zoomOut } from '@/utils/animations'
import { ResizeMode } from 'expo-av';

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn() : zoomOut()}
      duration={500}
    >
      {play ? (
        <VideoPlayer
          videoProps={{
            shouldPlay: play,
            resizeMode: ResizeMode.CONTAIN,
            source: {
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            },
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default TrendingItem