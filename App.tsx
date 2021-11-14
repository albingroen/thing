import React from "react";
import Layout from "./components/Layout";
import tw from "tailwind-rn";
import { CollectionIcon, SearchIcon } from "react-native-heroicons/solid";
import { HomeIcon } from "react-native-heroicons/outline";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const NAVBAR_ITEMS = [
    { label: "Home", icon: HomeIcon },
    { label: "Search", icon: SearchIcon },
    { label: "Your Library", icon: CollectionIcon },
  ];

  const PLAYLISTS = [
    {
      cover: "https://i.scdn.co/image/ab67706f00000002b05e7832ed433a2c8f858609",
      label: "Fest!",
      creator: "Spotify",
    },
    {
      cover: "https://i.scdn.co/image/ab67706f00000002e4793b7b7a06c3cc64341790",
      label: "lofi beats",
      creator: "Spotify",
    },
    {
      cover: "https://i.scdn.co/image/ab67706f00000002fa5c0acf1a9ca7196d5965e2",
      label: "Lugnt & Skönt",
      creator: "Spotify",
    },
    {
      cover: "https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934",
      label: "Deep Focus",
      creator: "Spotify",
    },
  ];

  return (
    <Layout>
      <View style={tw("px-8 flex-row items-start")}>
        {NAVBAR_ITEMS.map((item, i) => {
          const isLast = NAVBAR_ITEMS.length - 1 === i;
          const isActive = !i;

          return (
            <TouchableOpacity
              style={{
                ...tw(
                  `flex-row items-center border-green-700 pb-1.5 ${
                    isLast ? "mr-0" : "mr-7"
                  }`
                ),
                borderBottomWidth: isActive ? 4 : 0,
              }}
              key={item.label}
            >
              <item.icon
                size={29}
                style={tw(`mr-2 ${isActive ? "text-white" : "text-gray-500"}`)}
              />
              <Text
                style={tw(
                  `${
                    isActive ? "text-white" : "text-gray-500"
                  } text-3xl font-medium tracking-wide`
                )}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        style={tw("flex-row mt-8 px-8")}
        disableIntervalMomentum
        horizontal
      >
        {PLAYLISTS.map((playlist, i) => {
          const isLast = PLAYLISTS.length - 1 === i;

          return (
            <TouchableOpacity
              style={tw(`w-44 ${isLast ? "mr-32" : "mr-10"}`)}
              key={playlist.label}
            >
              <Image
                style={tw("h-44 w-full rounded-md")}
                source={{ uri: playlist.cover }}
              />
              <Text
                style={tw("text-white text-2xl mt-4 font-medium tracking-wide")}
                numberOfLines={1}
              >
                {playlist.label}
              </Text>
              <Text style={tw("text-gray-500 font-medium text-xl")}>
                {playlist.creator}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Layout>
  );
}
