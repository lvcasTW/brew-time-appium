import React, { useMemo } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { PRODUCTS } from "../data/products";
import type { MainTabParamList } from "../navigation/AppNavigator";
import { useFavorites } from "../context/FavoritesContext";
import { navigationRef } from "../navigation/navigationRef";

export function FavoritesScreen(_props: BottomTabScreenProps<MainTabParamList, "Favorites">) {
  const { ids } = useFavorites();
  const data = useMemo(() => PRODUCTS.filter((p) => ids.has(p.id)), [ids]);

  return (
    <View style={styles.root} testID="screen-favorites">
      <FlatList
        testID="list-favorites"
        data={data}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum favorito ainda. Segure um item no catálogo.</Text>}
        renderItem={({ item }) => (
          <Pressable
            testID={`fav-row-${item.id}`}
            style={styles.row}
            onPress={() => {
              if (navigationRef.isReady()) {
                navigationRef.navigate("ProductDetail", { productId: item.id });
              }
            }}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>R$ {(item.priceCents / 100).toFixed(2)}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#faf7f2" },
  empty: { textAlign: "center", margin: 24, color: "#666" },
  row: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6dccf",
  },
  title: { fontSize: 16, fontWeight: "700", color: "#3d2914" },
  price: { marginTop: 6, color: "#6f4e37", fontWeight: "600" },
});
