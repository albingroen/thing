import React from "react";
import appConfig from "../config.json";
import axios from "axios";
import tw from "tailwind-rn";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
} from "react-native-heroicons/solid";
import { HeartIcon, XIcon } from "react-native-heroicons/outline";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../lib/auth";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";

const getPlayer = async (token: string) => {
  return axios
    .get(`${appConfig.SPOTIFY_API_URL}/me/player`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const pause = async (token: string) => {
  return axios
    .put(`${appConfig.SPOTIFY_API_URL}/me/player/pause`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const resume = async (token: string) => {
  return axios
    .put(`${appConfig.SPOTIFY_API_URL}/me/player/play`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const next = async (token: string) => {
  return axios
    .post(`${appConfig.SPOTIFY_API_URL}/me/player/next`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const previous = async (token: string) => {
  return axios
    .post(`${appConfig.SPOTIFY_API_URL}/me/player/previous`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export default function Player() {
  const navigation = useNavigation();
  const [auth] = useAuth();

  const { data } = useQuery("player", () => getPlayer(auth?.access_token), {
    enabled: Boolean(auth?.access_token),
    refetchInterval: 1000,
  });

  return (
    <View style={tw("flex-1 bg-gray-900")}>
      <View style={tw("flex-1 items-start flex-row p-10")}>
        <View
          style={{
            ...tw("mr-10"),
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.4,
            shadowRadius: 11.14,
            elevation: 17,
          }}
        >
          <Image
            style={{
              ...tw("h-full rounded-md bg-gray-700"),
              aspectRatio: 4 / 4,
            }}
            source={{
              uri: data?.item?.album?.images?.[1]?.url ?? undefined,
            }}
          />
        </View>

        <View style={tw("justify-center h-full")}>
          <Text
            numberOfLines={1}
            style={tw("text-2xl max-w-md font-semibold text-white opacity-75")}
          >
            {data?.item?.album?.name ?? "Nothing playing"}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              ...tw("text-white font-bold max-w-md mt-4"),
              lineHeight: 64,
              fontSize: 64,
            }}
          >
            {data?.item?.name ?? "Nothing playing"}
          </Text>
          <Text
            numberOfLines={1}
            style={tw("text-3xl max-w-md font-medium text-white mt-1")}
          >
            {data?.item
              ? data.item.artists.map((artist) => artist.name).join(", ")
              : "Nothing playing"}
          </Text>
        </View>
      </View>

      <View style={tw("bg-gray-900 h-1")}>
        <View
          style={{
            ...tw("h-full bg-white"),
            width: `${
              (data?.progress_ms / data?.item?.duration_ms ?? 0) * 100
            }%`,
          }}
        />
      </View>
      <View
        style={tw(
          "bg-black bg-opacity-25 items-center flex-row justify-between px-2"
        )}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={tw("p-6 pt-5 pb-7")}
        >
          <XIcon size={50} style={tw("text-white")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (auth) {
              previous(auth.access_token);
            }
          }}
          style={tw("p-6 pt-5 pb-7")}
        >
          <RewindIcon size={50} style={tw("text-white")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (data?.is_playing && auth) {
              pause(auth.access_token);
            } else if (auth) {
              resume(auth.access_token);
            }
          }}
          style={tw("p-6 pt-5 pb-7")}
        >
          {data?.is_playing ? (
            <PauseIcon size={50} style={tw("text-white")} />
          ) : (
            <PlayIcon size={50} style={tw("text-white")} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (auth) {
              next(auth.access_token);
            }
          }}
          style={tw("p-6 pt-5 pb-7")}
        >
          <FastForwardIcon size={50} style={tw("text-white")} />
        </TouchableOpacity>
        <TouchableOpacity disabled style={tw("p-6 pt-5 pb-7")}>
          <HeartIcon size={50} style={tw("text-white")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
