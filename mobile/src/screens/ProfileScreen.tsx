import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "../navigation/AppNavigator";
import { useAuth } from "../context/AuthContext";

export function ProfileScreen(_props: BottomTabScreenProps<MainTabParamList, "Profile">) {
  const { email, logout } = useAuth();

  return (
    <View style={styles.root} testID="screen-profile">
      <Text style={styles.label}>Conta</Text>
      <Text testID="text-profile-email" style={styles.email}>
        {email}
      </Text>
      <Pressable testID="btn-logout" accessibilityRole="button" style={styles.btn} onPress={logout}>
        <Text style={styles.btnText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 24, backgroundColor: "#faf7f2" },
  label: { color: "#888", marginBottom: 4 },
  email: { fontSize: 18, fontWeight: "600", color: "#3d2914", marginBottom: 24 },
  btn: {
    alignSelf: "flex-start",
    backgroundColor: "#b00020",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontWeight: "700" },
});
