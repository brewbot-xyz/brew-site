"use client";

import { type PropsWithChildren, useRef } from "react";
import type { StoreInterface, StoreType } from "./store";
import { initializeStore, Provider } from "./store";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PreloadedStoreInterface
  extends Pick<StoreInterface, "lastUpdate"> {}

export default function StoreProvider({
  children,
  ...props
}: PropsWithChildren<PreloadedStoreInterface>) {
  const storeRef = useRef<StoreType | null>(null);

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
}