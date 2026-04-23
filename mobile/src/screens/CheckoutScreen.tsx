import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

const PAY_HTML = `
<!DOCTYPE html>
<html><head><meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body { font-family: system-ui; padding: 16px; background:#f7f7f7; }
  button { padding: 14px 20px; font-size: 16px; border-radius: 10px; border: 0; background:#6f4e37; color:#fff; font-weight:700; }
  #status { margin-top: 16px; font-weight: 600; }
</style></head>
<body>
  <h2>Pagamento simulado</h2>
  <p>Contexto WEBVIEW para automação Appium.</p>
  <button id="btn-confirm-pay" onclick="document.getElementById('status').innerText='PAGAMENTO_OK'">Confirmar pagamento</button>
  <p id="status"></p>
</body></html>
`;

export function CheckoutScreen({ navigation }: Props) {
  const { lines, clear } = useCart();
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [payment, setPayment] = useState<"pix" | "card">("pix");
  const [webviewOpen, setWebviewOpen] = useState(false);

  const total = useMemo(
    () => lines.reduce((s, l) => s + l.unitPriceCents * l.quantity, 0),
    [lines]
  );

  const finishNative = () => {
    clear();
    navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
  };

  return (
    <ScrollView style={styles.root} testID="screen-checkout">
      <Text style={styles.label}>Endereço</Text>
      <TextInput
        testID="input-address-street"
        placeholder="Rua"
        value={street}
        onChangeText={setStreet}
        style={styles.input}
      />
      <TextInput
        testID="input-address-number"
        placeholder="Número"
        value={number}
        onChangeText={setNumber}
        style={styles.input}
      />
      <TextInput
        testID="input-address-city"
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <Text style={styles.label}>Pagamento</Text>
      <View style={styles.payRow}>
        <Pressable
          testID="pay-pix"
          onPress={() => setPayment("pix")}
          style={[styles.payChip, payment === "pix" && styles.payOn]}
        >
          <Text style={payment === "pix" ? styles.payOnText : styles.payText}>PIX</Text>
        </Pressable>
        <Pressable
          testID="pay-card"
          onPress={() => setPayment("card")}
          style={[styles.payChip, payment === "card" && styles.payOn]}
        >
          <Text style={payment === "card" ? styles.payOnText : styles.payText}>Cartão</Text>
        </Pressable>
      </View>

      <Text testID="text-checkout-total" style={styles.total}>
        Total R$ {(total / 100).toFixed(2)}
      </Text>

      <Pressable testID="btn-open-payment-webview" style={styles.secondary} onPress={() => setWebviewOpen(true)}>
        <Text style={styles.secondaryText}>Abrir pagamento no WebView</Text>
      </Pressable>

      <Pressable testID="btn-finish-checkout" style={styles.primary} onPress={finishNative}>
        <Text style={styles.primaryText}>Finalizar (somente nativo)</Text>
      </Pressable>

      <Modal visible={webviewOpen} animationType="slide" onRequestClose={() => setWebviewOpen(false)}>
        <View style={styles.modal} testID="modal-webview-payment">
          <View style={styles.modalBar}>
            <Pressable testID="btn-close-webview" onPress={() => setWebviewOpen(false)}>
              <Text style={styles.close}>Fechar</Text>
            </Pressable>
          </View>
          <WebView
            originWhitelist={["*"]}
            source={{ html: PAY_HTML }}
            testID="webview-payment"
            javaScriptEnabled
            domStorageEnabled
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#faf7f2", padding: 16 },
  label: { marginTop: 8, marginBottom: 6, fontWeight: "700", color: "#6f4e37" },
  input: {
    borderWidth: 1,
    borderColor: "#d9c9b8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  payRow: { flexDirection: "row", gap: 10, marginVertical: 8 },
  payChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  payOn: { backgroundColor: "#6f4e37", borderColor: "#6f4e37" },
  payText: { fontWeight: "600", color: "#444" },
  payOnText: { fontWeight: "700", color: "#fff" },
  total: { marginTop: 12, fontSize: 18, fontWeight: "800", color: "#3d2914" },
  secondary: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#6f4e37",
    alignItems: "center",
  },
  secondaryText: { color: "#6f4e37", fontWeight: "700" },
  primary: {
    marginTop: 12,
    backgroundColor: "#6f4e37",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "800" },
  modal: { flex: 1, backgroundColor: "#fff" },
  modalBar: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 8, backgroundColor: "#faf7f2" },
  close: { color: "#6f4e37", fontWeight: "700", fontSize: 16 },
});
