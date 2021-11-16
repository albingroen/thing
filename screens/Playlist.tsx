import React from "react";
import CloseButton from "../components/CloseButton";
import Tracks from "../components/Tracks";
import appConfig from "../config.json";
import axios from "axios";
import tw from "tailwind-rn";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../lib/auth";
import { useQuery } from "react-query";
import { PlayIcon } from "react-native-heroicons/solid";
import { play } from "../lib/api";
import { useNavigation } from "@react-navigation/native";

const getPlaylist = async (id: string, token: string) => {
  return axios
    .get(`${appConfig.SPOTIFY_API_URL}/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export default function Playlist({ route }) {
  const { id, name } = route.params;

  const navigation = useNavigation();
  const [auth] = useAuth();

  const { data } = useQuery(
    ["playlists", id],
    () => getPlaylist(id, auth?.access_token),
    {
      enabled: id && Boolean(auth?.access_token),
    }
  );

  return (
    <View style={tw("flex-1 bg-black py-6")}>
      <View style={tw("px-8 mb-6 flex-row justify-between items-start")}>
        <View>
          <Text style={tw("text-4xl font-semibold text-white")}>{name}</Text>
          <Text style={tw("text-gray-400 text-xl font-semibold mt-1")}>
            {data?.tracks.items.length ?? 0} songs
          </Text>
        </View>

        <View style={tw("flex-row items-start")}>
          <TouchableOpacity
            onPress={async () => {
              if (auth) {
                await play(data.uri, auth.access_token);
                navigation.navigate("Player");
              }
            }}
            style={tw("ml-4")}
          >
            <PlayIcon size={72} style={tw("text-green-600")} />
          </TouchableOpacity>
          <CloseButton padded />
        </View>
      </View>
      {data && <Tracks context_uri={data.uri} tracks={data.tracks.items} />}
    </View>
  );
}
