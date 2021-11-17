import React from "react";
import tw from "tailwind-rn";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

type TracksProps = {
  onPlayTrack: (uri: string) => void;
  tracks: any[];
};

export default function Tracks({ onPlayTrack, tracks }: TracksProps) {
  return (
    <ScrollView
      style={tw("px-8")}
      disableIntervalMomentum
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {tracks.map((t) => {
        const track = t.track ?? t;

        if (!track) return null;

        return (
          <TouchableOpacity
            style={tw("flex-row items-center w-full mb-12 mb-6")}
            key={track.uri}
            onPress={async () => {
              onPlayTrack(track.uri);
            }}
          >
            <Image
              style={tw("h-20 w-20 mr-6 rounded bg-gray-800")}
              source={{ uri: track.album?.images?.[1]?.url }}
            />
            <View>
              <Text
                style={tw(
                  "text-white mt-0 text-3xl max-w-lg font-medium tracking-wide"
                )}
                numberOfLines={1}
              >
                {track.name || "No name"}
              </Text>
              <Text style={tw("text-gray-500 font-medium text-2xl mt-0.5 ")}>
                {track.artists?.map((artist) => artist.name).join(", ")}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
