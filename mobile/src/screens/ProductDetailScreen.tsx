import React, { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, Switch, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PRODUCTS } from "../data/products";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export function ProductDetailScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const product = useMemo(() => PRODUCTS.find((p) => p.id === productId), [productId]);
  const { addOrMerge } = useCart();
  const [size, setSize] = useState<"P" | "M" | "G">("M");
  const [sugar, setSugar] = useState(false);
  const [whipped, setWhipped] = useState(false);

  if (!product) {
    return (
      <View style={styles.center} testID="screen-product-missing">
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  const extrasCents = (size === "P" ? 0 : size === "M" ? 80 : 150) + (whipped ? 120 : 0);
  const unit = product.priceCents + extrasCents;

  const add = () => {
    addOrMerge({
      productId: product.id,
      name: product.name,
      size,
      sugar,
      whipped,
      quantity: 1,
      unitPriceCents: unit,
    });
    navigation.navigate("Cart");
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }} testID="screen-product-detail">
      <Text testID="text-product-name" style={styles.title}>
        {product.name}
      </Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Text style={styles.section}>Tamanho</Text>
      <View style={styles.row}>
        {(["P", "M", "G"] as const).map((s) => (
          <Pressable
            key={s}
            testID={`size-${s}`}
            onPress={() => setSize(s)}
            style={[styles.sizeBtn, size === s && styles.sizeOn]}
          >
            <Text style={[styles.sizeText, size === s && styles.sizeTextOn]}>{s}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.section}>Adicionais</Text>
      <View style={styles.switchRow}>
        <Text>Açúcar</Text>
        <Switch testID="switch-sugar" value={sugar} onValueChange={setSugar} />
      </View>
      <View style={styles.switchRow}>
        <Text>Chantilly</Text>
        <Switch testID="switch-whipped" value={whipped} onValueChange={setWhipped} />
      </View>
      <Text testID="text-unit-price" style={styles.price}>
        R$ {(unit / 100).toFixed(2)}
      </Text>
      <Pressable testID="btn-add-cart" accessibilityRole="button" style={styles.primary} onPress={add}>
        <Text style={styles.primaryText}>Adicionar ao carrinho</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#faf7f2", padding: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "800", color: "#3d2914" },
  desc: { marginTop: 10, color: "#555", lineHeight: 20 },
  section: { marginTop: 22, marginBottom: 10, fontWeight: "700", color: "#6f4e37" },
  row: { flexDirection: "row", gap: 10 },
  sizeBtn: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  sizeOn: { borderColor: "#6f4e37", backgroundColor: "#6f4e37" },
  sizeText: { fontWeight: "700", color: "#444" },
  sizeTextOn: { color: "#fff" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  price: { marginTop: 16, fontSize: 20, fontWeight: "800", color: "#3d2914" },
  primary: {
    marginTop: 20,
    backgroundColor: "#6f4e37",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
