import React from "react";
import tw from "tailwind-rn";
import { TouchableOpacity } from "react-native";
import { XIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

type CloseButtonProps = {
  padded?: boolean;
};

export default function CloseButton({ padded }: CloseButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={tw(`${padded ? "px-4" : "px-0"}`)}
    >
      <XIcon size={32} style={tw("text-white")} />
    </TouchableOpacity>
  );
}
