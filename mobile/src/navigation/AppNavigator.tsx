import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import { LoginScreen } from "../screens/LoginScreen";
import { CatalogScreen } from "../screens/CatalogScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ProductDetailScreen } from "../screens/ProductDetailScreen";
import { CartScreen } from "../screens/CartScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
  Checkout: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#6f4e37",
        tabBarInactiveTintColor: "#888",
        tabBarButtonTestID: `tab-${route.name.toLowerCase()}`,
      })}
    >
      <Tab.Screen
        name="Home"
        component={CatalogScreen}
        options={{
          title: "Catálogo",
          tabBarAccessibilityLabel: "Aba Home",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>☕</Text>,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favoritos",
          tabBarAccessibilityLabel: "Aba Favoritos",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>♥</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          tabBarAccessibilityLabel: "Aba Perfil",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Detalhe" }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: "Carrinho" }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Checkout" }} />
        </>
      )}
    </Stack.Navigator>
  );
}
