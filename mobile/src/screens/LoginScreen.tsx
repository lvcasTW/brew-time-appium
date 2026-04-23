import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { consumePendingProductId } from "../deepLink";
import { navigationRef } from "../navigation/navigationRef";

export function LoginScreen() {
  const { login, socialLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function applyPendingDeepLink() {
    const pid = consumePendingProductId();
    if (pid && navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "MainTabs" }, { name: "ProductDetail", params: { productId: pid } }],
        })
      );
    }
  }

  const onSubmit = async () => {
    setError(null);
    setBusy(true);
    try {
      const res = await login(email, password);
      if (!res.ok) {
        setError(res.error ?? "Erro ao entrar.");
        return;
      }
      applyPendingDeepLink();
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    setError(null);
    setBusy(true);
    try {
      await socialLogin("google");
      applyPendingDeepLink();
    } finally {
      setBusy(false);
    }
  };

  const onApple = async () => {
    setError(null);
    setBusy(true);
    try {
      await socialLogin("apple");
      applyPendingDeepLink();
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      testID="screen-login"
    >
      <Text style={styles.logo}>BrewTime</Text>
      <Text style={styles.sub}>Cafeteria online</Text>

      <TextInput
        testID="input-email"
        accessibilityLabel="Campo e-mail"
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        testID="input-password"
        accessibilityLabel="Campo senha"
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {error ? (
        <Text testID="text-login-error" accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}

      <Pressable
        testID="btn-login"
        accessibilityRole="button"
        accessibilityLabel="Entrar"
        style={({ pressed }) => [styles.primary, pressed && styles.pressed]}
        onPress={onSubmit}
        disabled={busy}
      >
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>Entrar</Text>}
      </Pressable>

      <View style={styles.row}>
        <Pressable
          testID="btn-login-google"
          accessibilityRole="button"
          accessibilityLabel="Entrar com Google"
          style={({ pressed }) => [styles.social, pressed && styles.pressed]}
          onPress={onGoogle}
          disabled={busy}
        >
          <Text style={styles.socialText}>Google</Text>
        </Pressable>
        <Pressable
          testID="btn-login-apple"
          accessibilityRole="button"
          accessibilityLabel="Entrar com Apple"
          style={({ pressed }) => [styles.social, pressed && styles.pressed]}
          onPress={onApple}
          disabled={busy}
        >
          <Text style={styles.socialText}>Apple</Text>
        </Pressable>
      </View>

      <Text style={styles.hint}>Demo: demo@brewtime.app / brew123</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#faf7f2" },
  logo: { fontSize: 32, fontWeight: "800", color: "#3d2914", textAlign: "center" },
  sub: { fontSize: 14, color: "#6f4e37", textAlign: "center", marginBottom: 28 },
  input: {
    borderWidth: 1,
    borderColor: "#d9c9b8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  error: { color: "#b00020", marginBottom: 10, textAlign: "center" },
  primary: {
    backgroundColor: "#6f4e37",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  pressed: { opacity: 0.85 },
  row: { flexDirection: "row", gap: 12, marginTop: 16 },
  social: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#6f4e37",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  socialText: { color: "#6f4e37", fontWeight: "600" },
  hint: { marginTop: 24, textAlign: "center", color: "#888", fontSize: 12 },
});
