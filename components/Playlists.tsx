import React from "react";
import tw from "tailwind-rn";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Playlists({ playlists }) {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={tw("px-8")}
      disableIntervalMomentum
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {playlists.map((playlist, i) => {
        const isLast = playlists.length - 1 === i;

        return (
          <TouchableOpacity
            style={tw(
              `flex-col items-start w-44 ${isLast ? "mr-32" : "mr-10"}`
            )}
            key={playlist.id}
            onPress={() => {
              navigation.navigate("Playlist", {
                name: playlist.name,
                id: playlist.id,
              });
            }}
          >
            <Image
              source={{ uri: playlist.images?.[0]?.url ?? undefined }}
              style={tw("h-44 mr-0 w-full rounded-md bg-gray-800")}
            />
            <View>
              <Text
                style={tw("text-white mt-4 text-2xl font-medium tracking-wide")}
                numberOfLines={1}
              >
                {playlist.name || "No name"}
              </Text>
              <Text
                style={tw("text-gray-500 font-medium text-xl mt-0")}
                numberOfLines={1}
              >
                {playlist.owner.display_name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
