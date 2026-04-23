import React, { useEffect } from "react";
import * as Linking from "expo-linking";
import { useAuth } from "../context/AuthContext";
import { navigationRef } from "./navigationRef";
import { setPendingProductId } from "../deepLink";

function parseProductId(url: string): string | null {
  const m = url.match(/product\/([^/?#]+)/i);
  if (!m?.[1]) return null;
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return null;
  }
}

/** Deep links: fila quando deslogado; navega direto quando logado. */
export function LinkBootstrap() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handle = (url: string | null) => {
      if (!url) return;
      const id = parseProductId(url);
      if (!id) return;
      if (isLoggedIn && navigationRef.isReady()) {
        navigationRef.navigate("ProductDetail", { productId: id });
      } else {
        setPendingProductId(id);
      }
    };

    Linking.getInitialURL().then(handle);
    const sub = Linking.addEventListener("url", (e) => handle(e.url));
    return () => sub.remove();
  }, [isLoggedIn]);

  return null;
}
