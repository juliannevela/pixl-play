import { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { WebView } from 'react-native-webview'

import { icons } from "@/constants";
import { TrendingItemProps } from "@/types/types";
import { zoomIn, zoomOut } from "@/utils/animations";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";

const isEmbeddedVideo = (url: string | string[]) => {
  return url.includes("youtube.com") || url.includes("vimeo.com");
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);
  const isEmbedded = isEmbeddedVideo(item.video);

  const itemStyle: ViewStyle = {
    width: Dimensions.get("window").width * 0.55,
    height: Dimensions.get("window").height * 0.45,
    borderRadius: 33,
    overflow: "hidden",
    marginTop: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  };

  return (
    <Animatable.View
      style={{ marginRight: 20 }}
      animation={activeItem === item.$id ? zoomIn() : zoomOut()}
      duration={500}
    >
      {play ? (
        isEmbedded ? (
          <View style={itemStyle}>
            <WebView
              source={{ uri: item.video }}
              style={{ flex: 1 }}
              allowsInlineMediaPlayback={true}
              javaScriptEnabled={true}
              allowsFullscreenVideo={true}
              scalesPageToFit={true}
              startInLoadingState={true}
            />
          </View>
        ) : (
          <View style={itemStyle}>
            <Video
              source={{ uri: item.video }}
              style={{ flex: 1 }}
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
          style={itemStyle}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Image
                source={icons.play}
                style={{ width: 48, height: 48 }}
                resizeMode="contain"
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default TrendingItem