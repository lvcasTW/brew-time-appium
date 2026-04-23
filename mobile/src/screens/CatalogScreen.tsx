import React, { useCallback, useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, ListRenderItem } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import { PRODUCTS } from "../data/products";
import type { Product, CategoryId } from "../types";
import { useFavorites } from "../context/FavoritesContext";
import type { RootStackParamList } from "../navigation/AppNavigator";
import type { MainTabParamList } from "../navigation/AppNavigator";

type Nav = CompositeNavigationProp<
  BottomTabScreenProps<MainTabParamList, "Home">["navigation"],
  NativeStackNavigationProp<RootStackParamList>
>;

const CATS: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "espresso", label: "Expresso" },
  { id: "latte", label: "Latte" },
  { id: "iced", label: "Gelados" },
];

export function CatalogScreen({ navigation }: BottomTabScreenProps<MainTabParamList, "Home">) {
  const nav = navigation as Nav;
  const { toggle, has } = useFavorites();
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const data = useMemo(() => {
    if (category === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === category);
  }, [category]);

  const onOpen = useCallback(
    (item: Product) => {
      nav.navigate("ProductDetail", { productId: item.id });
    },
    [nav]
  );

  const onLong = useCallback(
    (item: Product) => {
      toggle(item.id);
    },
    [toggle]
  );

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <Pressable
        testID={`catalog-row-${item.id}`}
        accessibilityLabel={`Produto ${item.name}`}
        onPress={() => onOpen(item)}
        onLongPress={() => onLong(item)}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          {has(item.id) ? <Text testID={`fav-badge-${item.id}`}>♥</Text> : null}
        </View>
        <Text style={styles.cardMeta}>{item.category.toUpperCase()}</Text>
        <Text style={styles.cardPrice}>R$ {(item.priceCents / 100).toFixed(2)}</Text>
      </Pressable>
    ),
    [onOpen, onLong, has]
  );

  return (
    <View style={styles.root} testID="screen-catalog">
      <View style={styles.chips}>
        {CATS.map((c) => (
          <Pressable
            key={c.id}
            testID={`chip-category-${c.id}`}
            onPress={() => setCategory(c.id)}
            style={[styles.chip, category === c.id && styles.chipOn]}
          >
            <Text style={[styles.chipText, category === c.id && styles.chipTextOn]}>{c.label}</Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        testID="list-catalog"
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
      <Pressable
        testID="btn-open-cart"
        accessibilityLabel="Abrir carrinho"
        style={styles.fab}
        onPress={() => nav.navigate("Cart")}
      >
        <Text style={styles.fabText}>Carrinho</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#faf7f2" },
  chips: { flexDirection: "row", flexWrap: "wrap", padding: 12, gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  chipOn: { backgroundColor: "#6f4e37", borderColor: "#6f4e37" },
  chipText: { color: "#444", fontWeight: "600", fontSize: 12 },
  chipTextOn: { color: "#fff" },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6dccf",
  },
  cardPressed: { opacity: 0.92 },
  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#3d2914" },
  cardMeta: { marginTop: 4, color: "#888", fontSize: 12 },
  cardPrice: { marginTop: 8, fontSize: 15, fontWeight: "700", color: "#6f4e37" },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#6f4e37",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  fabText: { color: "#fff", fontWeight: "700" },
});
