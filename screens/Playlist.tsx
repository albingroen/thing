import React from "react";
import CloseButton from "../components/CloseButton";
import Tracks from "../components/Tracks";
import appConfig from "../config.json";
import axios from "axios";
import tw from "tailwind-rn";
import { PlayIcon } from "react-native-heroicons/solid";
import { View, Text, TouchableOpacity } from "react-native";
import { play, playTopTracks } from "../lib/api";
import { useAuth } from "../lib/auth";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";

const getLikedTracks = async (token: string) => {
  return axios
    .get(`${appConfig.SPOTIFY_API_URL}/me/tracks?limit=50`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

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
  const isTopTracks = id === "top-tracks";

  const navigation = useNavigation();
  const [auth] = useAuth();

  const { data: tracksData } = useQuery(
    ["playlists", id],
    () => getPlaylist(id, auth?.access_token),
    {
      enabled: id && !isTopTracks && Boolean(auth?.access_token),
    }
  );

  const { data: topTracksData } = useQuery(
    "top-tracks",
    () => getLikedTracks(auth?.access_token),
    { enabled: isTopTracks && Boolean(auth?.access_token) }
  );

  const data = isTopTracks ? topTracksData : tracksData;
  const tracks = data?.items ?? data?.tracks.items;

  return (
    <View style={tw("flex-1 bg-black py-6")}>
      <View style={tw("px-8 mb-6 flex-row justify-between items-start")}>
        <View>
          <Text style={tw("text-4xl font-semibold text-white")}>{name}</Text>
          <Text style={tw("text-gray-400 text-xl font-semibold mt-1")}>
            {tracks?.length ?? 0} songs
          </Text>
        </View>

        <View style={tw("flex-row items-start")}>
          <TouchableOpacity
            onPress={async () => {
              if (auth) {
                if (isTopTracks && tracks?.length) {
                  await playTopTracks(
                    tracks.map((track) => track.track.uri),
                    auth.access_token
                  );
                } else {
                  await play(data.uri, auth.access_token);
                }
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
      {data && (
        <Tracks
          onPlayTrack={async (trackUri) => {
            if (auth) {
              if (isTopTracks && tracks?.length) {
                await playTopTracks(
                  tracks.map((track) => track.track.uri),
                  auth.access_token,
                  trackUri
                );
              } else {
                await play(data.uri, auth.access_token, trackUri);
              }

              navigation.navigate("Player");
            }
          }}
          tracks={tracks}
        />
      )}
    </View>
  );
}
