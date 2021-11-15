import React from "react";
import Home from "./screens/Home";
import Library from "./screens/Library";
import Login from "./screens/Login";
import Player from "./screens/Player";
import Playlist from "./screens/Playlist";
import Search from "./screens/Search";
import SearchInput from "./screens/SearchInput";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<{
  Home: undefined;
  Login: undefined;
  Library: undefined;
  SearchInput: undefined;
  Player: { trackId: string };
  Search: { search?: string };
}>();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Group>
          <Stack.Group screenOptions={{ animation: "none" }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Library" component={Library} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "fullScreenModal" }}>
            <Stack.Screen name="SearchInput" component={SearchInput} />
            <Stack.Screen name="Player" component={Player} />
            <Stack.Screen name="Playlist" component={Playlist} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
