import React, { ReactNode } from "react";
import tw from "tailwind-rn";
import { View } from "react-native";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <View style={tw("py-4 flex-1 bg-black")}>{children}</View>;
};

export default Layout;
