import React, { useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

export function CartScreen({ navigation }: Props) {
  const { lines, setQuantity, removeAt } = useCart();

  const renderRight = useCallback(
    (index: number) => (
      <View style={styles.swipeWrap}>
        <Pressable
          testID={`btn-delete-cart-${index}`}
          accessibilityLabel="Excluir item do carrinho"
          style={styles.deleteBtn}
          onPress={() => removeAt(index)}
        >
          <Text style={styles.deleteText}>Excluir</Text>
        </Pressable>
      </View>
    ),
    [removeAt]
  );

  if (lines.length === 0) {
    return (
      <View style={styles.empty} testID="screen-cart-empty">
        <Text>Carrinho vazio.</Text>
        <Pressable testID="btn-go-catalog" style={styles.link} onPress={() => navigation.navigate("MainTabs")}>
          <Text style={styles.linkText}>Ir ao catálogo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root} testID="screen-cart">
      {lines.map((line, index) => (
        <Swipeable key={`${line.productId}-${line.size}-${index}`} renderRightActions={() => renderRight(index)}>
          <View testID={`cart-row-${index}`} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{line.name}</Text>
              <Text style={styles.meta}>
                {line.size} · açúcar: {line.sugar ? "sim" : "não"} · chantilly: {line.whipped ? "sim" : "não"}
              </Text>
              <Text style={styles.price}>R$ {(line.unitPriceCents / 100).toFixed(2)}</Text>
            </View>
            <View style={styles.qty}>
              <Pressable
                testID={`qty-minus-${index}`}
                onPress={() => setQuantity(index, line.quantity - 1)}
                style={styles.qtyBtn}
              >
                <Text>−</Text>
              </Pressable>
              <Text testID={`qty-value-${index}`} style={styles.qtyVal}>
                {line.quantity}
              </Text>
              <Pressable
                testID={`qty-plus-${index}`}
                onPress={() => setQuantity(index, line.quantity + 1)}
                style={styles.qtyBtn}
              >
                <Text>+</Text>
              </Pressable>
            </View>
          </View>
        </Swipeable>
      ))}
      <Pressable testID="btn-checkout" style={styles.checkout} onPress={() => navigation.navigate("Checkout")}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#faf7f2", paddingTop: 8 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  link: { padding: 12 },
  linkText: { color: "#6f4e37", fontWeight: "700" },
  row: {
    flexDirection: "row",
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6dccf",
  },
  title: { fontSize: 16, fontWeight: "700", color: "#3d2914" },
  meta: { marginTop: 4, color: "#666", fontSize: 12 },
  price: { marginTop: 8, fontWeight: "700", color: "#6f4e37" },
  qty: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  qtyVal: { minWidth: 22, textAlign: "center", fontWeight: "700" },
  swipeWrap: { justifyContent: "center", paddingRight: 12 },
  deleteBtn: {
    backgroundColor: "#b00020",
    justifyContent: "center",
    paddingHorizontal: 18,
    borderRadius: 12,
    height: "80%",
    alignSelf: "center",
  },
  deleteText: { color: "#fff", fontWeight: "800" },
  checkout: {
    margin: 16,
    backgroundColor: "#6f4e37",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
