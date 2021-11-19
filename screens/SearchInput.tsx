import React from "react";
import CloseButton from "../components/CloseButton";
import tw from "tailwind-rn";
import { TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SearchInput() {
  const navigation = useNavigation();

  const [value, setValue] = React.useState<string>("");

  return (
    <View style={tw("flex-1 bg-black px-8 py-4")}>
      <CloseButton />

      <View style={tw("mt-8")}>
        <TextInput
          placeholderTextColor={tw("text-gray-700").color}
          style={tw(
            "text-white text-4xl font-medium pb-2 border-b-2 border-gray-800"
          )}
          placeholder="Taylor Swift"
          onChangeText={setValue}
          autoCorrect={false}
          value={value}
          onSubmitEditing={(e) => {
            navigation.navigate("Search", { search: value });
          }}
          returnKeyType="search"
          autoFocus
        />
      </View>
    </View>
  );
}
