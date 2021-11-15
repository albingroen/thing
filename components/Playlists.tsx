import React from "react";
import appConfig from "../config.json";
import axios from "axios";
import tw from "tailwind-rn";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../lib/auth";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";

const getMyPlaylists = async (token: string) => {
  return axios
    .get(`${appConfig.SPOTIFY_API_URL}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export default function TracksList() {
  const navigation = useNavigation();
  const [auth, { logout }] = useAuth();

  const { data, error } = useQuery(
    ["me", "playlists"],
    () => getMyPlaylists(auth?.access_token),
    {
      enabled: Boolean(auth),
      onError: (err) => {
        if (err.response.status === 401) {
          logout();
        }
      },
    }
  );

  return (
    <ScrollView
      style={tw("px-8")}
      disableIntervalMomentum
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {data ? (
        data.items.map((playlist, i) => {
          const isLast = data.items.length - 1 === i;

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
                style={tw("h-44 mr-0 w-full rounded-md")}
                source={{ uri: playlist.images[0].url }}
              />
              <View>
                <Text
                  style={tw(
                    "text-white mt-4 text-2xl font-medium tracking-wide"
                  )}
                  numberOfLines={1}
                >
                  {playlist.name}
                </Text>
                <Text style={tw("text-gray-500 font-medium text-xl mt-0")}>
                  {playlist.owner.display_name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : error ? (
        <Text>Failed to retrieve playlists</Text>
      ) : null}
    </ScrollView>
  );
}
