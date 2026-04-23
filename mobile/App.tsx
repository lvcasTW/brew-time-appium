import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { linking } from "./src/navigation/linking";
import { navigationRef } from "./src/navigation/navigationRef";
import { LinkBootstrap } from "./src/navigation/LinkBootstrap";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <NavigationContainer ref={navigationRef} linking={linking}>
            <LinkBootstrap />
            <AppNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}
