"use client";

import { useSyncExternalStore } from "react";

const TICK_MS = 1000;

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, TICK_MS);
  return () => window.clearInterval(id);
}

/**
 * The current time in ms, re-read every second.
 *
 * `getServerSnapshot` returns 0 so server prerendering stays deterministic,
 * and the client's first render matches the server HTML (no hydration
 * mismatch). Treat 0 as "not mounted yet".
 */
export function useNow(): number {
  return useSyncExternalStore(
    subscribe,
    () => Date.now(),
    () => 0,
  );
}
