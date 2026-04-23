let pendingProductId: string | null = null;

export function setPendingProductId(id: string) {
  pendingProductId = id;
}

export function setPendingProductFromUrl(url: string | null) {
  if (!url) return;
  try {
    const match = url.match(/product\/([^/?#]+)/i);
    if (match?.[1]) pendingProductId = decodeURIComponent(match[1]);
  } catch {
    /* ignore */
  }
}

export function consumePendingProductId(): string | null {
  const v = pendingProductId;
  pendingProductId = null;
  return v;
}
