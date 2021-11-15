import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

type Auth = Record<string, any> | void;

export const useAuth = (): [Auth, { logout: () => void }] => {
  const [auth, setAuth] = useState<Auth>();
  const navigation = useNavigation();

  useEffect(() => {
    SecureStore.getItemAsync("auth").then((value) => {
      if (value) {
        setAuth(JSON.parse(value));
      } else {
        setAuth(undefined);
      }
    });
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync("auth");
    navigation.navigate("Login");
  };

  return [auth, { logout }];
};
