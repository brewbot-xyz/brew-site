import { useMemo, useSyncExternalStore } from "react";

function subscribe(query: string, cb: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

function getSnapshot(query: string) {
  return window.matchMedia(query).matches;
}

function getServerSnapshot(defaultValue: boolean) {
  return defaultValue;
}

export function useMediaQuery(query: string, defaultValue = false) {
  const [sub, snap] = useMemo(() => {
    return [
      (cb: () => void) => subscribe(query, cb),
      () => getSnapshot(query),
    ] as const;
  }, [query]);

  return useSyncExternalStore(sub, snap, () => getServerSnapshot(defaultValue));
}

export const useIsMobile = () => useMediaQuery("(max-width: 1024px)", false);
