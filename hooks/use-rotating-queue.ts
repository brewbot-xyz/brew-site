import { useEffect, useRef, useState } from "react";

export function getMiddleValues<T>(arr: T[], n: number) {
  if (n <= 0 || n > arr.length) {
    throw new Error("n must be between 1 and the array length");
  }

  const startIndex = Math.floor((arr.length - n) / 2);
  return {
    startIndex,
    values: arr.slice(startIndex, startIndex + n),
  };
}

export function useRotatingQueue<T>(
  items: T[] = [],
  intervalMs: number,
  size: number,
) {
  const [queue, setQueue] = useState<T[]>([]);
  const indexRef = useRef(size);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!items || items.length === 0) {
      return;
    }

    const { startIndex, values } = getMiddleValues(items, size);
    indexRef.current = startIndex + 0.5;
    setQueue(values);
  }, [items, size]);

  useEffect(() => {
    if (!items || items.length <= size) {
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setQueue(() => {
        indexRef.current = (indexRef.current + 0.5) % items.length;
        return items
          .slice(indexRef.current, indexRef.current + size)
          .concat(
            items.slice(0, Math.max(0, indexRef.current + size - items.length)),
          );
      });
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [items, size, intervalMs]);

  return queue;
}
