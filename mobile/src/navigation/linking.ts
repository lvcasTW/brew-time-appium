import type { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import type { RootStackParamList } from "./AppNavigator";

const prefix = Linking.createURL("/");

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, "brewtime://"],
  config: {
    screens: {
      Login: "login",
      MainTabs: {
        path: "",
        screens: {
          Home: "home",
          Favorites: "favorites",
          Profile: "profile",
        },
      },
      ProductDetail: "product/:productId",
      Cart: "cart",
      Checkout: "checkout",
    },
  },
};
