import React from "react";
import tw from "tailwind-rn";
import {
  HomeIcon as HomeIconOutlined,
  SearchIcon as SearchIconOutlined,
  CollectionIcon as CollectionIconOutlined,
} from "react-native-heroicons/outline";
import {
  CollectionIcon,
  SearchIcon,
  HomeIcon,
  MusicNoteIcon,
  LogoutIcon,
} from "react-native-heroicons/solid";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../lib/auth";

type LayoutProps = {
  children: React.ReactNode;
};

const NAVBAR_ITEMS = [
  {
    label: "Home",
    screen: "Home",
    icon: { active: HomeIcon, inactive: HomeIconOutlined },
  },
  {
    label: "Search",
    screen: "Search",
    icon: { active: SearchIcon, inactive: SearchIconOutlined },
  },
  {
    label: "Your Library",
    screen: "Library",
    icon: { active: CollectionIcon, inactive: CollectionIconOutlined },
  },
];

const Layout = ({ children }: LayoutProps) => {
  const navigation = useNavigation();
  const [_, { logout }] = useAuth();
  const route = useRoute();

  return (
    <View style={tw("py-4 flex-1 bg-black")}>
      <View style={tw("flex-row items-center justify-between px-8 mb-8")}>
        <View style={tw("flex-row items-start")}>
          {NAVBAR_ITEMS.map((item, i) => {
            const isActive = item.screen === route.name;
            const isLast = NAVBAR_ITEMS.length - 1 === i;

            const Icon = isActive ? item.icon.active : item.icon.inactive;

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(item.screen);
                  if (item.screen === "Search") {
                    navigation.navigate("SearchInput");
                  }
                }}
                style={{
                  ...tw(
                    `flex-row items-center border-green-700 pb-1 ${
                      isLast ? "mr-0" : "mr-7"
                    }`
                  ),
                  borderBottomWidth: isActive ? 4 : 0,
                }}
                key={item.label}
              >
                <Icon
                  size={29}
                  style={tw(
                    `mr-2 ${isActive ? "text-white" : "text-gray-500"}`
                  )}
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

        <View style={tw("flex-row items-center")}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Player");
            }}
            style={tw("px-4")}
          >
            <MusicNoteIcon style={tw("text-green-700")} size={29} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              logout();
            }}
            style={tw("px-4")}
          >
            <LogoutIcon style={tw("text-gray-500")} size={29} />
          </TouchableOpacity>
        </View>
      </View>

      {children}
    </View>
  );
};

export default Layout;
