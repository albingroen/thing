import React from "react";
import appConfig from "../config.json";
import axios from "axios";
import tw from "tailwind-rn";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../lib/auth";
import { useNavigation } from "@react-navigation/native";

const playTrack = async (uri: string, context_uri: string, token: string) => {
  return axios
    .put(
      `${appConfig.SPOTIFY_API_URL}/me/player/play`,
      {
        context_uri,
        offset: {
          uri,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

type TracksProps = {
  context_uri: string;
  tracks: any[];
};

export default function Tracks({ context_uri, tracks }: TracksProps) {
  const navigation = useNavigation();
  const [auth] = useAuth();

  return (
    <ScrollView
      style={tw("px-8")}
      disableIntervalMomentum
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {tracks.map(({ track }, i) => (
        <TouchableOpacity
          style={tw("flex-row items-center w-full mb-12 mb-6")}
          key={track.id}
          onPress={async () => {
            if (auth) {
              await playTrack(track.uri, context_uri, auth.access_token);
              navigation.navigate("Player");
            }
          }}
        >
          <Image
            style={tw("h-20 w-20 mr-6 rounded bg-gray-800")}
            source={{ uri: track.album.images[1].url }}
          />
          <View>
            <Text
              style={tw(
                "text-white mt-0 text-3xl max-w-lg font-medium tracking-wide"
              )}
              numberOfLines={1}
            >
              {track.name}
            </Text>
            <Text style={tw("text-gray-500 font-medium text-2xl mt-0.5 ")}>
              {track.artists.map((artist) => artist.name).join(", ")}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
