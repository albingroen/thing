import React from "react";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import tw from "tailwind-rn";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useNavigation } from "@react-navigation/core";
import { useAuth } from "../lib/auth";

WebBrowser.maybeCompleteAuthSession();

const clientId = "cfb98dd6665b43578cb37d98e12da667";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function Login() {
  const redirectUri = makeRedirectUri();
  const navigation = useNavigation();
  const [auth] = useAuth();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: [
        "user-read-email",
        "app-remote-control",
        "streaming",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "playlist-read-private",
        "playlist-modify-private",
        "playlist-modify-public",
        "playlist-read-collaborative",
        "user-library-modify",
        "user-library-read",
        "user-top-read",
        "user-read-recently-played",
        "user-read-playback-position",
      ],
      usePKCE: false,
      redirectUri,
    },
    discovery
  );

  React.useEffect(() => {
    if (auth?.access_token) {
      navigation.navigate("Home");
    }
  }, [auth]);

  React.useEffect(() => {
    if (response?.type === "success") {
      axios
        .get(
          `https://office-thing-api.onrender.com/callback?code=${response.params.code}`
        )
        .then(async (res) => {
          const auth = res.data;
          try {
            await SecureStore.setItemAsync("auth", JSON.stringify(auth));
            navigation.navigate("Home");
          } catch (e) {
            Alert.alert("Failed to login");
          }
        })
        .catch((err) => {
          Alert.alert("Failed to login");
        });
    }
  }, [response]);

  return (
    <View style={tw("bg-black flex-1 p-8 items-center justify-center")}>
      <TouchableOpacity
        disabled={!request}
        onPress={async () => {
          try {
            await promptAsync();
          } catch {
            Alert.alert("Failed to login");
          }
        }}
      >
        <Text style={tw("text-white text-3xl text-green-500")}>
          Log in using Spotify
        </Text>
      </TouchableOpacity>
    </View>
  );
}
